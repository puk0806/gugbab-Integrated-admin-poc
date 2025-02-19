import fs from 'fs';
import path from 'path';
import { exec } from 'child_process';
import { getJson } from './utils/fetch.js';
import { formatName, toPascalCase } from './utils/string.js';
import { parseRawType } from './utils/parse.js';

const __dirname = new URL('.', import.meta.url).pathname;

const DOC_URI = {
  sample: path.join(__dirname, 'temp', 'sample.json'),
};

const TARGET_DIR = `./src`;

const store = {
  data: {},
  files: {
    components: {
      file: '',
      filePath: `${TARGET_DIR}/components/index.ts`,
    },
    enum: {
      file: '',
      filePath: `${TARGET_DIR}/enum/index.ts`,
    },
  },
  enums: [],
  components: [],
};

function getComment({ description, example }) {
  return `/**
 * ${description || ''}
 * @example ${example || ''}
 **/`;
}

function parseObject(key, { $ref, description, example, items, type }) {
  if ($ref) {
    const schemaKey = $ref.split('/').pop();
    const fieldName = formatName(schemaKey);
    parseComponents({ fieldName, schemaKey });
    return `${getComment({ description, example })}
${key}: ${fieldName};`;
  }

  if (type === 'array') {
    if (items.$ref) {
      const schemaKey = items.$ref.split('/').pop();
      const fieldName = formatName(schemaKey);
      parseComponents({ fieldName, schemaKey });
      return `${getComment({ description, example })}
${key}: ${fieldName}[];`;
    }

    if (items.type) {
      const rawType = parseRawType(items.type);
      return `${getComment({ description, example })}
${key}: ${rawType}[];`;
    }
  }

  const rawType = parseRawType(type);
  return `${getComment({ description, example })}
${key}: ${rawType};`;
}

function parseComponents({ fieldName, schemaKey }) {
  const component = store.data.components.schemas[schemaKey];
  if (!component) {
    console.log('not find component');
    return;
  }

  if (store.components.includes(fieldName)) {
    return;
  }

  if (store.enums.includes(fieldName)) {
    return;
  }

  const { description, enum: enums, example, properties, type } = component;

  if (enums) {
    const unionEnum = `${enums.map(value => `'${value}'`).join(' | ')}`;
    const enumTypeText = `${getComment({ description, example })}
export type ${fieldName} = ${unionEnum};\n\n`;
    store.enums.push(fieldName);
    store.files.enum.file += enumTypeText;
    return;
  }

  if (type === 'object') {
    if (!properties) {
      const value = `Record<string, never>`;
      const componentTypeText = `${getComment({ description, example })}
export type ${fieldName} = ${value};\n\n`;
      store.components.push(fieldName);
      store.files.components.file += componentTypeText;
      return;
    }

    const componentTypeText = `${getComment({ description, example })}
export interface ${fieldName} {
  ${Object.entries(properties ?? {})
    .map(([key, value]) => {
      return parseObject(key, value);
    })
    .join('\n')}
}\n\n`;
    store.components.push(fieldName);
    store.files.components.file += componentTypeText;
    return;
  }

  return;
}

function parseParameters({ method, parameters, pascalApiUrl, urlInfoComment }) {
  if (!parameters) {
    return '';
  }

  return `/**
 * Parameter of ${urlInfoComment}
 */
export interface ${pascalApiUrl}${toPascalCase(method)}Parameters {
${parameters
  .map(({ description: originDescription, example: originExample, name, required, schema }) => {
    const description = originDescription || schema?.description;
    const example = originExample || schema?.example;

    if (schema.$ref) {
      const schemaKey = schema.$ref.split('/').pop();
      const component = store.data.components.schemas[schemaKey];
      if (!component) {
        console.log('not find component');
        return `${getComment({ description, example })} // FIXME not found component`;
      }

      parseComponents({ fieldName: formatName(schemaKey), schemaKey });
      const { description: originDescription, enum: enums, example: originExample, properties, type } = component;
      const _description = description || originDescription;
      const _example = example || originExample;

      if (enums) {
        const unionEnum = `${enums.map(value => `'${value}'`).join(' | ')}`;
        return `${getComment({ description: _description, example: _example })}
  ${name}${required ? '' : '?'}: ${unionEnum};`;
      }

      if (type === 'object') {
        if (!properties) {
          return;
        }

        return `${Object.entries(properties ?? {})
          .map(([key, value]) => {
            return parseObject(key, value);
          })
          .join('\n')}`;
      }
    }

    return `${getComment({ description, example })}
  ${name}${required ? '' : '?'}: string;`;
  })
  .join('\n')}
}
`;
}

function parseBody({ body, method, pascalApiUrl, type, urlInfoComment }) {
  if (!body?.content) {
    return '';
  }

  const bodyContent = body.content['*/*'] || body.content['application/json'];
  if (!bodyContent?.schema) {
    return '';
  }

  const comment = `/**
 * ${toPascalCase(type)} body of ${urlInfoComment}
 **/\n`;

  if (bodyContent.schema.type === 'string') {
    return `${comment}export type ${pascalApiUrl}${toPascalCase(method)}${toPascalCase(type)} = string;\n`;
  }

  if (bodyContent.schema.type === 'array') {
    const schemaKey = bodyContent.schema.items.$ref.split('/').pop();
    const refName = formatName(schemaKey);
    parseComponents({ fieldName: refName, schemaKey });

    return `${comment}export type ${pascalApiUrl}${toPascalCase(method)}${toPascalCase(type)} = ${refName};\n`;
  }

  if (bodyContent.schema.$ref) {
    const schemaKey = bodyContent.schema.$ref.split('/').pop();
    const refName = formatName(schemaKey);
    parseComponents({ fieldName: refName, schemaKey });

    return `${comment}export type ${pascalApiUrl}${toPascalCase(method)}${toPascalCase(type)} = ${refName};\n`;
  }

  return `${comment}// FIXME: You should manually check this`;
}

function parseRequest({ data, fieldName, method, pascalApiUrl, path }) {
  if (!data) {
    return;
  }

  const {
    parameters,
    requestBody,
    responses: { 200: responseBody },
    summary,
    tags,
  } = data;
  const urlInfoComment = `(${method}) ${path}\n * - ${tags}-${summary}`;

  return [
    parseParameters({
      method,
      parameters,
      pascalApiUrl,
      urlInfoComment,
      fieldName,
    }),
    parseBody({
      type: 'request',
      method,
      body: requestBody,
      pascalApiUrl,
      urlInfoComment,
    }),
    parseBody({
      type: 'response',
      method,
      body: { ...responseBody },
      pascalApiUrl,
      urlInfoComment,
    }),
  ].join('\n');
}

function parsePath({ path }) {
  const { delete: del, get, patch, post, put } = store.data.paths[path];
  const pathArr = path.split('/');
  const directoryArr = pathArr.slice(1, pathArr.length).reduce((acc, cur) => {
    if (!cur) {
      return acc;
    }

    if (cur.includes('{') || cur.includes('}')) {
      return acc;
    }

    return acc.concat([cur]);
  }, []);

  const directory = directoryArr.slice(0, directoryArr.length - 1).join('/');
  const fileName = directoryArr.pop();

  const directoryPath = `${TARGET_DIR}/${directory}`;
  const filePath = `${directoryPath}/${fileName}.ts`;

  const fieldName = toPascalCase(`${directory}/${fileName}`).replace(/[/-]/g, '');
  const pascalApiUrl = toPascalCase(pathArr.join('/').replace(/{[^}]*}/g, 'Id')).replace(/[/-]/g, '');

  if (typeof store.files[fieldName] === 'undefined') {
    store.files[fieldName] = {
      file: '',
      filePath,
    };
  }

  [
    parseRequest({ method: 'get', data: get, pascalApiUrl, fieldName, path }),
    parseRequest({ method: 'post', data: post, pascalApiUrl, fieldName, path }),
    parseRequest({ method: 'put', data: put, pascalApiUrl, fieldName, path }),
    parseRequest({
      method: 'delete',
      data: del,
      pascalApiUrl,
      fieldName,
      path,
    }),
    parseRequest({
      method: 'patch',
      data: patch,
      pascalApiUrl,
      fieldName,
      path,
    }),
  ].forEach(x => {
    if (!x) {
      return;
    }
    const lineBreak = store.files[fieldName]['file'] === '' ? '' : '\n';

    store.files[fieldName]['file'] += `${lineBreak}${x}`;
  });
}

async function main() {
  try {
    const sampleData = await getJson(DOC_URI.sample);

    const data = {
      ...sampleData,
      paths: {
        ...sampleData.paths,
      },
      components: {
        schemas: {
          ...sampleData.components.schemas,
        },
      },
    };

    store.data = data;

    for (const path in data.paths) {
      parsePath({ path });
    }

    if (fs.existsSync(TARGET_DIR)) {
      fs.rmSync(TARGET_DIR, { recursive: true });
    }

    fs.mkdirSync(TARGET_DIR, { recursive: true });

    fs.writeFile(
      `${TARGET_DIR}/index.ts`,
      Object.values(store.files).reduce(
        (acc, cur) =>
          acc + `export * from '.${cur.filePath.replaceAll(TARGET_DIR, '').replace(/(\.ts$|\/index.ts$)/g, '')}';\n`,
        '',
      ),
      'utf8',
      err => {
        if (err) {
          console.error(err);
        }

        console.log(`Done writing ${TARGET_DIR}/index.ts`);
      },
    );

    Object.entries(store.files).forEach(([key, { file, filePath }]) => {
      const pathArr = filePath.split('/');
      pathArr.pop();
      const directoryPath = pathArr.join('/');
      if (directoryPath) {
        fs.mkdirSync(directoryPath, { recursive: true });
      }

      const relativePath = new Array(directoryPath.replaceAll(TARGET_DIR, '').split('/').length).join('../');
      const [componentsImportText, enumsImportText] = file.split('\n').reduce(
        (acc, cur) => {
          const rawText = cur.split(' ');
          for (let index = 0; index < rawText.length; index++) {
            const text = rawText[index];
            if (text.includes('string') || text.includes('number') || text.includes('boolean') || text.includes('*')) {
              continue;
            }

            const componentsIndex = store.components.findIndex(
              component => `${component};` === text || `${component}[];` === text,
            );

            if (componentsIndex > -1) {
              acc[0].add(store.components[componentsIndex]);
            }

            const enumsIndex = store.enums.findIndex(enums => `${enums};` === text || `${enums}[];` === text);
            if (enumsIndex > -1) {
              acc[1].add(store.enums[enumsIndex]);
            }
          }
          return acc;
        },
        [new Set(), new Set()],
      );

      if (enumsImportText.size > 0 && key !== 'enum') {
        file = `import { ${[...enumsImportText].join(',')} } from '${relativePath}enum'\n` + file;
      }
      if (componentsImportText.size > 0 && key !== 'components') {
        file = `import { ${[...componentsImportText].join(',')} } from '${relativePath}components'\n` + file;
      }

      fs.writeFileSync(filePath, file, 'utf-8');
      console.log(`Done writing ${filePath}`);
    });

    exec(`npx eslint --fix ${TARGET_DIR}`, () => {});
  } catch (error) {
    console.log(`error`, error);
  }
}

main();

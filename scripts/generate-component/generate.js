const fs = require('fs');
const path = require('path');

const [, , componentName] = process.argv;

function parsePascalCase(input) {
  return input.replace(/[_\-!@#$%^&*()\s]+(.)/g, (_, c) => c.toUpperCase()).replace(/^./, c => c.toUpperCase());
}

function validatePaths(paths) {
  paths.forEach(filePath => {
    if (fs.existsSync(filePath)) {
      throw new Error(`File or directory ${filePath} already exists. Aborting to prevent duplication.`);
    }
  });
}

function createFiles(basePath, files) {
  fs.mkdirSync(basePath, { recursive: true });
  files.forEach(({ content, name }) => {
    const fullPath = path.join(basePath, name);
    fs.writeFileSync(fullPath, content);
  });
}

function appendOrCreateFile(filePath, content) {
  if (fs.existsSync(filePath)) {
    fs.appendFileSync(filePath, content);
  } else {
    fs.writeFileSync(filePath, content);
  }
}

function createComponentFiles(componentName) {
  const pascalComponentName = parsePascalCase(componentName);
  const STORY_DIR = path.resolve(`apps/storybook/stories/Components/Display/${pascalComponentName}.stories.tsx`);
  const UI_PREFIX = path.resolve(`packages/ui-sass`);
  const UI_PUBLIC_SASS_FILE_PATH = path.resolve(`${UI_PREFIX}/public/styles/components.scss`);
  const COMPONENT_DIR = path.resolve(`${UI_PREFIX}/src/components/display/${pascalComponentName}`);
  const COMPONENT_INDEX_FILE_PATH = path.resolve(`${UI_PREFIX}/src/components/index.ts`);
  const TYPE_DIR = path.resolve(`${UI_PREFIX}/src/types/components/display/${pascalComponentName}`);
  const TYPE_INDEX_FILE_PATH = path.resolve(`${UI_PREFIX}/src/types/components/index.ts`);

  const StorybookTemplate = `import { Meta, StoryObj } from '@storybook/react';
import { ${pascalComponentName} } from '@components';
import { ${pascalComponentName}Props } from '@types';

const story: Meta<${pascalComponentName}Props> = {
  component: ${pascalComponentName},
  tags: ['autodocs'],
  parameters: {},
};

export default story;

export const Default: StoryObj<${pascalComponentName}Props> = {
  args: {
    children: '${pascalComponentName}',
  },
};
`;

  const ExportPublicSnippet = `@import "../../src/components/display/${pascalComponentName}";`;

  const ComponentTemplate = `import { ${pascalComponentName}Props } from '@types';
import { bem } from '@gugbab-integrated-admin-poc/utils';

const cn = bem('${pascalComponentName}');

const ${pascalComponentName} = ({ ...props }: ${pascalComponentName}Props) => {
  return (
    <div className={cn(undefined)}>
    </div>
  );
};

export default ${pascalComponentName};
`;

  const StyleTemplate = `.${pascalComponentName} {
}
`;

  const ExportComponentSnippet = `export { default as ${pascalComponentName} } from './display/${pascalComponentName}';
`;

  const TypeTemplate = `import { ReactNode } from 'react';
  
export interface ${pascalComponentName}Props {
  children: ReactNode;
}
`;

  const ExportTypeSnippet = `export type { ${pascalComponentName}Props } from './display/${pascalComponentName}';
`;

  validatePaths([STORY_DIR, COMPONENT_DIR, TYPE_DIR]);

  createFiles(path.dirname(STORY_DIR), [{ name: `${path.basename(STORY_DIR)}`, content: StorybookTemplate }]);
  console.log(`Files created successfully in StoryBook`);

  createFiles(COMPONENT_DIR, [
    { name: 'index.tsx', content: ComponentTemplate },
    { name: 'index.scss', content: StyleTemplate },
  ]);
  console.log(`Files created successfully in Component`);

  createFiles(TYPE_DIR, [{ name: 'index.ts', content: TypeTemplate }]);
  console.log(`Files created successfully in Type`);

  appendOrCreateFile(UI_PUBLIC_SASS_FILE_PATH, ExportPublicSnippet);
  console.log('Added Sass component path to the public folder');

  appendOrCreateFile(COMPONENT_INDEX_FILE_PATH, ExportComponentSnippet);
  console.log('Added Component path to the Component Index');

  appendOrCreateFile(TYPE_INDEX_FILE_PATH, ExportTypeSnippet);
  console.log('Added Type path to the Type Index');

  console.log('Component, story, and index files successfully created and updated.');
}

createComponentFiles(componentName);

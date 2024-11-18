//const SVGFixer = require('oslllo-svg-fixer');

import SVGFixer from 'oslllo-svg-fixer';

const [, _, file] = process.argv;

const options = {
  showProgressBar: true,
  throwIfDestinationDoesNotExist: false,
};

function getFileInfo(pathname) {
  const filePath = pathname.split('/');
  const filename = filePath[filePath.length - 1];
  filePath.pop();
  return {
    filePath: filePath.join('/'),
    filename,
  };
}

async function fix(filepath) {
  const fileInfo = getFileInfo(filepath);
  // eslint-disable-next-line no-useless-catch
  try {
    await SVGFixer(`${fileInfo.filePath}/${fileInfo.filename}`, fileInfo.filePath, options).fix();
    console.log('fixed svg', file);
  } catch (err) {
    throw err;
  }
}

fix(file);

// run command
// npm run create-component -- --name=ComponentName --path=/path/where/component/shouldBeCreated

const fs = require('fs');
const yargs = require('yargs/yargs');

const { getTypesBaseCode, getStylesBaseCode, getComponentBaseCode, getExportsBaseCode } = require('../data/codeBase');

const messages = {
  ERROR_NAME: "error: Component's name missing.",
  ERROR_PATH: 'error: Wrong Path.',
  ERROR_DUPLICATE_NAME: 'error: Component with this name already exists.',
  SUCCESS: 'Component Successfully Created!',
};

const exitWithMessage = message => {
  console.log(message);
  process.exit(1);
};

const getDetails = () => {
  let { name, path: folderPath } = yargs(process.argv.slice(2)).argv;
  if (!name) {
    exitWithMessage(messages.ERROR_NAME);
  }
  if (!folderPath) {
    folderPath = process.env.INIT_CWD;
  }
  return [name, folderPath];
};

const checkPath = path => {
  if (!fs.existsSync(path)) {
    exitWithMessage(messages.ERROR_PATH);
  }
};

const createFolder = (path, name) => {
  const fullPath = path + '/' + name;
  if (!fs.existsSync(fullPath)) {
    fs.mkdirSync(fullPath);
  } else {
    exitWithMessage(messages.ERROR_DUPLICATE_NAME);
  }
};

const createFiles = (path, name) => {
  const fullPath = path + '/' + name;
  try {
    fs.writeFileSync(fullPath + '/types.ts', getTypesBaseCode(name));
    fs.writeFileSync(fullPath + '/styles.ts', getStylesBaseCode());
    fs.writeFileSync(fullPath + '/' + name + '.tsx', getComponentBaseCode(name));
    fs.writeFileSync(fullPath + '/index.d.ts', getExportsBaseCode(name));
  } catch (err) {
    exitWithMessage(err);
  }
};

const [componentName, folderPath] = getDetails();
checkPath(folderPath);
createFolder(folderPath, componentName);
createFiles(folderPath, componentName);
// fix lint

console.log(messages.SUCCESS);

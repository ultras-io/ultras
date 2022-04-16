// const path = require('path');
const { applyConfigForLinkedDependencies } = require('@carimus/metro-symlinked-deps');

const metroProjectConfigs = {
  transformer: {
    getTransformOptions: async () => ({
      transform: {
        experimentalImportSupport: false,
        inlineRequires: true,
      },
    }),
  },
};

module.exports = applyConfigForLinkedDependencies(metroProjectConfigs, {
  silent: false,
  debug: true,
  // projectRoot: path.join(__dirname, '..', '..'),
  projectRoot: __dirname,
  resolveBlacklistDirectoriesSymlinks: true,
  resolveAdditionalWatchFoldersSymlinks: true,
  resolveNodeModulesAtRoot: true,
});

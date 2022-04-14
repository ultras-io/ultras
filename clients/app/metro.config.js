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
  projectRoot: __dirname,
  resolveBlacklistDirectoriesSymlinks: true,
  resolveAdditionalWatchFoldersSymlinks: true,
  silent: false,
});

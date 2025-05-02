const { getDefaultConfig } = require('expo/metro-config');
const nodeLibs = require('node-libs-react-native');

module.exports = (async () => {
  const config = await getDefaultConfig(__dirname);
  config.resolver.extraNodeModules = {
    ...nodeLibs,
    crypto: require.resolve('crypto-browserify'),
    net: require.resolve('./emptyModule.js'),
    tls: require.resolve('./emptyModule.js'),
  };
  return config;
})();
module.exports = function override(config) {
  config.resolve.fallback = {
    "http": false,
    "https": false,
    "zlib": false,
    "stream": false
  };
  return config;
};
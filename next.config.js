
module.exports = {
  webpack(config) {

    config.resolve.fallback = {
      ...config.resolve.fallback, // if you miss it, all the other options in fallback, specified
      // by next.js will be dropped. Doesn't make much sense, but how it is
      fs: false, // the solution
      micropython: false,
    };

    config.module.rules.push({
      test: /\.py$/i,
      use: 'raw-loader',
    });

    return config;
  },
};

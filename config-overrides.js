const webpack = require("webpack");

module.exports = function override(config) {
  config.resolve.fallback = {
    ...config.resolve.fallback,
    querystring: require.resolve("querystring-es3"),
  };

  // Setup middlewares (if required)
  config.devServer = {
    ...config.devServer,
    setupMiddlewares: (middlewares, devServer) => {
      if (!devServer) {
        throw new Error("webpack-dev-server is not defined");
      }

      // Custom middleware logic here if needed
      console.log("Using setupMiddlewares");

      return middlewares;
    },
  };

  return config;
};

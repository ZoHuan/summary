const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
  outputDir: "docs",
  publicPath: "./",
  baseUrl: "./",
  transpileDependencies: true,
  configureWebpack: {
    resolve: {
      fallback: {
        path: require.resolve("path-browserify"),
      },
    },
  },
});

const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
	publicPath: "./",
	transpileDependencies: true,
	configureWebpack: {
		resolve: {
			fallback: {
				path: require.resolve("path-browserify"),
			},
		},
	},
});

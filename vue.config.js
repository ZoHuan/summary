const { defineConfig } = require("@vue/cli-service");

module.exports = defineConfig({
	publicPath: process.env.NODE_ENV === "production" ? "." : "/",
	transpileDependencies: true,
	configureWebpack: {
		resolve: {
			fallback: {
				path: require.resolve("path-browserify"),
			},
		},
	},
});

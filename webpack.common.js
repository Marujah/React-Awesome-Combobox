const path = require("path");
const CleanWebpackPlugin = require("clean-webpack-plugin");

module.exports = {
    entry: "./lib/index.js",
    output: {
        // filename and path are required
        filename: "main.js",
        // output.path
        // The output directory as an absolute path
        path: path.resolve(__dirname, "build")
    },
    module: {
        rules: [
            {
                // JSX and JS are all .js
                test: /\.js$/,
                exclude: /node_modules/,
                use: {
                    loader: "babel-loader",
                }
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(["build"]),
    ]
};

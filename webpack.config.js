var path = require('path');
const CleanWebpackPlugin = require("clean-webpack-plugin");
const UglifyJsPlugin = require('uglifyjs-webpack-plugin');

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname, 'build'),
        filename: 'index.js',
        libraryTarget: 'commonjs2'
    },
    mode: "production",
    optimization: {
        // minimize default is true
        minimizer: [
            // Optimize/minimize CSS assets.
            // Solves extract-text-webpack-plugin CSS duplication problem
            // By default it uses cssnano but a custom CSS processor can be specified
            new UglifyJsPlugin(),
        ]
    },
    module: {
        rules: [
            {
                test: /\.js$/,
                include: path.resolve(__dirname, 'src'),
                exclude: /(node_modules|dist)/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: ['env']
                    }
                }
            },
            {
                test: /\.css$/,
                use: [
                    {
                        loader: "style-loader"
                    },
                    {
                        loader: 'css-loader',
                        options: { url: false }
                    }
                ]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(["build"]),
    ]
    // externals: {
    //     'react': 'commonjs react' // this line is just to use the React dependency of our parent-testing-project instead of using our own React.
    // }
};

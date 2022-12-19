const path = require('path');
const { merge } = require('webpack-merge');
const common = require('./webpack.dev.config.js');
const CopyPlugin = require("copy-webpack-plugin");

module.exports = merge(common, {
    entry: './src/index.ts',
    mode: 'production',
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: "static" },
            ]
        })
    ],
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'build'),
        clean: true
    }
});
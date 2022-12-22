const path = require('path')
const Dotenv = require('dotenv-webpack')

module.exports = {
    entry: './src/index.ts',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                include: [path.resolve(__dirname, 'src')]
            },
            {
                test: /\.css$/i,
                use: ["style-loader", "css-loader"],
            },
        ]
    },
    output: {
        filename: 'bundle.js',
        path: path.resolve(__dirname, 'public'),
    },
    resolve: {
        extensions: ['.ts', '.js'],
        alias: {
            lib: path.resolve(__dirname, 'src/lib'),
            pages: path.resolve(__dirname, 'src/pages'),
            utilityPages: path.resolve(__dirname, 'src/utilityPages'),
            objects: path.resolve(__dirname, 'src/objects')
        },
        fallback: {
            "fs": false,
            "path": false,
            "os": false,
        },
    },
    plugins: [
        new Dotenv({ systemvars: true })
    ],
    devtool: 'source-map',
    mode: 'development',
}
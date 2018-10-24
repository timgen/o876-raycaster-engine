const path = require('path');

const devConfig = {
    mode: "development",
    entry: {
        libraycaster: path.resolve(__dirname, 'src/index.js'),
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'umd',
        filename: '[name].js'
    },
    devtool: 'source-map',
    module: {
        rules: [
        ]
    },
    plugins: [
    ],
    target: 'web'
};

const testConfig = {
    mode: "development",
    entry: {
        tests: path.resolve(__dirname, 'tests/index.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'commonjs2',
        filename: '[name].js'
    },
    devtool: 'source-map',
    module: {
        rules: [
        ]
    },
    plugins: [
    ],
    target: 'node'
};


const exampleConfig = {
    mode: "development",
    entry: {
        devtest: path.resolve(__dirname, 'examples/devtest/index.js')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        libraryTarget: 'umd',
        filename: 'example-[name].js',
    },
    devtool: 'source-map',
    module: {
        rules: [
        ]
    },
    plugins: [
    ],
    target: 'web'
};

module.exports = [devConfig, testConfig, exampleConfig];

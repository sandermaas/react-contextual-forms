const { NODE_ENV } = process.env;
const package = require('./package');
const path = require('path');

module.exports = {
    mode: NODE_ENV,
    entry: {
        [package.name]: path.resolve(__dirname, 'src/index.ts'),
        [package.name + '.min']: path.resolve(__dirname, 'src/index.ts')
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename: '[name].js',
        library: package.name,
        libraryTarget: 'umd',
        umdNamedDefine: true
    },
    externals: ['react'],
    resolve: {
        extensions: ['.ts', '.tsx', '.js']
    },
    devtool: 'source-map',
    module: {
        rules: [
            {
                test: /\.(js|jsx|ts|tsx)$/,
                include: path.resolve(__dirname, 'src'),
                loader: 'babel-loader',
                options: {
                    cacheDirectory: true,
                    cacheCompression: true,
                    compact: true
                }
            }
        ]
    }
};
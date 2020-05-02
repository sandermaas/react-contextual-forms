const { BUILD_TYPE } = process.env;
const buildType = BUILD_TYPE || 'commonjs';

module.exports = {
    presets: ['@babel/preset-env', '@babel/preset-react', '@babel/preset-typescript'],
    plugins: [
        '@babel/proposal-class-properties',
        '@babel/plugin-syntax-dynamic-import',
        buildType === 'commonjs' && '@babel/transform-modules-commonjs',
        ['@babel/transform-runtime', {
            useESModules: buildType === 'es' ? true : false,
            version: require('./package.json').dependencies[
                '@babel/runtime'
            ].replace(/^[^0-9]*/, '')
        }]
    ].filter(Boolean),
    comments: false
};
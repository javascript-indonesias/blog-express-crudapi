/* eslint-disable import/no-extraneous-dependencies */
const path = require('path');
// const fs = require('fs');
const TerserPlugin = require('terser-webpack-plugin');
const CopyPlugin = require('copy-webpack-plugin');
const nodeExternals = require('webpack-node-externals');
const pkg = require('./package.json');

const config = require('./config');

module.exports = {
    mode: 'production',
    entry: {
        'server.bundle': path.resolve(__dirname, 'src', 'index.js'),
    },
    target: 'node',
    node: {
        // Need this when working with express, otherwise the build fails
        __dirname: false, // if you don't put this is, __dirname
        __filename: false, // and __filename return blank or /
    },
    externals: [nodeExternals()],
    optimization: {
        minimize: true,
        minimizer: [
            new TerserPlugin({
                parallel: true,
                extractComments: false,
                terserOptions: {
                    mangle: true,
                    output: {
                        comments: false,
                    },
                },
            }),
        ],
    },
    output: {
        // filename: 'server.bundle.js',
        filename: '[name].js',
        path: path.resolve(__dirname, 'bundle', `server-${config.version}`),
    },
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/,
                use: {
                    loader: 'babel-loader',
                    options: {
                        presets: [
                            [
                                '@babel/preset-env',
                                {
                                    targets: {
                                        node: pkg.engines.node,
                                    },
                                },
                            ],
                        ],
                        plugins: [
                            [
                                '@babel/plugin-transform-runtime',
                                {
                                    regenerator: true,
                                },
                            ],
                            '@babel/plugin-proposal-object-rest-spread',
                        ],
                    },
                },
            },
        ],
    },
    plugins: [
        new CopyPlugin({
            patterns: [
                { from: 'package.json', to: './' },
                { from: 'pnpm-lock.yaml', to: './' },
                { from: 'DEPLOY-README.txt', to: './' },
                { from: '.env', to: './' },
                { from: 'winston-logs', to: './winston-logs' },
                { from: 'src/views', to: './views' },
                { from: 'src/public', to: './public' },
            ],
        }),
    ],
    resolve: {
        modules: ['node_modules'],
        extensions: ['.ts', '.js'],
    },
};

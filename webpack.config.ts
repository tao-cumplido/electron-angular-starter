import * as path from 'path';

import * as fs from 'fs-extra';
import { Configuration } from 'webpack';
import * as merge from 'webpack-merge';

const packageJson = fs.readJsonSync('./package.json');
const isProduction = process.argv.includes('production');
const folder = path.resolve(__dirname, isProduction ? 'dist' : 'dev');

fs.removeSync(folder);
fs.ensureDirSync(folder);
fs.writeJsonSync(path.join(folder, 'package.json'), {
    name: packageJson.name,
    version: packageJson.version,
    main: 'main.js',
});

const common: Configuration = {
    entry: './src/main/main.ts',
    target: 'electron-main',
    module: {
        rules: [
            {
                test: /\.ts$/,
                use: 'ts-loader',
                exclude: [/node_modules/],
            },
        ],
    },
    resolve: {
        extensions: ['.ts', '.js'],
    },
    output: {
        filename: 'main.js',
        path: folder,
    },
};

const production = merge(common, {
    mode: 'production',
});

const development = merge(common, {
    mode: 'development',
});

export default (isProduction ? production : development);

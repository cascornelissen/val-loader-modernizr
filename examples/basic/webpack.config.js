import path from 'node:path';

export default {
    entry: path.resolve(import.meta.dirname, './index.js'),
    mode: 'development',
    module: {
        rules: [{
            test: /\.modernizrrc$/,
            use: [{
                loader: 'val-loader',
                options: {
                    executableFile: path.resolve(import.meta.dirname, '../../index.js')
                }
            }]
        }]
    }
};

const path = require('path');

module.exports = {
    module: {
        rules: [{
            test: /\.modernizrrc$/,
            use: [{
                loader: 'val-loader',
                options: {
                    executableFile: path.resolve(__dirname, '../../lib/index.js')
                }
            }]
        }]
    }
};

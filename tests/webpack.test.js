const fs = require('fs');
const path = require('path');
const webpack = require('webpack');

it('hooks into Webpack correctly', (done) => {
    webpack({
        entry: path.resolve(__dirname, 'input/webpack/index.js'),
        output: {
            path: path.resolve(__dirname, 'output'),
            filename: 'webpack.js'
        },
        module: {
            rules: [{
                test: /\.modernizrrc$/,
                use: [{
                    loader: 'val-loader',
                    options: {
                        executableFile: path.resolve(__dirname, '../lib/index.js')
                    }
                }]
            }]
        }
    }, (error, stats) => {
        const json = stats.toJson();

        expect(error).toEqual(null);
        expect(json.errors).toHaveLength(0);
        expect(fs.readFileSync(path.resolve(__dirname, 'output/webpack.js'), 'utf8')).toContain('modernizr.build');

        done();
    });
});

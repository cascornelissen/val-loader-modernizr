import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import assert from 'node:assert';
import webpack from 'webpack';
import { rimraf } from 'rimraf';
import { describe, it, afterEach } from 'node:test';

const MODERNIZR_CONFIGURATION_PATH = path.resolve(os.tmpdir(), '.modernizrrc');
const MODERNIZR_CUSTOM_BUILD_DETECTION_REGEX = /https:\/\/modernizr.com\/download/;

afterEach(() => {
    rimraf.sync(MODERNIZR_CONFIGURATION_PATH);
    rimraf.sync(path.resolve(import.meta.dirname, '../dist/'));
});

describe('Executable', () => {
    const options: Partial<webpack.Configuration> = {
        entry: `data:text/javascript,import '${MODERNIZR_CONFIGURATION_PATH}';`,
        mode: 'development',
        devtool: false,
        output: {
            clean: true,
            pathinfo: false
        },
        module: {
            rules: [{
                test: /\.modernizrrc$/,
                use: [{
                    loader: 'val-loader',
                    options: {
                        executableFile: path.resolve(import.meta.dirname, '../index.js')
                    }
                }]
            }]
        }
    };

    it('injects a modernizr build into the generated bundle', (context, done) => {
        fs.writeFileSync(MODERNIZR_CONFIGURATION_PATH, JSON.stringify({
            'enableClasses': true,
            'minify': true,
            'feature-detects': [
                'a/download'
            ]
        }));

        webpack(options, (errors, stats) => {
            const bundle = fs.readFileSync(path.resolve(stats!.compilation.compiler.outputPath, 'main.js'), 'utf8'); // eslint-disable-line @typescript-eslint/no-non-null-assertion

            assert.match(bundle, MODERNIZR_CUSTOM_BUILD_DETECTION_REGEX);
            assert.match(bundle, /adownload/);
            assert.strictEqual(errors, null);
            assert.strictEqual(stats?.toJson().errors?.length, 0);

            done();
        });
    });

    it('injects a modernizr build with the default configuration', (context, done) => {
        fs.writeFileSync(MODERNIZR_CONFIGURATION_PATH, '');

        webpack(options, (errors, stats) => {
            const bundle = fs.readFileSync(path.resolve(stats!.compilation.compiler.outputPath, 'main.js'), 'utf8'); // eslint-disable-line @typescript-eslint/no-non-null-assertion

            assert.match(bundle, MODERNIZR_CUSTOM_BUILD_DETECTION_REGEX);
            assert.doesNotMatch(bundle, /adownload/);
            assert.strictEqual(errors, null);
            assert.strictEqual(stats?.toJson().errors?.length, 0);

            done();
        });
    });

    it('does not inject a modernizr build when the configuration is invalid, and returns an error to the user', (context, done) => {
        fs.writeFileSync(MODERNIZR_CONFIGURATION_PATH, 'invalid-json');

        webpack(options, (errors, stats) => {
            const bundle = fs.readFileSync(path.resolve(stats!.compilation.compiler.outputPath, 'main.js'), 'utf8'); // eslint-disable-line @typescript-eslint/no-non-null-assertion

            assert.match(bundle, /Module build failed/);
            assert.doesNotMatch(bundle, MODERNIZR_CUSTOM_BUILD_DETECTION_REGEX);
            assert.doesNotMatch(bundle, /adownload/);
            assert.strictEqual(stats?.toJson().errors?.length, 1);

            done();
        });
    });
});

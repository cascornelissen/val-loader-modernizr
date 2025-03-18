import fs from 'node:fs';
import webpack from 'webpack';
import modernizr from 'modernizr';

const executable = (options: unknown, context: webpack.LoaderContext<unknown>) => {
    return new Promise((resolve, reject) => {
        try {
            const content = fs.readFileSync(context.resourcePath, 'utf8');
            const options: Parameters<typeof modernizr.build>[0] = content ? JSON.parse(content) : {}; // eslint-disable-line @typescript-eslint/no-unsafe-assignment

            modernizr.build(options, (output) => {
                resolve({
                    cacheable: true,
                    dependencies: [context.resourcePath],
                    code: output
                });
            });
        } catch (error) {
            reject(error); // eslint-disable-line @typescript-eslint/prefer-promise-reject-errors
        }
    });
};

export default executable;

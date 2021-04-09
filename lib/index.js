const fs = require('fs');
const modernizr = require('modernizr');

module.exports = (loaderOptions = {}, loaderContext) => {
    return new Promise((resolve, reject) => {
        try {
            const content = fs.readFileSync(loaderContext.resourcePath, 'utf8');
            const options = content ? JSON.parse(content) : {};

            modernizr.build(options, (output) => {
                resolve({
                    cacheable: true,
                    dependencies: [
                        loaderContext.resourcePath
                    ],
                    code: output
                });
            });
        } catch(error) {
            reject(error);
        }
    });
};

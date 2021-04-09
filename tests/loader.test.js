const fs = require('fs');
const path = require('path');
const modernizr = require('modernizr');
const loader = require('../lib');

test.each([
    ['.modernizrrc'],
    ['.modernizrrc-empty']
])('builds correctly for configuration %s', async (filename) => {
    const loaderContext = {
        resourcePath: path.resolve(__dirname, 'input/', filename)
    };
    const content = fs.readFileSync(loaderContext.resourcePath, 'utf8');
    const json = content ? JSON.parse(content) : {};
    const result = await loader(undefined, loaderContext);

    expect(result).toHaveProperty('code');
    expect(result).toHaveProperty('cacheable', true);
    expect(modernizr.build).toHaveBeenCalledWith(json, expect.anything());
});

it('rejects when configuration is invalid JSON', async () => {
    const loaderContext = {
        resourcePath: path.resolve(__dirname, 'input/.modernizrrc-invalid')
    };

    await expect(loader(undefined, loaderContext)).rejects.toThrow();
});

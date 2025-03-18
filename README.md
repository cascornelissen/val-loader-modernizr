# Modernizr configuration for [`val-loader`][npm-val-loader]
[![npm](https://img.shields.io/npm/v/val-loader-modernizr.svg?style=flat-square)](https://www.npmjs.com/package/val-loader-modernizr)
[![npm](https://img.shields.io/npm/dm/val-loader-modernizr.svg?style=flat-square)](https://www.npmjs.com/package/val-loader-modernizr)
[![license](https://img.shields.io/github/license/cascornelissen/val-loader-modernizr.svg?style=flat-square)](LICENSE.md)

This configuration is meant to be used in conjunction with [`val-loader`][npm-val-loader] and will compile
a custom [Modernizr][modernizr] build based on a [configuration file][modernizr-configuration]
that has to be provided.

The setup is based on [the official documentation][webpack-docs-val-loader-modernizr] and includes 
`modernizr` and `val-loader` as peer dependencies, allowing you to use any supported version.


## Installation
```shell
npm install val-loader-modernizr --save-dev
```


## Usage
**Webpack configuration**  
Add a module rule to the Webpack configuration using [`val-loader`][npm-val-loader] as the loader with the
[`executableFile`][val-loader-executable-file] option set to `val-loader-modernizr`.

```js
export default {
    module: {
        rules: [{
            test: /\.modernizrrc$/,
            use: [{
                loader: 'val-loader',
                options: {
                    executableFile: require.resolve('val-loader-modernizr')
                }
            }]
        }]
    }
}
```

**Modernizr configuration**  
Create a [Modernizr configuration file][modernizr-configuration] and enable the options and feature detects that are needed.

```json
{
    "enableClasses": true,
    "minify": true,
    "feature-detects": [
        
    ]
}
```

**Importing**  
Import the file where needed, the loader will take care of compiling a build and injecting it into the bundle.

```js
import './.modernizrrc';
```


## License
This project is [licensed](LICENSE.md) under the [MIT](https://opensource.org/licenses/MIT) license.



[npm-val-loader]: https://www.npmjs.com/package/val-loader
[val-loader-executable-file]: https://github.com/webpack-contrib/val-loader#executableFile
[modernizr]: https://modernizr.com/
[modernizr-configuration]: https://github.com/Modernizr/Modernizr/blob/master/lib/config-all.json
[webpack-docs-val-loader-modernizr]: https://webpack.js.org/loaders/val-loader/#modernizr

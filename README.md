# Modernizr configuration for [`val-loader`](npmjs.com/package/val-loader)
[![npm](https://img.shields.io/npm/v/val-loader-modernizr.svg?style=flat-square)](https://www.npmjs.com/package/val-loader-modernizr)
[![npm](https://img.shields.io/npm/dm/val-loader-modernizr.svg?style=flat-square)](https://www.npmjs.com/package/val-loader-modernizr)
[![license](https://img.shields.io/github/license/cascornelissen/val-loader-modernizr.svg?style=flat-square)](LICENSE.md)

This configuration is meant to be used in conjunction with [`val-loader`](npmjs.com/package/val-loader) and will compile
a custom [Modernizr](https://modernizr.com/) build based on a [configuration file](https://github.com/Modernizr/Modernizr/blob/master/lib/config-all.json)
that has to be provided.

The setup is based on [the official documentation](https://webpack.js.org/loaders/val-loader/#modernizr) and doesn't include 
`modernizr` or `val-loader` as dependencies, allowing you to use any supported version.


## Installation
```shell
npm install val-loader-modernizr val-loader modernizr --save-dev
```


## Usage
**Webpack configuration**  
Add a module rule to the Webpack configuration using [`val-loader`](npmjs.com/package/val-loader) as the loader with the [`executableFile`](https://github.com/webpack-contrib/val-loader#executableFile) option set to `val-loader-modernizr`.

```js
module.exports = {
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
Create a [Modernizr configuration file](https://github.com/Modernizr/Modernizr/blob/master/lib/config-all.json) and enable the options and feature detects that are needed.
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
```
import './.modernizrrc';
```


## License
This project is [licensed](LICENSE.md) under the [MIT](https://opensource.org/licenses/MIT) license.

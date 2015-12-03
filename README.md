# webpack-hocon-loader

NOTE: This is a limited parser with no warranties.  Does not support links.

## Install

```
// In webpack.config.js
        loaders: [
            {test: /\.conf$/, loader: 'hocon-loader'}
        ]
        
// In your module file
        var conf = require('your/hocon/file.conf'); // provides a JS object
```

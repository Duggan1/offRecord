const NodePolyfillPlugin = require('node-polyfill-webpack-plugin')

module.exports = {
  // ...
  plugins: [new NodePolyfillPlugin()],
  resolve: {
    fallback: {
        url: require.resolve('url'),
        fs: false,
        assert: require.resolve('assert'),
        crypto: require.resolve('crypto-browserify'),
        http: require.resolve('stream-http'),
        https: require.resolve('https-browserify'),
        os: require.resolve('os-browserify/browser'),
        buffer: require.resolve('buffer'),
        stream: require.resolve('stream-browserify'),
        path: require.resolve('path-browserify'),
        querystring: require.resolve('querystring-es3'),
        zlib: require.resolve("browserify-zlib"),
       
    },
},

}
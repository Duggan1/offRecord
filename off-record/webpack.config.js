module.exports = {
    // ... other configuration options ...
    module: {
      rules: [
        {
          test: /\.(js|jsx)$/,
          exclude: /node_modules/,
          use: {
            loader: 'babel-loader',
            options: {
              presets: ['@babel/preset-env', '@babel/preset-react'],
              plugins: [['@babel/plugin-transform-runtime', { regenerator: true }]],
              // set throwIfNamespace to false to bypass the warning
              throwIfNamespace: false
            }
          }
        }
      ]
    }
  };
// resolve: {
//     fallback: {
//       "querystring": require.resolve('querystring-es3'),
//       "path": require.resolve("path-browserify"),
//         "buffer": require.resolve("buffer/"),
//         "crypto": require.resolve("crypto-browserify"),
//         "http": require.resolve("stream-http"),
//         "stream": require.resolve("stream-browserify"),
//         "url": require.resolve("url/"),
//         "util": require.resolve("util/")
//     }
//   }

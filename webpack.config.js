const path = require('path');

module.exports = {
  entry: './netlify/functions/bot.js',
  target: 'node',
  mode: 'production',
  output: {
    path: path.resolve(__dirname, 'dist/functions'),
    filename: 'bot.js'
  },
  module: {
    rules: [
      {
        test: /\.js$/,
        exclude: /node_modules/,
        use: {
          loader: 'babel-loader',
          options: {
            presets: ['@babel/preset-env']
          }
        }
      }
    ]
  },
  externals: {
    'express': 'commonjs express',
    'axios': 'commonjs axios',
    'cors': 'commonjs cors',
    'body-parser': 'commonjs body-parser',
    'deepl-node': 'commonjs deepl-node',
    'node-telegram-bot-api': 'commonjs node-telegram-bot-api',
    'tonweb': 'commonjs tonweb'
  }
};

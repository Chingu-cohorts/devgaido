const path = require('path');
const webpack = require('webpack');

const config = {
  devServer: {
    host: 'localhost',
    port: '8081',
    historyApiFallback: true,
    hot: true,
    headers: {
      'Access-Control-Allow-Origin': '*',
    },
  },
  entry: [
    'webpack-dev-server/client?http://localhost:8081',
    'react-hot-loader/patch',
    path.join(__dirname, '/src/client/index.jsx'),
  ],
  output: {
    publicPath: 'http://localhost:8081/',
    path: path.join(__dirname, '/dist/public'),
    filename: 'client.bundle.js',
  },
  module: {
    loaders: [
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        loader: 'babel-loader',
      },
      {
        test: /\.css$/,
        loader: 'style-loader!css-loader',
      },
      {
        test: /\.json$/,
        loader: 'json-loader',
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.jsx'],
  },
  plugins: [
    new webpack.NamedModulesPlugin(),
    new webpack.HotModuleReplacementPlugin(),
  ],
};


module.exports = config;

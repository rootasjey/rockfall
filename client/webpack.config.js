var webpack = require('webpack');

module.exports = {
  devtool: 'eval',
  entry: [
    "./index.js"
  ],
  output: {
    path: __dirname+"/build",
    filename: "main.js"
  },
  plugins: [
    new webpack.NoErrorsPlugin(),
    new webpack.HotModuleReplacementPlugin(),
    new webpack.NoErrorsPlugin()
  ],
  resolve: {
    extensions: ['', '.js', '.jsx','es6.js']
  },
  module: {
      loaders: [
          { test: /\.js$/, loaders: ['react-hot', 'babel-loader'], exclude: /node_modules/ },
          { test: /\.jsx?$/, loaders: ['react-hot', 'babel-loader'], exclude: /node_modules/ },
          { test: /\.css$/, loader: "style!css" },
          { test: /\.svg$/, loader: "raw" },
          {
        test: /\.es6\.js$/, loader: "babel-loader",
        query: {
          presets: ['es2015']
        }
      }
      ]
  }/*,
    query: {presets: ['es2015', 'react'] }*/
};

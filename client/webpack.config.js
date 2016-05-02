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
<<<<<<< HEAD
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
=======
        {
          test: /\.jsx?$/,
          exclude: /(node_modules|bower_components)/,
          loader: 'babel', // 'babel-loader' is also a legal name to reference
          query: {
            presets: ['es2015', 'react']
          }
      },
      {
        test: /\.js$/,
        exclude: /(node_modules|bower_components)/,
        loader: 'babel', // 'babel-loader' is also a legal name to reference
        query: {
          presets: ['es2015', 'react']
        }
      }
  ]
  }
>>>>>>> fd6b593dad280c2d2dbdb918f55fa76b20ff96ee
};

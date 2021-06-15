/* eslint-env node */

const path = require('path');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const WriteFilePlugin = require('write-file-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

// Base directory of all static asset files that may be included in the application.
const assetsDir = path.resolve(__dirname, 'assets');

// Transient distribution directory that will house any build of the application.
const distDir = path.resolve(__dirname, 'dist');

module.exports = {
  plugins: [

    // Clean the dist directory with every build removing stale files.
    new CleanWebpackPlugin(),

    // Copy all static assets to the dist directory.
    new CopyWebpackPlugin([
      { from: assetsDir, to: distDir },
    ]),

    // Force the webpack dev server to write files to the dist directory.
    // This allows to check the file output during development. Without this
    // plugin webpack serves all dynamically generated files from memory.
    new WriteFilePlugin(),

    // Extract all collected CSS ressource imported in the build process into
    // one CSS bundle.
    new MiniCssExtractPlugin({
      path: distDir,
      publicPath: '/css/',
      filename: 'css/bundle.css',
    }),
  ],

  // Defines the entry point of the application.
  // Concat our index.js file with a fetch-API polyfill.
  entry: ['whatwg-fetch', './src/js/index.js'],

  // Defines the JavaScript output of the build process and where it will
  // be served by the webserver.
  output: {
    path: distDir,
    publicPath: '/js/',
    // out put path must be absolute
    filename: 'js/bundle.js',
  },

  module: {
    // Theses rules tell webpack how to handle all different kind of files
    // most importantly JavaScript and CSS.
    rules: [
      {
        test: /\.js$/,
        exclude: /(node_modules)/,
        use: {
          // A loader is "middleware" during the processing adding more functionality.
          // In this case, we transpile our EcmaScript code into a more widly supported
          // format that can be serve by all supported browsers.
          // By including the preset-environment of the Babel.js tool, features unsupported
          // by todays browsers will be polyfilled in the final build of the application.
          loader: 'babel-loader',
          options: {
            presets: [
              ['@babel/preset-env', {
                useBuiltIns: 'usage',
                corejs: 3,
              }],
            ],
          },
        },
      },
      {
        // Tells webpack how to handle imports of CSS files in the JavaScript source code
        // by bundling it into a seperate CSS-file.
        test: /\.css$/i,
        use: [MiniCssExtractPlugin.loader, 'css-loader'],
      },
      // for framework7 icon font: 
      { test: /\.(woff|woff2|eot|ttf)$/, loader: 'url-loader?limit=100000' },
      {
        test: /\.f7.html$/,
        use: [
          {
            loader: 'framework7-component-loader',
            options: {
              helpersPath: './src/js/template7-helpers-list.js'
            }
          }
        ],
      },



    ],
  },

  // Output source-map files to allow debugging of minified JavaScript source code
  // in the browser.
  devtool: 'source-map',

  // Configures the webpack dev server for development.
  devServer: {
    contentBase: distDir,
    compress: true,
    open: true,
    port: 3000,
  },
};

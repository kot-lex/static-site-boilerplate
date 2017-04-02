const path = require('path');
const ExtractTextPlugin = require("extract-text-webpack-plugin");
const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const fs = require('fs');

const pagesDir = 'src/templates/pages/';

// Create HTML page from every file in tempates directory
const HtmlPages = fs.readdirSync(pagesDir).map(page => {

  const filename = path.basename(page, '.hbs');
  return new HtmlWebpackPlugin({
        filename: `${filename}.html`,
        pageName: filename,
        template: pagesDir + page
    })

});

module.exports = {
  entry: './src/js/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist')
  },
  module: {
    rules: [
      {
        test: /\.scss$/,
        use: ExtractTextPlugin.extract({
          fallback: 'style-loader',
          use: [
            {
              loader: 'css-loader',
              options: {
                // Do not try to resolve background urls
                url: false
              }
            },
            'postcss-loader',
            'sass-loader'
          ]
        })
      },
      {
        test: /\.hbs$/,
        loader: 'handlebars-loader',
      }
    ]
  },
  plugins: [
    new ExtractTextPlugin('style.css'),
    new CopyWebpackPlugin([
       { from: 'src/assets' },
    ]),
    ...HtmlPages
  ]
};
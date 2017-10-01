const CleanWebpackPlugin = require('clean-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: {
    app: './app/app.jsx'
  },
  output: {
    path: `${__dirname}/dist/generated-src`,
    filename: '[name].js'
  },
  module: {
    rules: [
      { test: /\.json$/, use: 'json-loader' },
      {
        enforce: 'pre',
        test: /\.js$/,
        exclude: /node_modules/,
        use: 'eslint-loader'
      },
      {
        test: /\.jsx?$/,
        exclude: /node_modules/,
        use: ['babel-loader', 'eslint-loader']
      },
      { test: /\.html$/, use: 'raw-loader' },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader?modules']
      },
      {
        test: /\.scss/,
        use: ['style-loader', 'css-loader?modules', 'sass-loader']
      },
      {
        test: /\.(png|jpg|jpeg|gif|svg|woff|woff2|ttf|eot)$/,
        use: 'url-loader'
      }
    ]
  },
  resolve: {
    extensions: ['.js', '.jsx']
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './app/index.html'
    }),
    new CopyWebpackPlugin([
      { from: './app/index.js' },
      { from: './app/package.json' }
    ]),
    new CleanWebpackPlugin(['dist/generated-src'], { verbose: true })
  ],
  target: 'electron-renderer',
  devtool: 'source-map',
  node: {
    electron: 'empty',
    fs: 'empty',
    http: 'empty',
    path: 'empty'
  }
};

const HtmlWebpackPlugin = require('html-webpack-plugin');
const CopyWebpackPlugin = require('copy-webpack-plugin');
const {GenerateSW} = require('workbox-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin'); 
const webpack = require('webpack'); // to access built-in plugins
const path = require('path');

var config = {
  resolve: {
    // Add '.ts' and '.tsx' as resolvable extensions.
    extensions: [".ts", ".tsx", ".js", ".json"]
  },
  devtool: 'source-map',
  stats: {
    cached: false,
    cachedAssets: false,
    chunks: false,
    chunkModules: false,
    chunkOrigins: false,
    modules: false
  },
  entry: './src/index.tsx',
  output: {
    path: __dirname + '/dist',
    filename: '[name].chunkhash.bundle.js',
    chunkFilename: '[name].chunkhash.bundle.js',
    publicPath: '/',
  },
  module: {
    rules: [
      // All files with a '.ts' or '.tsx' extension will be handled by 'awesome-typescript-loader'.
      { 
        test: /\.tsx?$/, 
        loader: "awesome-typescript-loader" 
      },
      // All output '.js' files will have any sourcemaps re-processed by 'source-map-loader'.
      { 
        enforce: "pre", 
        test: /\.js$/, 
        loader: "source-map-loader"
      },
      {
        test: /\.(png|jpe?g|gif|svg|eot|ttf|woff|woff2)$/,
        loader: 'url-loader',
        options: {
          limit: 8192,
        },
      },
     ]
  },
  devServer: {
    historyApiFallback: true,
    disableHostCheck: true
  }
};

module.exports = (env, argv) => {
  if (argv.mode === 'production') {
    config.output.path = __dirname + '/server/dist'
  }

  config.plugins =  [
    new webpack.ProgressPlugin(),
    new CleanWebpackPlugin(),
    new CopyWebpackPlugin([
      { from: 'static', to: 'static'}
    ]),
    new HtmlWebpackPlugin({
      title: 'Launch',
      template: path.join(__dirname, 'index.html'),
      filename: 'index.html',
      inject: true,
      minify: {
        collapseWhitespace: true,
        collapseInlineTagWhitespace: true,
        minifyCSS: true,
        minifyURLs: true,
        minifyJS: true,
        removeComments: true,
        removeRedundantAttributes: true
      }
    }),
    new GenerateSW(),
  ]

  return config
}
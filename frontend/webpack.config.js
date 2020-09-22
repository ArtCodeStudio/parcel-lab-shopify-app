/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const path = require('path');
const config = {
  template: 'app',
  entry: {
    app: './ts/main.ts',
  },
  output: {
    globalObject: 'self',
    filename: '[name].bundle.js',
    path: path.resolve(__dirname, '..', 'public/scripts/'),
    publicPath: '/scripts/',
  },
  copyAssets: {
    enable: true,
    images: true,
    scss: false,
    iconset: true,
    foldername: '../public',
  },
  styles: {
    build: false,
  },
  devServer: {},
};
const ribaWebpackConfig = require('@ribajs/webpack-config');
const webpackConfig = ribaWebpackConfig(config);
module.exports = webpackConfig;

/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const ribaWebpackConfig = require('@ribajs/webpack-config');
const { resolve } = require('path');
const dist = resolve(__dirname, 'dist/info');

const config = {
  template: 'local',
  copyAssets: {
    enable: false,
    images: false,
    scss: false,
    iconset: false,
    foldername: dist,
  },
  output: {
    path: dist,
    filename: '[name].bundle.js',
  },
  entry: {
    info: [resolve(__dirname, 'ts', 'info.ts')],
  },
  webpackbar: {
    name: 'Info',
    color: 'blue',
  },
};

const webpackConfig = ribaWebpackConfig(config);
module.exports = webpackConfig;

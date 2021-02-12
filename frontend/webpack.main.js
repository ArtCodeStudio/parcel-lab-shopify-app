/* eslint-disable no-case-declarations */
/* eslint-disable @typescript-eslint/no-var-requires */
/* eslint-disable no-undef */
const ribaWebpackConfig = require('@ribajs/webpack-config');
const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const { resolve } = require('path');
const dist = resolve(__dirname, 'dist');
const assets = resolve(__dirname, 'assets');

const config = {
  template: 'local',
  copyAssets: {
    enable: true,
    images: true,
    scss: false,
    iconset: true,
    foldername: dist,
    patterns: [
      {
        from: resolve(assets, 'favicons', '*'),
        to: resolve(dist),
        context: assets,
        toType: 'dir',
      },
      {
        from: resolve(assets, 'images', '*'),
        to: resolve(dist),
        context: assets,
        toType: 'dir',
      },
    ],
  },
  plugins: [new MonacoWebpackPlugin()],
  webpackbar: {
    name: 'Main',
    color: 'orange',
  },
};

const webpackConfig = ribaWebpackConfig(config);
module.exports = webpackConfig;

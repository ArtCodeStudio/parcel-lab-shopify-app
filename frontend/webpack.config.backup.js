/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-var-requires */
// https://github.com/Microsoft/TypeScript-Babel-Starter
const path = require('path');
const TerserPlugin = require('terser-webpack-plugin');
// const MonacoWebpackPlugin = require('monaco-editor-webpack-plugin');
const PnpWebpackPlugin = require('pnp-webpack-plugin');

module.exports = (env) => {
  const production = (env && env.production) || !env || !env.development;
  return {
    optimization: {
      minimizer: [
        new TerserPlugin({
          sourceMap: !production,
          terserOptions: {
            ecma: undefined,
            warnings: true,
            parse: {},
            compress: {},
            mangle: true, // Note `mangle.properties` is `false` by default.
            module: false,
            output: {
              comments: false,
            },
            toplevel: false,
            nameCache: null,
            ie8: false,
            keep_classnames: undefined,
            keep_fnames: false,
            safari10: true,
          },
        }),
      ],
    },
    // Change to your "entry-point".
    entry: {
      app: './ts/main.ts',
      // Package each language's worker and give these filenames in `getWorkerUrl`
      // see https://github.com/Microsoft/monaco-editor/blob/master/docs/integrate-esm.md
      // 'editor.worker': 'monaco-editor/esm/vs/editor/editor.worker.js',
      // 'json.worker': 'monaco-editor/esm/vs/language/json/json.worker',
      // 'css.worker': 'monaco-editor/esm/vs/language/css/css.worker',
      // 'html.worker': 'monaco-editor/esm/vs/language/html/html.worker',
      // 'ts.worker': 'monaco-editor/esm/vs/language/typescript/ts.worker',
    },
    devtool: production ? undefined : 'inline-source-map',
    mode: production ? 'production' : 'development',
    output: {
      globalObject: 'self',
      filename: '[name].bundle.js',
      path: path.resolve(__dirname, '..', 'public/scripts/'),
      publicPath: '/scripts/',
    },
    resolve: {
      modules: ['node_modules', 'src/modules'],
      extensions: ['.ts', '.tsx', '.js', '.json', '.ttf'],
      symlinks: true,
      plugins: [PnpWebpackPlugin],
    },
    resolveLoader: {
      plugins: [PnpWebpackPlugin.moduleLoader(module)],
    },
    module: {
      rules: [
        // Fonts
        {
          test: /\.ttf$/,
          use: ['file-loader'],
        },
        // typescript and javascript
        {
          test: /\.(tsx?)|\.(js)$/,
          exclude: [/node_modules\/(?!@ribajs)/, /(bower_components)/],
          loader: 'babel-loader',
          // include: []
          // include: [
          //   // /node_modules\/@ribajs\/*/,
          //   path.resolve(__dirname, "node_modules/@ribajs/core"),
          //   path.resolve(__dirname, "node_modules/@ribajs/router"),
          //   path.resolve(__dirname, "node_modules/@ribajs/shopify")
          // ]
        },
        // html templates
        {
          test: /\.html$/,
          use: [
            {
              loader: 'html-loader',
              options: {
                minimize: true,
              },
            },
          ],
        },
        // pug templates
        {
          test: /\.pug$/,
          use: [
            {
              loader: 'pug-loader',
              options: {
                minimize: true,
              },
            },
          ],
        },
        // styles loader
        {
          test: /\.css$/,
          use: ['style-loader', 'css-loader'],
        },
      ],
    },
    plugins: [
      /*new MonacoWebpackPlugin()*/
    ],
  };
};

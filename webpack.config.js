const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const glob = require('glob');

module.exports = {
  entry: './src/index.js',

  devServer: {
    static: './dist',
    compress: true,
    open: ['/navigation.html'],
  },

  output: {
    path: path.resolve(__dirname, './dist'),
    filename: 'bundles/[name].bundle.js',
  },

  module: {
    rules: [
      {
        test: /\.(woff(2)?|ttf|eot|svg)$/,
        type: 'asset/resource',
        include: [
          path.resolve(__dirname, 'src/fonts'),
          path.resolve(__dirname, 'node_modules'),
        ],
        generator: {
          filename: './fonts/[name][ext]',
        },
      },
      {
        test: /\.(jpe?g|svg|png)$/,
        type: 'asset/resource',
        exclude: [
          path.resolve(__dirname, 'src/fonts'),
          path.resolve(__dirname, 'node_modules'),
        ],
        generator: {
          filename: './images/[name][ext]',
        },
      },
      {
        test: /\.pug$/,
        use: 'pug-loader',
      },
      {
        test: /\.s[ac]ss$/i,
        use: [
          {
            loader: 'style-loader',
          },
          {
            loader: 'css-loader',
            options: { sourceMap: true },
          },
          {
            loader: 'postcss-loader',
          },
          {
            loader: 'resolve-url-loader',
          },
          {
            loader: 'sass-loader',
            options: {
              additionalData: "@import './src/style.scss';",
              sourceMap: true,
            },
          },
        ],
      },
    ],
  },
  plugins: [
    ...generateHtmlPlugins(),
    new webpack.ProvidePlugin({
      $: 'jquery',
      jQuery: 'jquery',
    }),
    new FaviconsWebpackPlugin({
      logo: './src/favicon/favicon.png',
      prefix: 'favicons/',
      favicons: {
        icons: {
          appleStartup: false,
        },
      },
    }),
    new CleanWebpackPlugin(),
  ],
};

function generateHtmlPlugins() {
  return glob.sync(
    path.join(__dirname, '/src/pages/**/*.pug'),
    { ignore: path.join(__dirname, '/src/pages/base-template/*') },
  ).map((page) => {
    const name = path.basename(page, '.pug');
    return new HtmlWebpackPlugin({
      filename: `${name}.html`,
      template: page,
    });
  });
}

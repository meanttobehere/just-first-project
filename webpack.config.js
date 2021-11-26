const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

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
        include: [path.resolve(__dirname, 'src/fonts'), path.resolve(__dirname, 'node_modules')],
        generator: {
          filename: './fonts/[name][ext]',
        },
      },
      {
        test: /\.(jpe?g|svg|png)$/,
        type: 'asset/resource',
        exclude: [path.resolve(__dirname, 'src/fonts'), path.resolve(__dirname, 'node_modules')],
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
              additionalData: `@import "./src/style.scss";`,
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

function findByExtension(directoryPath, extension) {
  let result = [];
  const items = fs.readdirSync(directoryPath);

  items.forEach((item) => {
    if (item.split('.')[1] === extension) {
      result = [path.join(directoryPath, item), ...result];
      return;
    }

    const newDirectoryPath = path.join(directoryPath, item);
    if (fs.statSync(newDirectoryPath).isDirectory()) {
      result = [...result, ...findByExtension(newDirectoryPath, extension, result)];
    }
  });

  return result;
}

function generateHtmlPlugins() {
  const items = findByExtension(path.resolve(__dirname, './src/pages/'), 'pug');

  return items.map((item) => {
    const name = path.basename(item).split('.')[0];
    return new HtmlWebpackPlugin({
      filename: `${name}.html`,
      template: item,
    });
  });
}

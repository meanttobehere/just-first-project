const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const FaviconsWebpackPlugin = require('favicons-webpack-plugin');
const webpack = require('webpack');
const path = require('path');
const fs = require('fs');

module.exports = {
  entry: {
    navigation: path.resolve(__dirname, './src/pages/navigation/index.js'),
    main: path.resolve(__dirname, './src/pages/main/index.js'),
    signup: path.resolve(__dirname, './src/pages/signup/index.js'),
    login: path.resolve(__dirname, './src/pages/login/index.js'),
    searchpage: path.resolve(__dirname, './src/pages/search-page/index.js'),
    room: path.resolve(__dirname, './src/pages/room/index.js'),
    formelements: path.resolve(__dirname, './src/pages/form-elements/index.js'),
    colorstype: path.resolve(__dirname, './src/pages/colors-type/index.js'),
    cards: path.resolve(__dirname, './src/pages/cards/index.js'),
    headersfooters: path.resolve(__dirname, './src/pages/headers-footers/index.js'),
    resources: path.resolve(__dirname, './src/resources/index.js'),
  },

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
        include: [path.resolve(__dirname, 'src/resources/fonts'), path.resolve(__dirname, 'node_modules')],
        generator: {
          filename: './fonts/[name][ext]',
        },
      },
      {
        test: /\.(jpe?g|svg|png)$/,
        type: 'asset/resource',
        exclude: [path.resolve(__dirname, 'src/resources/fonts'), path.resolve(__dirname, 'node_modules')],
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
            options: { sourceMap: true },
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
      logo: './src/resources/images/favicon.png',
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
      chunks: [name.replace('-','')],
      template: item,
    });
  });
}

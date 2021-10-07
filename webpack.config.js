const HtmlWebpackPlugin = require('html-webpack-plugin')
/*const MiniCssExtractPlugin = require("mini-css-extract-plugin")*/
const {CleanWebpackPlugin} = require('clean-webpack-plugin')
const path = require('path')
const fs = require('fs')

const htmlPlugins = generateHtmlPlugins();
//const cssPlugins = new MiniCssExtractPlugin({filename: ({ chunk }) => `${chunk.name.replace('/js/', '/css/')}.css`,})

module.exports = {    
    entry: {
        main: path.resolve(__dirname, './src/pages/main/main.js'),
        formelements: path.resolve(__dirname, './src/pages/formelements/formelements.js'),
        colorstype: path.resolve(__dirname, './src/pages/colorstype/colorstype.js'),
        cards: path.resolve(__dirname, './src/pages/cards/cards.js'),
        headersfooters: path.resolve(__dirname, './src/pages/headersfooters/headersfooters.js'),
    },

    output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].bundle.js',
    },

    module: {
        rules: [
            {
                test: /\.pug$/,
                use: 'pug-loader'
            },            
            { 
                test: /\.s[ac]ss$/i, 
                use: [/*MiniCssExtractPlugin.loader,*/"style-loader", "css-loader", /*"resolve-url-loader",*/ "sass-loader"],
            },  
            {   test: /\.(jpe?g|svg|woff|ttf)$/, 
                loader: "file-loader",
                options: {
                    name: '/images/[name].[ext]',
                    useRelativePaths: true,
                  }
            }         
        ],
    },
/*
    optimization: {
        splitChunks: {
            cacheGroups: {
                style: {
                    name: 'style',
                    test: /style\.s?css$/,
                    chunks: 'all',
                    enforce: true,
                },
                editor: {
                    name: 'editor',
                    test: /editor\.s?css$/,
                    chunks: 'all',
                    enforce: true,
                },
            },
        },
    },
*/
    plugins: [/*cssPlugins,*/ ...htmlPlugins, new CleanWebpackPlugin()],
}

function findByExtension(directoryPath, extension)
{
    let result = [];
    let items = fs.readdirSync(directoryPath);    
    
    items = items.forEach((item) => {
        
        if (item.split('.')[1] === extension){              
            result = [path.join(directoryPath, item), ...result];
            return;           
        } 
        
        let newDirectoryPath = path.join(directoryPath, item);
        if (fs.statSync(newDirectoryPath).isDirectory()){
            result = [...result, ...findByExtension(newDirectoryPath, extension, result)]
        }                    
    })

    return result;
}

function generateHtmlPlugins() {    
    let items = findByExtension(path.resolve(__dirname,'./src/pages/'), 'pug');
    console.log(items);

    return items.map((item, id) => {
        let name = path.basename(item).split('.')[0];
        return new HtmlWebpackPlugin({            
            filename: `${name}.html`,
            chunks : [name],              // inject only the same name bundle
            template: item,
           // inject: false,
        })
    })
}
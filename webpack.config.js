const HtmlWebpackPlugin = require('html-webpack-plugin');
const { CleanWebpackPlugin } = require('clean-webpack-plugin');
const path = require('path');
const fs = require('fs');

module.exports = {    
    entry: {
        main: path.resolve(__dirname, './src/pages/main/main.js'),
        signup: path.resolve(__dirname, './src/pages/signup/signup.js'),
        login: path.resolve(__dirname, './src/pages/login/login.js'),
        searchpage: path.resolve(__dirname, './src/pages/searchpage/searchpage.js'),
        room: path.resolve(__dirname, './src/pages/room/room.js'),
        formelements: path.resolve(__dirname, './src/pages/formelements/formelements.js'),
        colorstype: path.resolve(__dirname, './src/pages/colorstype/colorstype.js'),
        cards: path.resolve(__dirname, './src/pages/cards/cards.js'),
        headersfooters: path.resolve(__dirname, './src/pages/headersfooters/headersfooters.js'),        
    },

    output: {
        path: path.resolve(__dirname, './dist/toxinpages'),
        filename: 'bundles/[name].bundle.js',
    },

    module: {
        rules: [
            {
                test: /\.(woff(2)?|ttf|eot|svg)$/,
                type: 'asset/resource',
                include: [path.resolve(__dirname, 'src/assets/fonts'), path.resolve(__dirname, 'node_modules')],
                generator: {
                    filename: './fonts/[name][ext]',
                },
            },
            {
                test: /\.(jpe?g|svg|png)$/,
                type: 'asset/resource',
                exclude: path.resolve(__dirname, 'src/assets/fonts'),
                generator: {
                    filename: './images/[name][ext]',
                },
            },
            {
                test: /\.pug$/,
                use: "pug-loader",
            },            
            { 
                test: /\.s[ac]ss$/i, 
                use: [
                    {
                        loader: "style-loader",                        
                    },
                    {
                        loader: "css-loader",
                        options: { sourceMap: true },
                    },                 
                    {
                        loader: 'resolve-url-loader',                        
                    },
                    {                    
                        loader: 'sass-loader',
                        options: { sourceMap: true },
                    }
                ]                    
            },                       
        ],
    },
    plugins: [
        ...generateHtmlPlugins(), 
        new CleanWebpackPlugin()                         
    ],
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

    return items.map((item, id) => {
        let name = path.basename(item).split('.')[0];
        return new HtmlWebpackPlugin({            
            filename: `${name}.html`,
            chunks : [name],
            template: item,           
        })
    })
}
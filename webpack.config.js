// Generated using webpack-cli https://github.com/webpack/webpack-cli

const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');
const MiniCssExtractPlugin = require('mini-css-extract-plugin');

const isProduction = process.env.NODE_ENV == 'production';


const stylesHandler = isProduction ? MiniCssExtractPlugin.loader : 'style-loader';



const config = {
    entry:{
        index:'./src/index.js',
        index2:'./src/index2.js',
    },
    output: {
        path: path.resolve(__dirname, 'dist'),
        filename:'./[name]/[name].[hash].bundle.js',
        clean: true,
    },
    devServer: {
        open: ['index.html'],
        host: 'localhost',
    },
    plugins: [
        new HtmlWebpackPlugin({
            title: '游戏手柄控制',
            template: 'index.html',
            filename: 'index/index.html',
            inject:'head',
            chunks:['index'],
        }),
        new HtmlWebpackPlugin({
            title: '游戏手柄控制[原生]',
            template: 'index.html',
            filename: 'index2/index2.html',
            inject:'body',
            chunks:['index2'],
        }),
        // Add your plugins here
        // Learn more about plugins from https://webpack.js.org/configuration/plugins/
    ],
    module: {
        rules: [
            {
                test: /\.(js|jsx)$/i,
                loader: 'babel-loader',
            },
            {
                test: /\.css$/i,
                use: [stylesHandler, 'css-loader', 'postcss-loader'],
            },
            {
                test: /\.(eot|svg|ttf|woff|woff2|png|jpg|gif)$/i,
                type: 'asset',
            },

            // Add your rules for custom modules here
            // Learn more about loaders from https://webpack.js.org/loaders/
        ],
    },
};
let content = '';
config.plugins.forEach((item,index)=>{
    if(item instanceof HtmlWebpackPlugin){
        content += `<p><a href='${item.options.filename}' target='_black'>${index+1}、${item.options.title}</a></p>`;
    }
});
config.plugins.push(new HtmlWebpackPlugin({
    title: '总览',
    template: 'guide.html',
    filename: 'index.html',
    chunks:[],
    content,
}));

module.exports = () => {
    if (isProduction) {
        config.mode = 'production';
        
        config.plugins.push(new MiniCssExtractPlugin({
            filename: './[name]/[name].[hash].css'
        }));
        
        
    } else {
        config.mode = 'development';
    }
    return config;
};

const path = require('path')
const HTMLWebpackPlugin = require('html-webpack-plugin')
const {CleanWebpackPlugin} = require('clean-webpack-plugin') //这个插件不是默认暴露的

module.exports = {
    entry: './src/index.js',
    output: {
        path: path.resolve(__dirname,'build'),
        filename:'bundle.js'
    },
    devServer: {
        contentBase: './public', //本地服务器加载的页面所在目录
        historyApiFallback: true, //不跳转
        inline: true, //实时刷新
        client: {
            logging: 'error',//打印报错
            overlay: { //报错时，直接覆盖浏览器视窗，显示错误
                errors: true,
                warnings: true
            }
        }
    },
    resolve:{ //配置自动添加文件后缀
        extensions: ['.js','.jsx','.json']
    },
    module: {
        rules:[
            {
                //babel转换es6和jsx
                test:/\.jsx?$/,
                exclude: /node_modules/,
                use: [
                    {
                        loader: 'babel-loader',
                        options: {
                            presets: ['@babel/preset-react']
                        }
                    }
                ]
            },
            {
                //css转换
                test:/\.css$/,
                use:['style-loader','css-loader']
            },
            {
                //img src 图片引入处理
                test: /\.(webp|png|jpg|gif)$/i,
                use: [{
                    loader: 'url-loader',
                    options:{
                        limit: 5*1024, //5kb以下的图片使用base64编码，减少请求数
                        name: 'imgs/[name].[hash:8].[ext]' //打包到img文件夹下，名称是原图片名.8位hash值.扩展名
                    }
                }]
            }
        ]
    },
    plugins: [
        new CleanWebpackPlugin(), //每次打包时，自动清理output配置下的文件夹
        new HTMLWebpackPlugin({
            template: path.join(__dirname,'./public/index.html'),
            filename:'index.html',
            hash: true, //比较文件的hash值，只有在变化的时候才重新打包
            minify: { //压缩
                collapseWhitespace: true
            }
        })
    ],
    //mode:'production'
    mode:'production'
}
@TOC[从0开始送外卖（一）不用脚手架搭建React应用]

# 初始化

1. 新建npm仓库 npm init

2. 新建github仓库 git init

3. 配置.gitignore文件，忽略node_modules

   ```txt
   #.gitignore
   node_modules/
   ```

4. 上传到github仓库

   ```shell
   git add .
   git commit -m "初始化版本-1"
   git push -u 仓库地址 master
   ```

   备注：-u 表示记住仓库地址，下次只需要git push 分支即可

# 配置开发环境的依赖 npm i -D

```shell
#(1)webpack相关
npm i -D webpack webpack-cli webpack-dev-server
#(2)react相关
npm i -S react react-dom react-scripts
#(3)webpack配置所需的plugins和loaders
#(3.1) loader: babel单独拿出来说一下
#(3.2) loaders: style-loader,css-loader
#(3.3) plugins: html-webpack-plugin clean-webpack-plugin

```

备注：

（1）-D 等同于 --save-dev，通过该命令安装的包只在开发环境下有效，不需要打包到生产环境（写入package.json的devDependencies对象中）

（2）-S 等同于 --save，通过该命令安装的包会打包到生产环境中（写入package.json的dependencies对象中）

# 创建public，src的基本入口文件(可以用于测试)

```txt
public
	index.html
src
	index.js
	App.jsx
	App.css
```

（1）index.html

```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta http-equiv="X-UA-Compatible" content="IE=edge">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Takeout</title>
    <style>
        *{
            padding: 0;
            margin: 0;
        }
    </style>
</head>
<body>
    <div id="root"></div>
</body>
</html>
```

（2）index.js

注意：必须引入React，否则打包时不会打包React

```js
import React from 'react'
import ReactDOM from 'react-dom'
import App from './App.jsx'

ReactDOM.render(
    <App/>
    ,document.getElementById('root')
)
```

（3）App.jsx

```jsx
import React,{Component} from 'react'
import './App.css'

export default class App extends Component{
    render(){
        return (
            <div className='app'>app...</div>
        )
    }
}
```

（4）App.css

```css
.app{
    height: 100vh;
    width: 100vw;
    display: flex;
    justify-content:center;
    align-items:center;
    background-color: #2ecc71;
    font-size: 45px;
}
```



# 配置babel

```shell
npm i -D @babel/core @babel/preset-react @babel/preset-env
```

新建.babelrc文件

```json
{
    "presets": ["@babel/env","@babel/preset-react"]
}
```

备注：webpack相关配置在下文

# 配置webpack

在根目录下新建webpack.config.js，进行各项初始配置，详细看注释，未安装的插件或loader自行理解安装

```js
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
        inline: true //实时刷新
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
    resolve: {
        //配置自动添加文件后缀
        extensions: ['.js','.jsx','.json']
    }
    mode:'production' //生产环境（默认）
}
```

# 配置package.json

手动配置npm run start/npm run build的命令，初始化项目到目前为止安装的包可以通过以下package.json自行对照

```json
{
  "name": "takeout",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1",
    "start": "react-scripts start",
    "build": "webpack --config ./webpack.config.js"
  },
  "author": "baliangjinyu",
  "license": "ISC",
  "devDependencies": {
    "clean-webpack-plugin": "^4.0.0",
    "html-webpack-plugin": "^5.5.0",
    "webpack": "^5.72.0",
    "webpack-cli": "^4.9.2"
  },
  "dependencies": {
    "@babel/core": "^7.17.10",
    "@babel/preset-env": "^7.17.10",
    "@babel/preset-react": "^7.16.7",
    "react": "^18.1.0",
    "react-dom": "^18.1.0",
    "react-scripts": "^5.0.1"
  }
}

```

# 测试build

```shell
npm run build
```

安装并启动serve——一个好用的开启服务端口的包

```shell
npm i serve -g

cd ./build
serve
```

根据提示，浏览器打开http://localhost:3000

备注：控制台报错favicon.ico 404指的是网站图标文件缺失，可以自己找个ico文件，当然，如何打包需要后续配置。

![初始化(1)](pictures/pic_used_in_markdown/初始化(1).png)

# 测试 npm start

使用npm start启动失败，控制台报错如下：

```shell
√ We're unable to detect target browsers.

Would you like to add the defaults to your package.json? ... no
As of react-scripts >=2 you must specify targeted browsers.
Please add a browserslist key to your package.json.
```

解决方法：

```json
{
    //...package.json
    "browserslist":{
        "production":[
          ">1%",
          "not dead",
          "not op_mini all"
        ],
        "development":[
          "last 1 chrome version"
        ]
  }
}
```

再次npm start，成功。打开App.jsx，随便修改一下，保存，发现浏览器自动局部刷新了。

到这里，从0开始送外卖之不用脚手架搭建react应用完结。

预告：接下来先尝试写个类似某团app的主界面吧。



补充：

npm start后，控制台报错：

```js
react-dom.development.js:86 Warning: ReactDOM.render is no longer supported in React 18. Use createRoot instead. Until you switch to the new API, your app will behave as if it's running React 17. Learn more: https://reactjs.org/link/switch-to-createroot
```

看样子，得根据react18的新语法改改，修改入口文件 index.js

```js
import React from 'react'
import {createRoot} from 'react-dom/client'
import App from './App.jsx'

const container = document.getElementById('root')
const root = createRoot(container)
root.render(<App/>)
```

> React官方解释：
>
> React 18 introduces a new root API which provides better ergonomics for managing roots. The new root API also enables the new concurrent renderer, which allows you to opt-into concurrent features.
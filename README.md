[![Build Status](https://travis-ci.org/lonelyclick/react-webapp-scaffolding.svg?branch=master)](https://travis-ci.org/lonelyclick/react-webapp-scaffolding)
[![GitHub version](https://badge.fury.io/gh/lonelyclick%2Freact-webapp-scaffolding.svg)](http://badge.fury.io/gh/lonelyclick%2Freact-webapp-scaffolding)

#react脚手架项目

##快速上手

###初始化

####安装webpack

`sudo npm install -g webpack`

####升级node 4.0.0

`sudo npm install -g n`

 `n 4.0.0`
 
####安装依赖 
 
 `npm install`
 
###开发与部署

####开发
	
- 本地开发,执行 webpack --local-dev --watch ,会将打包的文件输出到 ROOT_PATH/dev 目录下
- aws开发,执行 webpack --server-dev --watch ,会讲打包文件输出到 ../platform/frontend/

####部署

- 本地部署,执行 webpack --local-prod ,会将打包文件输出到 ROOT_PATH/dist 目录下
- aws部署,执行 webpack --server-prod ,会讲打包文件输出到 ../platform/frontend/

####注意
- 以上目录都可以在webpack.config.js 中配置,或者扩展node 参数进行传入
- 部署比开发多出的步骤为 : 压缩JS与CSS（ 使用 UglifyJsPlugin ,如果需要 sourceMap, 请自行配置）


##代码风格
- 编程风格请参照 [编程风格](http://es6.ruanyifeng.com/#docs/style "编程风格")
- 代码校验采用eslint
- eslint , 扩展自 [eslint-config-airbnb](https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb "eslint-config-airbnb")
- 开发时执行 webpack --watch , 自动会进行eslint校验 , 建议在通过该校验之后再提交代码
- 详情请见 .eslintrc 文件


##项目结构

###开源项目

- [react](https://facebook.github.io/react/ "react")
- [react-router](https://github.com/rackt/react-router "react-router")
- [redux](http://rackt.github.io/redux/ "redux")
- [react-redux](https://github.com/rackt/react-redux "react-redux")
- [react-bootstrap](http://react-bootstrap.github.io/ "react-bootstrap")
- [react-router-bootstrap](https://github.com/react-bootstrap/react-router-bootstrap "react-router-bootstrap")
- [bootstrap-sass](https://github.com/twbs/bootstrap-sass "bootstrap-sass")

###构建工具

- [webpack](http://webpack.github.io/ "webpack")

###文件结构

- webpack.config.js #webpack配置
- .eslintrc #eslint校验配置
- src #redux目录 , 详情请见 [real-world](https://github.com/rackt/redux/tree/master/examples/real-world "real-world")
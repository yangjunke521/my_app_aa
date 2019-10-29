const webpack = require('webpack')
module.exports = {
  // 关闭内置Eslint检查
  lintOnSave: false,
  // 打包输出路径
  publicPath: process.env.NODE_ENV === 'production' ? './' : '/',    //2019.9.16 zwh测试打包以后资源路径问题注释
  // publicPath: './', //2019.9.16 zwh测试打包以后资源路径问题添加
  productionSourceMap: false,//不要打包以后的map文件-zwh
  devServer: {
    open: true, // 启动服务后是否打开浏览器
    host: '0.0.0.0',
    port: 8080, // 服务端口
    https: false,
    hotOnly: false,
    proxy: {
      '/api': {//代理api
          target: "http://localhost:9001/",//服务器api地址
          changeOrigin: true,//是否跨域
          ws: false, // proxy websockets
          pathRewrite: {//重写路径
              "^/api": ''
          }
      }
  },// 设置代理
  before: app => {}
  },
  configureWebpack: {//添加jquery插件
       plugins: [
          new webpack.ProvidePlugin({
            $:"jquery",
            jQuery:"jquery",
            "windows.jQuery":"jquery"
          })
        ]
    }
}
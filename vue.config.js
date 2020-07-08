/*
 * @Author: your name
 * @Date: 2020-07-06 12:31:09
 * @LastEditTime: 2020-07-08 09:39:32
 * @LastEditors: Please set LastEditors
 * @Description: In User Settings Edit
 * @FilePath: \vue-admin\vue-admin\vue.config.js
 */
// https://cli.vuejs.org/

const path = require('path')

function resolve(dir) {
  return path.join(__dirname, dir)
}

module.exports = {
  // publicPath: '../../'
  baseUrl: process.env.baseUrl,
  outputDir: process.env.outputDir,
  //  eslint校验
  lintOnSave: false,
  configureWebpack: () => {
    if (process.env.NODE_ENV === 'production') {
      // 为生产环境修改配置...
    } else {
      // 为开发环境修改配置...
    }
  },
  chainWebpack: config => {
    config.resolve.alias
      .set('vue$', 'vue/dist/vue.esm.js')
      .set('@', resolve('src'))
      .set('assets', resolve('src/assets'))
      .set('components', resolve('src/components'))
      .set('api', resolve('src/api'))
      .set('utils', resolve('src/utils'))
      .set('store', resolve('src/store'))
      .set('router', resolve('src/router'))

    config.resolve.extensions
      .add('.js')
      .add('.vue')
      .add('.styl')

    config.module.rule('svg').uses.clear()
    config.module
      .rule('svg')
      .use('raw-loader')
      .loader('raw-loader')
  },

  productionSourceMap: false,
  css: {
    sourceMap: false
  },

  devServer: {
    // open: process.platform === 'darwin',
    //项目启动后自动弹出浏览器
    open: true,
    host: '0.0.0.0',
    port: 8234,
    https: false,
    hotOnly: false,
    proxy: {
      '/api': {
        target:"http://192.168.0.111:8080", //请求地址
        ws: true,
        secure:false, // 使用的是http协议则设置为false，https协议则设置为true
        changeOrigin: true, //允许跨域
        //路径重写
        pathRewrite: {
          '^/api': '' //请求地址
        }
      }
    }
  }
}

const path = require('path')
module.exports = {
  pluginOptions: {
    'style-resources-loader': {
      preProcessor: 'less',
      // 哪些文件需要自动引入，使用绝对路径
      // path.join 拼接完整的路径
      patterns: [
        path.join(__dirname, './src/assets/styles/variable.less'),
        path.join(__dirname, './src/assets/styles/mixins.less')
      ]
    }
  },
  // 对10kb以下图片打包成base64格式的字符串，有效压缩图片数据
  chainWebpack: (config) => {
    // 图片加载
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap((options) => Object.assign(options, { limit: 10000 }))
    // 开启IP域名访问
    config.devServer.disableHostCheck(true)
  },
  // 设置外部扩展，模块为qc变量名为QC，这样webpack导入qc的时候就不做打包
  // 这是因为qc是存在于index.html引入的cdn网址中，再做打包就会浪费资源
  configureWebpack: {
    externals: {
      qc: 'QC'
    }
  }
}

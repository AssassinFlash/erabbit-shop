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
    config.module
      .rule('images')
      .use('url-loader')
      .loader('url-loader')
      .tap((options) => Object.assign(options, { limit: 10000 }))
  }
}

// 发布路径
// const publicPath = process.env.VUE_APP_PATHNAME
const publicPath = ''
// 代理路径
const target = 'http://122.152.200.131:8001/'

module.exports = {
  publicPath,
  runtimeCompiler: true,
  // webpack-dev-server 配置
  devServer: {
    publicPath,
    proxy: {
      '/api': {
        target,
        changeOrigin: true
      },
      '/lessionnew': {
        target,
        changeOrigin: true
      },
      '/Content': {
        target,
        changeOrigin: true
      }
    }
  },
  configureWebpack: config => {
    if (process.env.NODE_ENV === 'development') {
      config.devtool = '#source-map'
      // config.devtool = 'cheap-source-map'
    }
  }
}

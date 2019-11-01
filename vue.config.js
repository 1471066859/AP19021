module.exports = {
  lintOnSave: false,
  devServer: {
    open: true,
    host: '0.0.0.0',
    port: 8085,
    https: false,
    hotOnly: false,
    proxy: {
      // 配置跨域
      '/api': {
        // target: 'http://localhost:6001',
        target: 'http://192.168.4.155:8888',
        ws: true,
        changOrigin: true,
        pathRewrite: {
          '^/api': ''
        }
      }
    },
    before: app => {}
  }

}
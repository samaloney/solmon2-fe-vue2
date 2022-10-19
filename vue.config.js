const simpleRequestLogger = (proxyServer, options) => {
  proxyServer.on('proxyReq', (proxyReq, req, res) => {
    console.log(`[HPM] [${req.method}] ${req.url}, ${res.url}`) // outputs: [HPM] GET /users
  })
}
const { defineConfig } = require('@vue/cli-service')
module.exports = defineConfig({
  // configureWebpack: {
  //   infrastructureLogging: {
  //     stream: process.stdout
  //   },
  // },
  transpileDependencies: [
    'vuetify'
  ],
  devServer: {
    host: 'local-ipv4',
    allowedHosts: ['all'],
    proxy: {
      '^/images': {
        ws: false,
        logLevel: 'debug',
        target: 'http://127.0.0.1:5000',
        plugins: [simpleRequestLogger]

      },
      '^/data': {
        ws: false,
        logLevel: 'debug',
        target: 'http://dev.solmon.dias.ie/',

      }
    }
  }
})

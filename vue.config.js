const path = require('path')

module.exports = {
  devServer: {
    open: process.platform === 'darwin',
    host: '127.0.0.1',
    port: 8082, // CHANGE YOUR PORT HERE!
    https: true,
    hotOnly: false
  },
  publicPath: process.env.NODE_ENV === 'production'
    ? '/networklibrary/'
    : '/',
  pluginOptions: {
    i18n: {
      locale: 'en',
      fallbackLocale: 'en',
      localeDir: 'locales',
      enableInSFC: false
    }
  }
}

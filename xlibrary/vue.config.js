const path = require('path')

module.exports = {
  publicPath: process.env.NODE_ENV === 'production'
    ? '/testlibrary/'
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
// './vue.js': './node_modules/vue/dist/vue.esm.browser.min.js'

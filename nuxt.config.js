module.exports = {
  /*
  ** Headers of the page
  */
  head: {
    title: 'starter',
    meta: [
      { charset: 'utf-8' },
      { name: 'viewport', content: 'width=device-width, initial-scale=1' },
      { hid: 'description', name: 'description', content: 'Nuxt.js project' }
    ],
    link: [
      { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }
    ]
  },
  /*
  ** Global CSS
  */
  css: [
    '~/assets/css/main.css',
    'vue-ctk-date-time-picker/dist/vue-ctk-date-time-picker.min.css'
  ],
  /*
  ** Add axios globally
  */
  plugins: [
    {src: '~plugins/iview', ssr: true},
    {src:'~/plugins/VueCtkDateTimePicker', ssr: false},
  ],
  /*
  ** Customize the progress bar color
  */
  loading: { color: '#3B8070' },
  build: {
    vendor: ['axios', ''],
    /*
    ** Run ESLINT on save
    */
    extend(config, ctx) {
      if (ctx.isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}

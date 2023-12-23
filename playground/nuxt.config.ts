export default defineNuxtConfig({
  modules: [
    '../src/module',
    '@nuxtjs/tailwindcss'
  ],

  headlessui: {
    prefix: 'Headless'
  },

  devtools: { enabled: true }
})

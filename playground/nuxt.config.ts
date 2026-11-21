export default defineNuxtConfig({
  modules: [
    '../src/module',
    '@nuxtjs/tailwindcss'
  ],

  devtools: { enabled: true },

  compatibilityDate: 'latest',

  postcss: {
    plugins: {
      // tailwindcss is not hoisted with pnpm, so its nesting plugin can't be resolved from the playground.
      // Nesting is not used in the playground, so we disable it.
      'tailwindcss/nesting': false,
    },
  },

  headlessui: {
    prefix: 'Headless'
  }
})

import { defineNuxtConfig } from 'nuxt/config'
import HeadlessUI from '..'

export default defineNuxtConfig({
  modules: [
    HeadlessUI,
    '@nuxtjs/tailwindcss'
  ]
})

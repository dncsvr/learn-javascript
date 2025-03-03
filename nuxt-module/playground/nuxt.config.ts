import Aura from '@primevue/themes/aura'

export default defineNuxtConfig({
  modules: ['@mouseless/nuxt-module'],
  ssr: false,
  devtools: { enabled: true },
  compatibilityDate: '2025-03-01',
  mouseless: {
    theme: Aura,
  },
})

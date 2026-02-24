// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/eslint", "@nuxt/ui"],

  devtools: {
    enabled: false,
  },

  css: ["~/assets/css/main.css"],

  routeRules: {},

  compatibilityDate: "2025-01-15",

  colorMode: {
    preference: "light",
    fallback: "light",
  },

  eslint: {
    config: {
      stylistic: false,
    },
  },
});

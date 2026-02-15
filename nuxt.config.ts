// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/eslint", "@nuxt/ui"],

  app: {
    head: {
      title: "FambaHub",
      titleTemplate: "%s | FambaHub",
      meta: [
        { name: "description", content: "Explore the world" },
        { name: "og:title", content: "FambaHub" },
        { name: "og:description", content: "Explore the world" },
        { name: "og:site_name", content: "FambaHub" },
      ],
    },
  },

  devtools: {
    enabled: false,
  },

  css: ["~/assets/css/main.css"],

  colorMode: {
    preference: "light",
    fallback: "light",
  },

  routeRules: {
    "/": { prerender: true },
  },

  compatibilityDate: "2025-01-15",

  eslint: {
    config: {
      stylistic: false,
    },
  },
});

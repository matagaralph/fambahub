// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
  modules: ["@nuxt/eslint", "@nuxt/ui", "shadcn-nuxt"],

  devtools: {
    enabled: false,
  },

  css: ["~/assets/css/main.css"],

  routeRules: {},

  compatibilityDate: "2025-01-15",
  shadcn: {
    /**
     * Prefix for all the imported component.
     * @default "Ui"
     */
    prefix: "FU",
    /**
     * Directory that the component lives in.
     * Will respect the Nuxt aliases.
     * @link https://nuxt.com/docs/api/nuxt-config#alias
     * @default "@/components/ui"
     */
    componentDir: "@/components/ui",
  },

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

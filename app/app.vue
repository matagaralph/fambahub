<script setup>
useHead({
  meta: [
    { name: 'viewport', content: 'width=device-width, initial-scale=1' }
  ],
  link: [
    { rel: 'icon', href: '/favicon.ico' },
    { rel: 'icon', type: 'image/svg+xml', href: '/favicon.svg' },
    { rel: 'icon', type: 'image/png', sizes: '96x96', href: '/favicon-96x96.png' },
    { rel: 'apple-touch-icon', sizes: '180x180', href: '/apple-touch-icon.png' },
    { rel: 'manifest', href: '/site.webmanifest' },
    { rel: 'icon', type: 'image/png', sizes: '192x192', href: '/web-app-manifest-192x192.png' },
    { rel: 'icon', type: 'image/png', sizes: '512x512', href: '/web-app-manifest-512x512.png' }
  ],
  htmlAttrs: {
    lang: 'en'
  }
})

const title = 'FambaHub'
const description = 'Explore the world'

useSeoMeta({
  title,
  description,
  ogTitle: title,
  ogDescription: description,
  twitterCard: 'summary_large_image'
})
</script>

<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

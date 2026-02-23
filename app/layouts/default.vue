<script setup lang="ts">
const route = useRoute()
const isHome = computed(() => route.path === '/')
</script>

<template>
  <div class="min-h-screen bg-white">
    <AppNavBar />
    <main :class="{ 'pt-14': !isHome }">
      <slot />
    </main>
  </div>
</template>

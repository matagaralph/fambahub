<script setup lang="ts">
const route = useRoute();
// const name = route.params.name as string;
const id = route.params.id as string;

const displayName = computed(() => {
  const nameParam = route.params.name as string;
  return nameParam.replace(/-/g, " ");
});

useHead({
  title: () => `${displayName.value} - Things to Do`,
  meta: [
    {
      name: "description",
      content: () =>
        `Explore the best things to do in ${displayName.value}. Book tours, activities, and attractions.`,
    },
  ],
});
</script>

<template>
  <div class="container mx-auto px-4 py-8">
    <div class="mb-8">
      <h1 class="text-3xl font-bold mb-2">Things to do in {{ displayName }}</h1>
      <p class="text-gray-600">Destination ID: {{ id }}</p>
    </div>
  </div>
</template>

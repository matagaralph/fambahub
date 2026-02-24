<script setup lang="ts">
const page = defineModel<number>("page", { required: true });

defineProps<{
  total: number;
  itemsPerPage: number;
}>();
</script>

<template>
  <UPagination v-if="total > itemsPerPage" v-model:page="page" :items-per-page="itemsPerPage" :total="total"
    :sibling-count="1" show-edges class="mt-12 justify-center" />
</template>

<script setup lang="ts">
defineProps<{
  page: number;
  hasNextPage: boolean;
}>();

const emit = defineEmits<{
  next: [];
  prev: [];
}>();
</script>

<template>
  <div v-if="hasNextPage || page > 1" class="mt-12 flex items-center justify-center gap-4">
    <UButton :disabled="page <= 1" variant="outline" color="neutral" class="gap-1 rounded-full" @click="emit('prev')">
      <UIcon name="i-lucide-chevron-left" class="size-4" />
      Previous
    </UButton>
    <span class="text-sm font-medium text-neutral-700">Page {{ page }}</span>
    <UButton :disabled="!hasNextPage" variant="outline" color="neutral" class="gap-1 rounded-full"
      @click="emit('next')">
      Next
      <UIcon name="i-lucide-chevron-right" class="size-4" />
    </UButton>
  </div>
</template>

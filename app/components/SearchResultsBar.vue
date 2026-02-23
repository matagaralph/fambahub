<script setup lang="ts">
defineProps<{
  count: number;
  page: number;
}>();

const selectedSort = defineModel<string>("selectedSort", { required: true });

const sortOptions = [
  { label: "Featured", value: "DEFAULT" },
  { label: "Traveler Rating", value: "TRAVELER_RATING" },
  { label: "Price (Low to High)", value: "PRICE_ASC" },
  { label: "Price (High to Low)", value: "PRICE_DESC" },
  { label: "Duration (Short to Long)", value: "DURATION_ASC" },
  { label: "Duration (Long to Short)", value: "DURATION_DESC" },
];
</script>

<template>
  <div class="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
    <div class="text-sm font-bold text-slate-900 flex items-center gap-2">
      {{ count }} results<span v-if="page > 1" class="font-normal text-slate-500">&middot; Page {{ page }}</span>
      <span class="text-xs font-normal text-slate-500 border-l border-slate-300 pl-2">translated by Google</span>
    </div>
    <div class="flex items-center gap-2 self-end sm:self-auto">
      <span class="text-sm text-slate-600">Sort by:</span>
      <USelect v-model="selectedSort" :items="sortOptions" variant="outline" color="neutral" class="w-auto min-w-44" />
    </div>
  </div>
</template>

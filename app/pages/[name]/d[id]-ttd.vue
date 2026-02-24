<script setup lang="ts">
import { addDays, format } from "date-fns";
import type { ProductSearchResponse } from "~/types";

const route = useRoute("name-did-ttd");
const destinationId = computed(() => Number(route.params.id));

const displayName = computed(() => {
  const name = String(route.params.name ?? "");
  return name.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
});

const sort = ref("DEFAULT");
const page = ref(1);
const startDate = new Date(2026, 1, 25);
const dateRange = { start: startDate, end: addDays(startDate, 7) };

const maxBudget = ref(500);
const specials = ref<string[]>([]);
const minRating = ref(0);
const timeOfDay = ref<string[]>([]);
const durations = ref<string[]>([]);

const DURATION_RANGES: Record<string, { from: number; to: number }> = {
  "up-to-1h": { from: 0, to: 60 },
  "1-to-4h": { from: 60, to: 240 },
  "4h-to-1d": { from: 240, to: 1440 },
  "1-to-3d": { from: 1440, to: 4320 },
  "3d-plus": { from: 4320, to: 43200 },
};

const DEFAULT_DURATION = { from: 0, to: 43200 };

const durationRange = computed(() => {
  const selected = durations.value
    .map((key) => DURATION_RANGES[key])
    .filter((r): r is { from: number; to: number } => !!r);
  if (!selected.length) return DEFAULT_DURATION;
  return {
    from: Math.min(...selected.map((r) => r.from)),
    to: Math.max(...selected.map((r) => r.to)),
  };
});

function resetFilters() {
  maxBudget.value = 500;
  minRating.value = 0;
  specials.value = [];
  timeOfDay.value = [];
  durations.value = [];
  page.value = 1;
}

const SORT_MAP: Record<string, { sort: string; order: string }> = {
  TRAVELER_RATING: { sort: "TRAVELER_RATING", order: "DESCENDING" },
  PRICE_ASC: { sort: "PRICE", order: "ASCENDING" },
  PRICE_DESC: { sort: "PRICE", order: "DESCENDING" },
  DURATION_ASC: { sort: "DURATION", order: "ASCENDING" },
  DURATION_DESC: { sort: "DURATION", order: "DESCENDING" },
};

const sortParams = computed(
  () => SORT_MAP[sort.value] ?? { sort: "DEFAULT", order: "DESCENDING" },
);

const PAGE_SIZE = 50;

const payload = computed(() => ({
  filtering: {
    destination: destinationId.value,
    flags: specials.value.length ? specials.value : undefined,
    lowestPrice: 0,
    highestPrice: maxBudget.value,
    startDate: format(dateRange.start, "yyyy-MM-dd"),
    endDate: format(dateRange.end, "yyyy-MM-dd"),
    includeAutomaticTranslations: true,
    confirmationType: "INSTANT",
    durationInMinutes: durationRange.value,
    rating: { from: minRating.value, to: 5 },
  },
  sorting: sortParams.value,
  pagination: { start: (page.value - 1) * PAGE_SIZE + 1, count: 10000 },
  currency: "USD",
}));

const { data, status, error } = await useFetch<ProductSearchResponse>(
  "https://api.fambahub.com/products/search",
  { method: "POST", body: payload, watch: [payload] },
);

const products = computed(() => data.value?.products ?? []);
const totalCount = computed(() => data.value?.totalCount ?? 0);

function scrollToTop() {
  window.scrollTo({ top: 0, behavior: "smooth" });
}

watch(page, () => scrollToTop());

useHead({ title: () => `${displayName.value} - Things to Do` });
</script>

<template>
  <div class="bg-white min-h-screen pb-12">
    <div class="container mx-auto px-4 py-8">
      <div class="flex gap-8">
        <SearchFilters v-model:max-budget="maxBudget" v-model:min-rating="minRating"
          v-model:selected-specials="specials" v-model:selected-time-of-day="timeOfDay"
          v-model:selected-durations="durations" @reset="resetFilters" />

        <div class="flex-1 flex flex-col gap-6">
          <SearchResultsBar v-model:selected-sort="sort" :count="totalCount" :page="page" />

          <main class="w-full">
            <div v-if="status === 'pending'" class="py-12 flex justify-center">
              <UIcon name="i-lucide-loader-2" class="animate-spin size-8 text-slate-500" />
            </div>

            <div v-else-if="status === 'error'" class="py-12 text-center text-red-500">
              <p>Error loading products. Please try again.</p>
              <p class="text-sm mt-2">{{ error?.message }}</p>
            </div>

            <div v-else-if="!products.length" class="py-12 text-center text-slate-500">
              <UIcon name="i-lucide-search-x" class="size-12 mx-auto mb-4 text-slate-300" />
              <p class="text-lg">No activities found matching your criteria.</p>
              <UButton variant="link" color="neutral" @click="resetFilters">
                Clear Filters
              </UButton>
            </div>

            <div v-else class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              <ProductCard v-for="product in products" :key="product.productCode" :product="product" />
            </div>

            <SearchPagination v-model:page="page" :total="totalCount" :items-per-page="PAGE_SIZE" />
          </main>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
const maxBudget = defineModel<number>("maxBudget", { required: true });
const minRating = defineModel<number>("minRating", { required: true });
const selectedSpecials = defineModel<string[]>("selectedSpecials", {
  required: true,
});
const selectedTimeOfDay = defineModel<string[]>("selectedTimeOfDay", {
  required: true,
});
const selectedDurations = defineModel<string[]>("selectedDurations", {
  required: true,
});

const emit = defineEmits<{
  reset: [];
}>();

const durationOptions = [
  { label: "Up to 1 hour", value: "up-to-1h" },
  { label: "1 to 4 hours", value: "1-to-4h" },
  { label: "4 hours to 1 day", value: "4h-to-1d" },
  { label: "1 to 3 days", value: "1-to-3d" },
  { label: "3+ days", value: "3d-plus" },
] as const;

const timeOfDayOptions = [
  { label: "Morning", description: "Starts before 12pm", value: "morning" },
  { label: "Afternoon", description: "Starts after 12pm", value: "afternoon" },
  {
    label: "Evening and night",
    description: "Starts after 5pm",
    value: "evening",
  },
] as const;

function setMinRating(star: number) {
  minRating.value = minRating.value === star ? 0 : star;
}

const hasActiveFilters = computed(
  () =>
    minRating.value > 0 ||
    maxBudget.value < 500 ||
    selectedSpecials.value.length > 0 ||
    selectedTimeOfDay.value.length > 0 ||
    selectedDurations.value.length > 0,
);
</script>

<template>
  <aside class="hidden lg:block w-64 shrink-0">
    <div class="sticky top-4 rounded-xl border border-slate-200 flex flex-col overflow-hidden">
      <div class="px-4 py-3 border-b border-slate-200">
        <h2 class="text-sm font-bold text-slate-900">Filter By:</h2>
      </div>

      <div class="px-4 py-4 border-b border-slate-200">
        <h3 class="text-sm font-bold text-slate-900 mb-2">Your budget</h3>
        <p class="text-sm text-slate-600 mb-3">
          $0 – ${{ maxBudget }}<span v-if="maxBudget >= 500">+</span>
        </p>
        <input v-model.number="maxBudget" type="range" :min="0" :max="500" step="10" class="w-full accent-primary-500">
      </div>

      <div class="px-4 py-4 border-b border-slate-200">
        <h3 class="text-sm font-bold text-slate-900 mb-3">Rating</h3>
        <div class="flex flex-col gap-2">
          <label v-for="star in [5, 4, 3, 2, 1]" :key="star" class="flex items-center gap-2 text-sm cursor-pointer"
            :class="minRating === star ? 'text-primary-700' : 'text-slate-700'
              ">
            <input :checked="minRating === star" type="radio" name="rating" class="accent-primary-500"
              @change="setMinRating(star)">
            <div class="flex">
              <UIcon v-for="i in 5" :key="i" name="i-lucide-star" class="size-4"
                :class="i <= star ? 'text-amber-400' : 'text-slate-300'" />
            </div>
            <span>& up</span>
          </label>
        </div>
      </div>

      <div class="px-4 py-4 border-b border-slate-200">
        <h3 class="text-sm font-bold text-slate-900 mb-3">Specials</h3>
        <div class="flex flex-col gap-2">
          <label class="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
            <input v-model="selectedSpecials" type="checkbox" value="SPECIAL_OFFER" class="accent-primary-500 rounded">
            Special Offer
          </label>
          <label class="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
            <input v-model="selectedSpecials" type="checkbox" value="LIKELY_TO_SELL_OUT"
              class="accent-primary-500 rounded">
            Likely to Sell Out
          </label>
          <label class="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
            <input v-model="selectedSpecials" type="checkbox" value="BEST_SELLER" class="accent-primary-500 rounded">
            Best Seller
          </label>
        </div>
      </div>

      <div class="px-4 py-4 border-b border-slate-200">
        <h3 class="text-sm font-bold text-slate-900 mb-3">Time of Day</h3>
        <div class="grid grid-cols-2 gap-2">
          <label v-for="option in timeOfDayOptions" :key="option.value"
            class="flex items-start gap-2 text-sm text-slate-700 cursor-pointer">
            <input v-model="selectedTimeOfDay" type="checkbox" :value="option.value" class="accent-primary-500 mt-0.5">
            <div>
              <span class="font-medium">{{ option.label }}</span>
              <p class="text-xs text-slate-500">{{ option.description }}</p>
            </div>
          </label>
        </div>
      </div>

      <div class="px-4 py-4">
        <h3 class="text-sm font-bold text-slate-900 mb-3">Duration</h3>
        <div class="grid grid-cols-2 gap-2">
          <label v-for="option in durationOptions" :key="option.value"
            class="flex items-center gap-2 text-sm text-slate-700 cursor-pointer">
            <input v-model="selectedDurations" type="checkbox" :value="option.value" class="accent-primary-500">
            {{ option.label }}
          </label>
        </div>
      </div>

      <button v-if="hasActiveFilters"
        class="px-4 py-3 border-t border-slate-200 text-xs text-primary-600 hover:underline text-left"
        @click="emit('reset')">
        Reset all filters
      </button>
    </div>
  </aside>
</template>

<script setup lang="ts">
const { searchTerm, isLoading, suggestions, showResults, debouncedSearch, clearSearch } = useSearch();
const activeIndex = ref(-1);

function onInput(e: Event) {
  activeIndex.value = -1;
  debouncedSearch((e.target as HTMLInputElement).value);
}

function selectSuggestion(suggestion: SearchSuggestion) {
  searchTerm.value = suggestion.name;
  showResults.value = false;
  navigateTo(suggestion.url);
}

function onFocus() {
  if (suggestions.value.length) showResults.value = true;
}

const popoverRef = ref<HTMLElement | null>(null);

function onPageClick(e: MouseEvent) {
  if (!showResults.value) return;
  // Ignore scrollbar clicks (click x is beyond the element's client width)
  if (e.clientX >= document.documentElement.clientWidth) return;
  if (popoverRef.value && !popoverRef.value.contains(e.target as Node)) {
    showResults.value = false;
  }
}

onMounted(() => {
  document.addEventListener("pointerdown", onPageClick, true);
});

onUnmounted(() => {
  document.removeEventListener("pointerdown", onPageClick, true);
});

watch(showResults, (open) => {
  document.body.style.paddingBottom = open ? '24rem' : '';
});

function onKeydown(e: KeyboardEvent) {
  if (!showResults.value) return;
  const total = suggestions.value.length + (searchTerm.value.trim() ? 1 : 0);
  if (e.key === "ArrowDown") {
    e.preventDefault();
    activeIndex.value = (activeIndex.value + 1) % total;
  } else if (e.key === "ArrowUp") {
    e.preventDefault();
    activeIndex.value = (activeIndex.value - 1 + total) % total;
  } else if (e.key === "Enter" && activeIndex.value >= 0) {
    e.preventDefault();
    const s = suggestions.value[activeIndex.value];
    if (s) selectSuggestion(s);
  } else if (e.key === "Escape") {
    showResults.value = false;
  }
}
</script>

<template>
  <div ref="popoverRef">
    <UPopover v-model:open="showResults" :dismissible="false" :portal="false"
      :content="{ side: 'bottom', align: 'center', sideOffset: 4 }"
      :ui="{ content: 'w-(--reka-popper-anchor-width) p-0 rounded-lg' }">
      <template #anchor>
        <div class="w-[85vw] max-w-xl lg:max-w-2xl pointer-events-auto">
          <div class="border border-slate-300 rounded-xl overflow-hidden bg-white">
            <div class="grid grid-cols-2 divide-x divide-slate-300">
              <div class="p-2">
                <div class="text-xs font-semibold text-slate-500 uppercase tracking-wide">Date</div>
                <div class="flex items-center gap-2 mt-1.5 text-sm text-slate-900">
                  <span>Thu, Feb 26</span>
                  <span class="iconify i-lucide:chevron-down size-4 text-slate-400 ml-auto" aria-hidden="true" />
                </div>
              </div>
              <div class="p-2">
                <div class="text-xs font-semibold text-slate-500 uppercase tracking-wide">Travelers</div>
                <div class="flex items-center gap-2 mt-1.5 text-sm text-slate-900">
                  <span>2 travellers, 1 Room</span>
                  <span class="iconify i-lucide:chevron-down size-4 text-slate-400 ml-auto" aria-hidden="true" />
                </div>
              </div>
            </div>

            <div class="border-t border-slate-300 p-2">
              <div class="text-xs font-semibold text-slate-500 uppercase tracking-wide">Search</div>
              <div class="flex items-center gap-2 mt-1.5 text-sm text-slate-900">
                <UIcon v-if="!isLoading" name="i-lucide-search" class="size-4 text-slate-400 shrink-0" />
                <UIcon v-else name="i-lucide-loader-2" class="size-4 text-slate-400 shrink-0 animate-spin" />
                <input :value="searchTerm" type="text" placeholder="Search for a place or activity"
                  class="bg-transparent text-sm text-slate-900 placeholder-slate-400 outline-none w-full"
                  @input="onInput" @focus="onFocus" @keydown="onKeydown">
                <button v-if="searchTerm" class="shrink-0" @click="clearSearch">
                  <UIcon name="i-lucide-x" class="size-4 text-slate-400 hover:text-slate-600" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </template>

      <template #content>
        <ul class="divide-y divide-slate-200 overflow-hidden rounded-lg" role="listbox">
          <li v-for="(suggestion, i) in suggestions" :key="`${suggestion.type}-${suggestion.id}`" role="option"
            :aria-selected="activeIndex === i"
            class="flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors"
            :class="activeIndex === i ? 'bg-slate-100' : 'hover:bg-slate-50'" @click="selectSuggestion(suggestion)"
            @mouseenter="activeIndex = i">
            <UIcon :name="suggestion.type === 'destination' ? 'i-lucide-map-pin' : 'i-lucide-ticket'"
              class="size-6 text-amber-500 shrink-0" />
            <div class="min-w-0 flex-1">
              <div class="text-sm font-medium text-slate-900 truncate">{{ suggestion.name }}</div>
              <div class="text-xs text-slate-500 truncate">{{ suggestion.subtitle }}</div>
            </div>
          </li>

          <li v-if="searchTerm.trim()" role="option" :aria-selected="activeIndex === suggestions.length"
            class="flex items-center gap-3 px-4 py-3 cursor-pointer transition-colors"
            :class="activeIndex === suggestions.length ? 'bg-slate-100' : 'hover:bg-slate-50'"
            @mouseenter="activeIndex = suggestions.length">
            <UIcon name="i-lucide-search" class="size-6 text-amber-500 shrink-0" />
            <span class="text-sm text-slate-900">Search for {{ searchTerm }}</span>
          </li>
        </ul>
      </template>
    </UPopover>
  </div>
</template>

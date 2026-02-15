<script setup lang="ts">
import {
  DateFormatter,
  getLocalTimeZone,
  today,
  type CalendarDate,
} from "@internationalized/date";

type DateRange = {
  start: CalendarDate;
  end: CalendarDate;
};

const searchQuery = ref("");
const isPopoverOpen = ref(false);
const selectedDestination = ref<Destination | null>(null);
const highlightedIndex = ref(-1);
const isSearchFocused = ref(false);
const searchInput = ref<HTMLInputElement | null>(null);

const { data: destinations } = await useAsyncData<Destination[]>(
  "destinations",
  () => $fetch("https://api.fambahub.com/destinations"),
  {
    default: () => [],
    lazy: true,
    server: true,
    transform: (data) => data || [],
  },
);

const isDatePickerOpen = ref(false);
const df = new DateFormatter("en-US", { month: "short", day: "numeric" });
const todayDate = today(getLocalTimeZone());
// Using proper type for DateRange
const dateRange = shallowRef<DateRange | undefined>(undefined);
const tempDateRange = shallowRef<DateRange | undefined>(undefined);

const formattedDateRange = computed(() => {
  if (!dateRange.value?.start) return "";
  if (!dateRange.value?.end) {
    return df.format(dateRange.value.start.toDate(getLocalTimeZone()));
  }
  return `${df.format(dateRange.value.start.toDate(getLocalTimeZone()))} - ${df.format(dateRange.value.end.toDate(getLocalTimeZone()))}`;
});

const filteredDestinations = computed(() => {
  if (
    !searchQuery.value ||
    searchQuery.value.length < 2 ||
    !destinations.value
  ) {
    return [];
  }
  const query = searchQuery.value.toLowerCase();
  return destinations.value
    .filter((d) => d.name.toLowerCase().includes(query))
    .slice(0, 7);
});

const getParentName = (destination: Destination) => {
  if (!destination.parentDestinationId) return destination.type;
  const parent = destinations.value?.find(
    (d) => d.destinationId === destination.parentDestinationId,
  );
  return parent?.name || destination.type;
};

const getDestinationIcon = (type: string) => {
  switch (type?.toLowerCase()) {
    case "city":
      return "i-lucide-map-pin";
    case "country":
      return "i-lucide-flag";
    case "region":
      return "i-lucide-globe";
    default:
      return "i-lucide-compass";
  }
};

const navigateToDestination = async () => {
  if (selectedDestination.value) {
    const name = selectedDestination.value.name.replace(/\s+/g, "-");
    const id = selectedDestination.value.destinationId;

    // Construct query params for dates if selected
    const query: Record<string, string> = {};
    if (dateRange.value?.start) {
      query.start = dateRange.value.start.toString();
    }
    if (dateRange.value?.end) {
      query.end = dateRange.value.end.toString();
    }

    await navigateTo({
      path: `/${name}/d${id}-ttd`,
      query: Object.keys(query).length ? query : undefined,
    });
  }
};

const onSearchInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  searchQuery.value = target.value;
  isPopoverOpen.value = searchQuery.value.length >= 2;
  highlightedIndex.value = -1;
};

const onSearchFocus = () => {
  isSearchFocused.value = true;
  if (searchQuery.value.length >= 2) {
    isPopoverOpen.value = true;
  }
};

const onSearchBlur = () => {
  isSearchFocused.value = false;
  setTimeout(() => {
    if (!isSearchFocused.value) {
      isPopoverOpen.value = false;
    }
  }, 200);
};

const onKeyDown = (event: KeyboardEvent) => {
  const results = filteredDestinations.value;
  if (!results.length) return;

  switch (event.key) {
    case "ArrowDown":
      event.preventDefault();
      highlightedIndex.value = (highlightedIndex.value + 1) % results.length;
      break;
    case "ArrowUp":
      event.preventDefault();
      highlightedIndex.value =
        highlightedIndex.value <= 0
          ? results.length - 1
          : highlightedIndex.value - 1;
      break;
    case "Enter": {
      event.preventDefault();
      if (
        selectedDestination.value &&
        searchQuery.value === selectedDestination.value.name
      ) {
        navigateToDestination();
        return;
      }
      const selected =
        results[highlightedIndex.value !== -1 ? highlightedIndex.value : 0];
      if (selected) {
        selectDestination(selected);
      }
      break;
    }
    case "Escape":
      isPopoverOpen.value = false;
      searchInput.value?.blur();
      break;
  }
};

const selectDestination = (destination: Destination) => {
  selectedDestination.value = destination;
  searchQuery.value = destination.name;
  isPopoverOpen.value = false;
  highlightedIndex.value = -1;
  // Automatically open date picker after selection
  openDatePicker();
};

const openDatePicker = () => {
  tempDateRange.value = dateRange.value ? { ...dateRange.value } : undefined;
  isDatePickerOpen.value = true;
};

const applyDateRange = async () => {
  dateRange.value = tempDateRange.value;
  isDatePickerOpen.value = false;
  if (selectedDestination.value) {
    await navigateToDestination();
  }
};

const resetDateRange = () => {
  tempDateRange.value = undefined;
  dateRange.value = undefined;
};

const clearDateRange = () => {
  dateRange.value = undefined;
};
</script>

<template>
  <div class="pointer-events-auto w-[90%] max-w-xl lg:max-w-2xl relative">
    <div
      class="bg-white rounded-full p-2 flex flex-col sm:flex-row items-center gap-1 shadow-xl"
    >
      <div class="flex-1 px-4 py-1 w-full relative">
        <label class="block text-sm font-semibold text-neutral-700"
          >Where to?</label
        >
        <input
          ref="searchInput"
          type="text"
          :value="searchQuery"
          placeholder="Search for a place or activity"
          class="w-full text-neutral-600 bg-transparent outline-none placeholder:text-neutral-400 text-sm"
          @input="onSearchInput"
          @focus="onSearchFocus"
          @blur="onSearchBlur"
          @keydown="onKeyDown"
        />
      </div>

      <div class="hidden sm:block w-px h-8 bg-neutral-200" />

      <UPopover v-model:open="isDatePickerOpen" class="flex-1">
        <button
          type="button"
          class="w-full px-4 py-1 text-left"
          @click="openDatePicker"
        >
          <label
            class="block text-sm font-semibold text-neutral-700 cursor-pointer"
            >When</label
          >
          <div class="flex items-center justify-between h-5 gap-2">
            <span
              :class="[
                'text-sm truncate block flex-1',
                formattedDateRange ? 'text-neutral-900' : 'text-neutral-400',
              ]"
            >
              {{ formattedDateRange || "Select Dates" }}
            </span>
            <UIcon
              v-if="formattedDateRange"
              name="i-lucide-x"
              class="size-4 text-neutral-400 hover:text-neutral-600 shrink-0 cursor-pointer"
              @click.stop="clearDateRange"
            />
          </div>
        </button>

        <template #content>
          <div class="p-4">
            <UCalendar
              v-model="tempDateRange"
              range
              :min-value="todayDate"
              :year-controls="false"
            />
            <div class="flex gap-2 mt-4">
              <UButton
                variant="outline"
                color="neutral"
                class="flex-1 justify-center"
                @click="resetDateRange"
                >Reset</UButton
              >
              <UButton
                color="primary"
                class="flex-1 justify-center"
                @click="applyDateRange"
                >Apply</UButton
              >
            </div>
          </div>
        </template>
      </UPopover>

      <UButton
        icon="i-lucide-search"
        color="primary"
        class="rounded-full p-2.5! shrink-0"
        aria-label="Search"
        @click="navigateToDestination"
      />
    </div>

    <!-- Dropdown Results -->
    <div
      v-if="isPopoverOpen"
      class="absolute top-full left-0 right-0 mt-1 bg-white rounded-2xl shadow-xl z-50 overflow-hidden"
    >
      <div class="py-2">
        <template v-if="filteredDestinations.length">
          <template
            v-for="(destination, index) in filteredDestinations"
            :key="destination.destinationId"
          >
            <div v-if="index > 0" class="mx-4 border-t border-neutral-100" />
            <button
              :class="[
                'w-full flex items-center gap-3 px-4 py-3 transition-colors text-left',
                highlightedIndex === index
                  ? 'bg-neutral-100'
                  : 'hover:bg-neutral-100',
              ]"
              @click="selectDestination(destination)"
              @mouseenter="highlightedIndex = index"
            >
              <UIcon
                :name="getDestinationIcon(destination.type)"
                class="text-primary size-5 shrink-0"
              />
              <div class="min-w-0">
                <p class="text-sm font-medium text-neutral-900 truncate">
                  {{ destination.name }}
                </p>
                <p class="text-xs text-neutral-500 truncate">
                  {{ getParentName(destination) }}
                </p>
              </div>
            </button>
          </template>
        </template>

        <div
          v-else-if="!filteredDestinations.length && searchQuery.length >= 2"
          class="px-4 py-4 text-center text-sm text-neutral-500"
        >
          No destinations found
        </div>
      </div>
    </div>
  </div>
</template>

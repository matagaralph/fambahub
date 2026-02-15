<script setup lang="ts">
interface Destination {
  destinationId: number;
  name: string;
  type: string;
  parentDestinationId: number;
  lookupId: string;
  destinationUrl: string;
  defaultCurrencyCode: string;
  timeZone: string;
  countryCallingCode: string;
  languages: string[];
  center: {
    latitude: number;
    longitude: number;
  };
}

const heroSlides = [
  {
    image:
      "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1920&q=80",
    alt: "Tropical beach paradise",
  },
  {
    image:
      "https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=1920&q=80",
    alt: "Mountain lake adventure",
  },
  {
    image:
      "https://images.unsplash.com/photo-1502920917128-1aa500764cbd?w=1920&q=80",
    alt: "City exploration",
  },
];

// Destination search
const searchQuery = ref("");
const allDestinations = ref<Destination[]>([]);
const isLoading = ref(false);
const isPopoverOpen = ref(false);
const selectedDestination = ref<Destination | null>(null);

// Fetch all destinations once on mount
const fetchDestinations = async () => {
  if (allDestinations.value.length > 0) return; // Already cached

  isLoading.value = true;
  try {
    const response = await $fetch<Destination[]>(
      `https://api.fambahub.com/destinations`,
    );
    console.log("Fetched destinations:", response?.length);
    allDestinations.value = response || [];
  } catch (error) {
    console.error("Error fetching destinations:", error);
    allDestinations.value = [];
  } finally {
    isLoading.value = false;
  }
};

// Preload destinations on component mount
onMounted(() => {
  fetchDestinations();
});

// Filter destinations based on search query (computed for reactivity)
const filteredDestinations = computed(() => {
  if (!searchQuery.value || searchQuery.value.length < 2) {
    return [];
  }
  const query = searchQuery.value.toLowerCase();
  return allDestinations.value
    .filter((d) => d.name.toLowerCase().includes(query))
    .slice(0, 10); // Limit to 10 results for performance
});

const onSearchInput = (event: Event) => {
  const target = event.target as HTMLInputElement;
  searchQuery.value = target.value;
  isPopoverOpen.value = searchQuery.value.length >= 2;
};

const onSearchFocus = () => {
  fetchDestinations();
  if (searchQuery.value.length >= 2) {
    isPopoverOpen.value = true;
  }
};

const selectDestination = (destination: Destination) => {
  selectedDestination.value = destination;
  searchQuery.value = destination.name;
  isPopoverOpen.value = false;
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
</script>

<template>
  <section class="relative">
    <UCarousel
      v-slot="{ item }"
      :items="heroSlides"
      loop
      dots
      fade
      :duration="50"
      :autoplay="{ delay: 5000 }"
      :ui="{
        item: 'basis-full',
        dots: 'bottom-6',
        dot: 'bg-white/50 data-[state=active]:bg-white',
      }"
    >
      <div class="relative w-full h-125 lg:h-112.5">
        <!-- Background Image -->
        <img
          :src="item.image"
          :alt="item.alt"
          class="w-full h-full object-cover"
        />
        <!-- Dark Overlay -->
        <div class="absolute inset-0 bg-black/40" />
      </div>
    </UCarousel>

    <!-- Overlay Content -->
    <div
      class="absolute inset-0 flex flex-col items-center justify-center text-white pointer-events-none"
    >
      <h1 class="text-5xl md:text-6xl font-bold mb-4 text-center">
        Explore the world
      </h1>
      <p class="text-lg md:text-xl mb-8 text-center">
        Plan your next adventure with FambaHub
      </p>

      <!-- Search Box -->
      <div class="pointer-events-auto w-[90%] max-w-xl lg:max-w-2xl relative">
        <div
          class="bg-white rounded-full shadow-xl p-2 flex flex-col sm:flex-row items-center gap-1"
        >
          <div class="flex-1 px-4 py-1 w-full">
            <label class="block text-sm font-semibold text-neutral-700"
              >Where to?</label
            >
            <input
              type="text"
              :value="searchQuery"
              placeholder="Search for a place or activity"
              class="w-full text-neutral-600 bg-transparent outline-none placeholder:text-neutral-400 text-sm"
              @input="onSearchInput"
              @focus="onSearchFocus"
            />
          </div>

          <div class="hidden sm:block w-px h-8 bg-neutral-200" />
          <div class="flex-1 px-4 py-1">
            <label class="block text-sm font-semibold text-neutral-700"
              >When</label
            >
            <input
              type="text"
              placeholder="Select Dates"
              class="w-full text-neutral-600 bg-transparent outline-none placeholder:text-neutral-400 text-sm"
            />
          </div>
          <UButton
            icon="i-lucide-search"
            color="primary"
            class="rounded-full p-2.5! shrink-0"
            aria-label="Search"
          />
        </div>

        <!-- Dropdown Results -->
        <div
          v-if="isPopoverOpen"
          class="absolute top-full left-0 right-0 mt-3 bg-white rounded-2xl shadow-xl max-h-80 overflow-y-auto z-50"
        >
          <div class="py-2">
            <!-- Loading state -->
            <div v-if="isLoading" class="flex items-center justify-center py-4">
              <UIcon
                name="i-lucide-loader-2"
                class="animate-spin text-primary size-5"
              />
            </div>

            <!-- Results -->
            <template v-else>
              <button
                v-for="destination in filteredDestinations"
                :key="destination.destinationId"
                class="w-full flex items-center gap-3 px-4 py-3 hover:bg-neutral-100 transition-colors text-left"
                @click="selectDestination(destination)"
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
                    {{ destination.type }}
                  </p>
                </div>
              </button>

              <!-- Search for query -->
              <button
                v-if="searchQuery && filteredDestinations.length > 0"
                class="w-full flex items-center gap-3 px-4 py-3 hover:bg-neutral-100 transition-colors text-left border-t border-neutral-100"
              >
                <UIcon
                  name="i-lucide-search"
                  class="text-primary size-5 shrink-0"
                />
                <p class="text-sm text-neutral-600">
                  Search for
                  <span class="font-medium">{{ searchQuery }}</span>
                </p>
              </button>

              <!-- No results -->
              <div
                v-if="
                  !isLoading &&
                  filteredDestinations.length === 0 &&
                  searchQuery.length >= 2
                "
                class="px-4 py-4 text-center text-sm text-neutral-500"
              >
                No destinations found
              </div>
            </template>
          </div>
        </div>
      </div>
    </div>
  </section>
</template>

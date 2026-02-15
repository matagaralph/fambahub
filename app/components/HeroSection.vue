<script setup lang="ts">
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
</script>

<template>
  <section class="relative">
    <UCarousel
      v-slot="{ item }"
      :items="heroSlides"
      loop
      dots
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
      <div
        class="pointer-events-auto bg-white rounded-full shadow-xl p-1.5 flex flex-col sm:flex-row items-center gap-1 w-[90%] max-w-xl lg:max-w-2xl"
      >
        <div class="flex-1 px-4 py-1">
          <label class="block text-sm font-semibold text-neutral-700"
            >Where to?</label
          >
          <input
            type="text"
            placeholder="Search for a place or activity"
            class="w-full text-neutral-600 bg-transparent outline-none placeholder:text-neutral-400 text-sm"
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
    </div>
  </section>
</template>

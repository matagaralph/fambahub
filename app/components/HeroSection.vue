<script setup lang="ts">
import DestinationSearch from "./DestinationSearch.vue";

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
        <img
          :src="item.image"
          :alt="item.alt"
          class="w-full h-full object-cover"
        />
        <div class="absolute inset-0 bg-black/40" />
      </div>
    </UCarousel>

    <div
      class="absolute inset-0 flex flex-col items-center justify-center text-white pointer-events-none"
    >
      <h1 class="text-5xl md:text-6xl font-bold mb-4 text-center">
        Explore the world
      </h1>
      <p class="text-lg md:text-xl mb-8 text-center">
        Plan your next adventure with FambaHub
      </p>

      <DestinationSearch />
    </div>
  </section>
</template>

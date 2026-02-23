<script setup lang="ts">
import DestinationSearch from "./DestinationSearch.vue";

const heroSlides = [
  {
    image:
      "https://images.unsplash.com/photo-1504598318550-17eba1008a68?w=1600&q=75&fm=webp&auto=format&fit=crop",
    alt: "Hot air balloons over Cappadocia at sunrise",
  },
  {
    image:
      "https://images.unsplash.com/photo-1516426122078-c23e76319801?w=1600&q=75&fm=webp&auto=format&fit=crop",
    alt: "African safari wildlife adventure",
  },
  {
    image:
      "https://images.unsplash.com/photo-1523906834658-6e24ef2386f9?w=1600&q=75&fm=webp&auto=format&fit=crop",
    alt: "Gondola on a Venice canal at sunset",
  },
];

const currentIndex = ref(0);
</script>

<template>
  <section class="relative">
    <UCarousel v-slot="{ item, index }" :items="heroSlides" loop dots fade :duration="50" :autoplay="{ delay: 5000 }"
      :ui="{
        item: 'basis-full',
        dots: 'bottom-6',
        dot: 'bg-white/50 data-[state=active]:bg-white'
      }" @select="currentIndex = $event">
      <div class="relative w-full h-[32rem] lg:h-[36rem]">
        <img :src="item.image" :alt="item.alt" :fetchpriority="index === 0 ? 'high' : undefined"
          :loading="index === 0 ? 'eager' : 'lazy'" decoding="async" class="w-full h-full object-cover" />
        <div class="absolute inset-0 bg-black/40" />
      </div>
    </UCarousel>

    <div class="absolute inset-0 flex flex-col items-center justify-center text-white pointer-events-none">
      <h1 class="text-5xl md:text-6xl font-bold mb-3 text-center">
        Explore the world
      </h1>
      <p class="text-lg md:text-xl mb-10 text-center">
        Plan your next adventure with FambaHub
      </p>

      <DestinationSearch />
    </div>
  </section>
</template>

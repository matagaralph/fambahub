<script setup lang="ts">
import type { Product } from "~/types";

const props = defineProps<{ product: Product }>();
const route = useRoute();

const productLink = computed(() => {
  const name = "name" in route.params ? route.params.name : "";
  return `/${name}/p${props.product.productCode}`;
});

const coverImage = computed(() => {
  const images = props.product.images;
  if (!images?.length) return null;
  const source = images.find((img) => img.isCover) ?? images[0];
  return source?.variants?.find((v) => v.width >= 400)?.url ?? source?.variants?.[0]?.url ?? null;
});

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  minimumFractionDigits: 0,
  maximumFractionDigits: 0,
});

const formattedPrice = computed(() => {
  const price = props.product.pricing?.summary?.fromPrice;
  return price ? priceFormatter.format(price) : null;
});

const formattedOldPrice = computed(() => {
  const price = props.product.pricing?.summary?.fromPriceBeforeDiscount;
  return price ? priceFormatter.format(price) : null;
});

const durationText = computed(() => {
  const mins = props.product.duration?.fixedDurationInMinutes;
  if (!mins) return null;
  const h = Math.floor(mins / 60);
  const m = mins % 60;
  if (h && m) return `${h}h ${m}m`;
  return h ? `${h} hours` : `${m} minutes`;
});

const rating = computed(() => props.product.reviews?.combinedAverageRating ?? 0);
const reviewCount = computed(() => props.product.reviews?.totalReviews ?? 0);

const hasFlag = (flag: string) => props.product.flags?.includes(flag) ?? false;
const isLikelyToSellOut = computed(() => hasFlag("LIKELY_TO_SELL_OUT"));
const isSpecialOffer = computed(() => hasFlag("SPECIAL_OFFER"));
const isBestSeller = computed(() => hasFlag("BEST_SELLER"));
</script>

<template>
  <div
    class="group flex flex-col bg-white border border-neutral-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full relative cursor-pointer">
    <NuxtLink :to="productLink" class="relative aspect-3/2 overflow-hidden bg-neutral-100 block">
      <img v-if="coverImage" :src="coverImage" :alt="product.title"
        class="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105" loading="lazy" />

      <div class="absolute top-3 left-0 flex flex-col gap-1">
        <div v-if="isLikelyToSellOut"
          class="bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 shadow-sm uppercase tracking-wide">
          Likely to Sell Out
        </div>
        <div v-if="isSpecialOffer"
          class="bg-red-600 text-white text-[10px] font-bold px-1.5 py-0.5 shadow-sm uppercase tracking-wide">
          Special Offer
        </div>
        <div v-if="isBestSeller"
          class="bg-blue-600 text-white text-[10px] font-bold px-1.5 py-0.5 shadow-sm uppercase tracking-wide">
          Best Seller
        </div>
      </div>

      <button class="absolute top-2 right-2 p-1.5 rounded-full hover:bg-black/20 transition-colors z-10 group/heart">
        <UIcon name="i-lucide-heart" class="size-5 text-white stroke-2 group-hover/heart:fill-white/50" />
      </button>
    </NuxtLink>

    <NuxtLink :to="productLink" class="p-3 flex flex-col flex-1 gap-0.5">
      <h3 class="font-bold text-neutral-900 text-[17px] leading-snug line-clamp-2">
        {{ product.title }}
      </h3>

      <div v-if="reviewCount > 0" class="flex items-center gap-1 mt-1.5">
        <div class="flex">
          <UIcon v-for="i in 5" :key="i" name="i-lucide-star" class="size-3.5"
            :class="i <= Math.round(rating) ? 'text-amber-400' : 'text-neutral-300'" />
        </div>
        <span class="text-xs text-neutral-600 flex items-center gap-1">
          <span class="font-semibold text-neutral-900">{{
            rating.toFixed(1)
            }}</span>
          <UIcon name="i-lucide-dot" class="size-3.5 text-neutral-400" />
          <span class="text-neutral-500">{{ reviewCount.toLocaleString() }} reviews</span>
        </span>
      </div>

      <div v-if="durationText" class="mt-2 flex items-center gap-1 text-xs text-neutral-600">
        <UIcon name="i-lucide-clock" class="size-3.5 text-neutral-400" />
        <span>{{ durationText }}</span>
      </div>

      <div class="flex flex-col gap-1 mt-1.5">
        <div class="flex items-center gap-1.5 text-xs text-green-600">
          <UIcon name="i-lucide-check" class="size-3.5" />
          <span>Free Cancellation</span>
        </div>
        <p class="text-sm text-neutral-600 mt-1">
          from
          <span v-if="isSpecialOffer && formattedOldPrice" class="line-through text-neutral-400 mr-1">{{
            formattedOldPrice }}</span>
          <span class="font-bold text-base" :class="isSpecialOffer ? 'text-red-600' : 'text-neutral-900'">{{
            formattedPrice }}</span>
        </p>
      </div>
    </NuxtLink>
  </div>
</template>

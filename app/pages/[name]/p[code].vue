<script setup lang="ts">
import type { ProductDetail } from "~/types";

const route = useRoute("name-pcode");
const productCode = computed(() => route.params.code);

const displayName = computed(() => {
  return route.params.name.replace(/-/g, " ");
});

const {
  data: product,
  status,
  error,
} = await useFetch<ProductDetail>(
  () => `https://api.fambahub.com/products/${productCode.value}`,
  {
    watch: [productCode],
  },
);

useHead({
  title: () => product.value?.title || "Product Details",
});

// Duration from itinerary or top-level
const durationMinutes = computed(() => {
  return (
    product.value?.duration?.fixedDurationInMinutes ||
    product.value?.itinerary?.duration?.fixedDurationInMinutes
  );
});

const durationText = computed(() => {
  const minutes = durationMinutes.value;
  if (!minutes) return null;
  const hours = Math.floor(minutes / 60);
  const mins = minutes % 60;
  if (hours > 0 && mins > 0) return `${hours} hours ${mins} mins`;
  if (hours > 0) return `${hours} hours`;
  return `${mins} minutes`;
});

// Rating & reviews
const rating = computed(
  () => product.value?.reviews?.combinedAverageRating || 0,
);
const reviewCount = computed(() => product.value?.reviews?.totalReviews || 0);

// Badge of Excellence (high rating + many reviews)
const isBadgeOfExcellence = computed(() => {
  return rating.value >= 4.5 && reviewCount.value >= 50;
});

// Determine if pickup is offered
const pickupOffered = computed(() => {
  const pickupType = product.value?.logistics?.travelerPickup?.pickupOptionType;
  return pickupType && pickupType !== "MEET_EVERYONE_AT_START_POINT";
});

// Ticket type
const isMobileTicket = computed(() => {
  return product.value?.ticketInfo?.ticketTypes?.some(
    (t) => t === "MOBILE_ONLY" || t === "E_TICKET",
  );
});

// Language
const guideLanguage = computed(() => {
  const lang = product.value?.languageGuides?.[0]?.language;
  if (!lang) return null;
  const langMap: Record<string, string> = {
    en: "English",
    es: "Spanish",
    fr: "French",
    de: "German",
    it: "Italian",
    pt: "Portuguese",
    ja: "Japanese",
    zh: "Chinese",
    ko: "Korean",
  };
  return langMap[lang] || lang.toUpperCase();
});

// Review distribution (sorted 5→1)
const reviewDistribution = computed(() => {
  const totals = product.value?.reviews?.reviewCountTotals;
  if (!totals?.length) return [];
  return [...totals].sort((a, b) => b.rating - a.rating);
});

const maxReviewCount = computed(() => {
  return Math.max(...reviewDistribution.value.map((r) => r.count), 1);
});
</script>

<template>
  <div class="bg-white min-h-screen pb-16">
    <div class="container mx-auto px-4 py-6">
      <!-- Breadcrumbs -->
      <nav class="flex items-center gap-2 text-sm text-neutral-500 mb-4">
        <NuxtLink to="/" class="hover:underline">Home</NuxtLink>
        <UIcon name="i-lucide-chevron-right" class="size-3.5" />
        <NuxtLink :to="`/${route.params.name}/d0-ttd`" class="hover:underline capitalize">
          Things to do in {{ displayName }}
        </NuxtLink>
        <UIcon name="i-lucide-chevron-right" class="size-3.5" />
        <span class="text-neutral-900 font-medium truncate max-w-xs">
          {{ product?.title || "Loading..." }}
        </span>
      </nav>

      <!-- Loading -->
      <div v-if="status === 'pending'" class="py-20 flex justify-center">
        <UIcon name="i-lucide-loader-2" class="animate-spin size-10 text-neutral-400" />
      </div>

      <!-- Error -->
      <div v-else-if="status === 'error'" class="py-20 text-center text-red-500">
        <UIcon name="i-lucide-alert-circle" class="size-12 mx-auto mb-4" />
        <p class="text-lg font-semibold">Failed to load product</p>
        <p class="text-sm mt-2">{{ error?.message }}</p>
      </div>

      <!-- Product Content -->
      <template v-else-if="product">
        <!-- Title -->
        <h1 class="text-2xl md:text-3xl font-bold text-neutral-900 mb-2">
          {{ product.title }}
        </h1>

        <!-- Rating & Badges Bar -->
        <div class="flex items-center gap-3 flex-wrap text-sm mb-6">
          <div v-if="reviewCount > 0" class="flex items-center gap-1.5">
            <div class="flex">
              <UIcon v-for="i in 5" :key="i" name="i-lucide-star" class="size-4" :class="i <= Math.round(rating)
                ? 'text-primary-500'
                : 'text-neutral-300'
                " />
            </div>
            <span class="text-neutral-700 font-medium">
              {{ reviewCount.toLocaleString() }} Reviews
            </span>
          </div>

          <span v-if="reviewCount > 0" class="text-neutral-300">|</span>

          <div v-if="isBadgeOfExcellence" class="flex items-center gap-1.5">
            <UIcon name="i-lucide-award" class="size-4 text-amber-600" />
            <span class="text-neutral-700 font-medium">Badge of Excellence</span>
          </div>

          <span v-if="isBadgeOfExcellence" class="text-neutral-300">|</span>

          <span class="text-neutral-600 capitalize">{{ displayName }}</span>

          <!-- Lowest Price Guarantee (right-aligned) -->
          <div class="ml-auto hidden md:flex items-center gap-1.5 text-neutral-600">
            <UIcon name="i-lucide-shield-check" class="size-4" />
            <span class="font-medium">Lowest Price Guarantee</span>
          </div>
        </div>

        <!-- Main Layout: Gallery + Booking Card -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <!-- Left Column -->
          <div class="lg:col-span-2 space-y-6">
            <!-- Image Gallery -->
            <ProductImageGallery v-if="product.images?.length" :images="product.images" />

            <!-- Quick Facts Strip -->
            <div
              class="flex flex-wrap items-center gap-x-6 gap-y-3 text-sm text-neutral-700 py-3 border-t border-b border-neutral-200">
              <div v-if="durationText" class="flex items-center gap-1.5">
                <UIcon name="i-lucide-clock" class="size-4 text-neutral-500" />
                <span>{{ durationText }} (approx.)</span>
              </div>
              <div v-if="pickupOffered" class="flex items-center gap-1.5">
                <UIcon name="i-lucide-bus" class="size-4 text-neutral-500" />
                <span>Pickup offered</span>
              </div>
              <div v-if="isMobileTicket" class="flex items-center gap-1.5">
                <UIcon name="i-lucide-smartphone" class="size-4 text-neutral-500" />
                <span>Mobile ticket</span>
              </div>
              <div v-if="guideLanguage" class="flex items-center gap-1.5">
                <UIcon name="i-lucide-languages" class="size-4 text-neutral-500" />
                <span>Offered in: {{ guideLanguage }}</span>
              </div>
            </div>

            <!-- Overview / Description -->
            <section v-if="product.description">
              <h2 class="text-xl font-bold text-neutral-900 mb-3">Overview</h2>
              <p class="text-neutral-700 leading-relaxed whitespace-pre-line">
                {{ product.description.trim() }}
              </p>
            </section>

            <hr v-if="product.inclusions?.length || product.exclusions?.length" class="border-neutral-200" />

            <!-- What's Included / Not Included -->
            <section v-if="product.inclusions?.length || product.exclusions?.length">
              <h2 class="text-xl font-bold text-neutral-900 mb-4">
                What's Included
              </h2>
              <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div v-if="product.inclusions?.length">
                  <ul class="space-y-2">
                    <li v-for="(item, i) in product.inclusions" :key="i" class="flex items-start gap-2 text-sm">
                      <UIcon name="i-lucide-check" class="size-4 text-green-600 shrink-0 mt-0.5" />
                      <span class="text-neutral-700">
                        {{ item.description || item.typeDescription }}
                      </span>
                    </li>
                  </ul>
                </div>
                <div v-if="product.exclusions?.length">
                  <h3 class="text-sm font-semibold text-neutral-500 mb-2">
                    Not Included
                  </h3>
                  <ul class="space-y-2">
                    <li v-for="(item, i) in product.exclusions" :key="i" class="flex items-start gap-2 text-sm">
                      <UIcon name="i-lucide-x" class="size-4 text-red-500 shrink-0 mt-0.5" />
                      <span class="text-neutral-700">
                        {{ item.description || item.typeDescription }}
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </section>

            <hr v-if="product.itinerary?.itineraryItems?.length" class="border-neutral-200" />

            <!-- What to Expect / Itinerary -->
            <section v-if="product.itinerary?.itineraryItems?.length">
              <h2 class="text-xl font-bold text-neutral-900 mb-4">
                What to Expect
              </h2>
              <div class="space-y-4">
                <div v-for="(item, i) in product.itinerary.itineraryItems" :key="i" class="flex gap-4">
                  <div
                    class="w-8 h-8 rounded-full bg-primary-100 text-primary-700 flex items-center justify-center text-sm font-bold shrink-0">
                    {{ i + 1 }}
                  </div>
                  <div class="flex-1 pt-1">
                    <div class="flex items-center gap-2 mb-1">
                      <span v-if="item.passByWithoutStopping"
                        class="text-xs bg-neutral-100 text-neutral-600 px-2 py-0.5 rounded-full">
                        Pass by
                      </span>
                      <span v-if="item.admissionIncluded === 'YES'"
                        class="text-xs bg-green-50 text-green-700 px-2 py-0.5 rounded-full">
                        Admission included
                      </span>
                    </div>
                    <p class="text-sm text-neutral-700 leading-relaxed whitespace-pre-line">
                      {{ item.description }}
                    </p>
                  </div>
                </div>
              </div>
            </section>

            <hr v-if="product.additionalInfo?.length" class="border-neutral-200" />

            <!-- Additional Information -->
            <section v-if="product.additionalInfo?.length">
              <h2 class="text-xl font-bold text-neutral-900 mb-4">
                Additional Information
              </h2>
              <ul class="space-y-2">
                <li v-for="(info, i) in product.additionalInfo" :key="i" class="flex items-start gap-2 text-sm">
                  <UIcon name="i-lucide-info" class="size-4 text-neutral-400 shrink-0 mt-0.5" />
                  <span class="text-neutral-700">{{ info.description }}</span>
                </li>
              </ul>
            </section>

            <hr v-if="product.cancellationPolicy" class="border-neutral-200" />

            <!-- Cancellation Policy -->
            <section v-if="product.cancellationPolicy">
              <h2 class="text-xl font-bold text-neutral-900 mb-3">
                Cancellation Policy
              </h2>
              <p class="text-sm text-neutral-700">
                {{ product.cancellationPolicy.description }}
              </p>
              <div v-if="
                product.cancellationPolicy.cancelIfBadWeather ||
                product.cancellationPolicy.cancelIfInsufficientTravelers
              " class="mt-3 space-y-1">
                <p v-if="product.cancellationPolicy.cancelIfBadWeather"
                  class="flex items-center gap-2 text-sm text-neutral-600">
                  <UIcon name="i-lucide-cloud-rain" class="size-4 text-neutral-400" />
                  This experience may be cancelled due to poor weather
                </p>
                <p v-if="
                  product.cancellationPolicy.cancelIfInsufficientTravelers
                " class="flex items-center gap-2 text-sm text-neutral-600">
                  <UIcon name="i-lucide-users" class="size-4 text-neutral-400" />
                  This experience requires a minimum number of travellers
                </p>
              </div>
            </section>

            <hr v-if="reviewCount > 0" class="border-neutral-200" />

            <!-- Reviews Summary -->
            <section v-if="reviewCount > 0">
              <h2 class="text-xl font-bold text-neutral-900 mb-4">Reviews</h2>
              <div class="flex flex-col md:flex-row gap-8">
                <!-- Overall Rating -->
                <div class="text-center md:text-left shrink-0">
                  <div class="text-5xl font-bold text-neutral-900">
                    {{ rating.toFixed(1) }}
                  </div>
                  <div class="flex justify-center md:justify-start mt-1">
                    <UIcon v-for="i in 5" :key="i" name="i-lucide-star" class="size-4" :class="i <= Math.round(rating)
                      ? 'text-primary-500'
                      : 'text-neutral-300'
                      " />
                  </div>
                  <p class="text-sm text-neutral-500 mt-1">
                    {{ reviewCount.toLocaleString() }} reviews
                  </p>
                </div>

                <!-- Distribution Bars -->
                <div v-if="reviewDistribution.length" class="flex-1 space-y-2">
                  <div v-for="item in reviewDistribution" :key="item.rating" class="flex items-center gap-3 text-sm">
                    <span class="w-4 text-right text-neutral-600 font-medium">
                      {{ item.rating }}
                    </span>
                    <UIcon name="i-lucide-star" class="size-3.5 text-primary-500" />
                    <div class="flex-1 h-3 bg-neutral-100 rounded-full overflow-hidden">
                      <div class="h-full bg-primary-500 rounded-full transition-all" :style="{
                        width: `${(item.count / maxReviewCount) * 100}%`,
                      }" />
                    </div>
                    <span class="w-8 text-right text-neutral-500">
                      {{ item.count }}
                    </span>
                  </div>
                </div>
              </div>

              <!-- Review Sources -->
              <div v-if="product.reviews?.sources?.length" class="mt-6 flex flex-wrap gap-4">
                <div v-for="source in product.reviews.sources" :key="source.provider"
                  class="flex items-center gap-2 text-sm text-neutral-600 bg-neutral-50 px-3 py-2 rounded-lg">
                  <UIcon name="i-lucide-message-square" class="size-4 text-neutral-400" />
                  <span class="font-medium">{{ source.provider }}</span>
                  <span>
                    {{ source.averageRating.toFixed(1) }} ★ ·
                    {{ source.totalCount }} reviews
                  </span>
                </div>
              </div>
            </section>

            <!-- Supplier Info -->
            <div v-if="product.supplier" class="pt-6 border-t border-neutral-200">
              <p class="text-sm text-neutral-500">
                Provided by
                <span class="font-semibold text-neutral-700">
                  {{ product.supplier.name }}
                </span>
              </p>
            </div>
          </div>

          <!-- Right Column: Booking Card -->
          <div class="lg:col-span-1">
            <ProductBookingCard :product="product" />
          </div>
        </div>
      </template>
    </div>
  </div>
</template>

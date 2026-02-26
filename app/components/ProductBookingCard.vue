<script setup lang="ts">
import type { ProductDetail } from "~/types";

const props = defineProps<{
  product: ProductDetail;
}>();

const formattedPrice = computed(() => {
  const price = props.product.pricing?.summary?.fromPrice;
  if (!price) return null;
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: props.product.pricing?.currency || "USD",
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(price);
});

const hasChildDiscount = computed(() => {
  return props.product.pricingInfo?.ageBands?.some(
    (band) => band.ageBand === "CHILD" || band.ageBand === "YOUTH",
  );
});

const cancellationText = computed(() => {
  return props.product.cancellationPolicy?.description;
});

const isFreeCancellation = computed(() => {
  return props.product.cancellationPolicy?.refundEligibility?.some(
    (e) => e.percentageRefundable === 100,
  );
});

const isInstantConfirmation = computed(() => {
  return (
    props.product.bookingConfirmationSettings?.confirmationType === "INSTANT"
  );
});

const defaultDate = computed(() => {
  const date = new Date();
  date.setDate(date.getDate() + 3);
  return date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });
});
</script>

<template>
  <div class="border border-neutral-200 rounded-md p-5 sticky top-6 bg-white shadow-xs">
    <!-- Price Section -->
    <div class="mb-4">
      <div class="flex items-baseline gap-2">
        <span v-if="formattedPrice" class="text-2xl font-bold text-neutral-900">
          {{ formattedPrice }}
        </span>
        <span v-else class="text-lg font-semibold text-neutral-900">
          Check Availability
        </span>
        <button class="text-sm text-primary-600 hover:underline cursor-pointer">
          Price details
        </button>
      </div>
      <div v-if="hasChildDiscount" class="flex items-center gap-1.5 mt-2 text-sm text-green-700">
        <UIcon name="i-lucide-circle-check" class="size-4 text-green-600" />
        <span>Discounted rates for kids</span>
      </div>
    </div>

    <!-- Booking Selectors -->
    <div class="border border-neutral-300 rounded-lg overflow-hidden mb-4">
      <div class="grid grid-cols-2 divide-x divide-neutral-300">
        <div class="p-3">
          <div class="text-xs font-semibold text-neutral-500 uppercase tracking-wide">
            Date
          </div>
          <div class="flex items-center gap-1.5 mt-1 text-sm text-neutral-900">
            <span>{{ defaultDate }}</span>
            <UIcon name="i-lucide-chevron-down" class="size-4 text-neutral-400 ml-auto" />
          </div>
        </div>
        <div class="p-3">
          <div class="text-xs font-semibold text-neutral-500 uppercase tracking-wide">
            Travelers
          </div>
          <div class="flex items-center gap-1.5 mt-1 text-sm text-neutral-900">
            <UIcon name="i-lucide-user" class="size-4 text-neutral-500" />
            <span>2</span>
            <UIcon name="i-lucide-chevron-down" class="size-4 text-neutral-400 ml-auto" />
          </div>
        </div>
      </div>
      <div class="border-t border-neutral-300 p-3">
        <div class="text-xs font-semibold text-neutral-500 uppercase tracking-wide">
          Start time
        </div>
        <div class="flex items-center gap-1.5 mt-1 text-sm text-neutral-900">
          <span>Select a time</span>
          <UIcon name="i-lucide-chevron-down" class="size-4 text-neutral-400 ml-auto" />
        </div>
      </div>
    </div>

    <!-- CTA Button: Check Availability Only -->
    <div class="mb-5">
      <button
        class="block w-full text-center py-3 px-4 bg-primary-500 hover:bg-primary-600 rounded-full text-sm font-bold text-white transition-colors cursor-pointer">
        Check availability
      </button>
    </div>

    <!-- Info Items -->
    <div class="space-y-3 text-sm">
      <div v-if="isFreeCancellation" class="flex gap-2">
        <UIcon name="i-lucide-circle-check" class="size-5 text-green-600 shrink-0 mt-0.5" />
        <p>
          <span class="text-green-700 font-semibold underline">
            Free cancellation
          </span>
          <span v-if="cancellationText" class="text-neutral-600">
            {{
              " " +
              cancellationText
                .replace("For a full refund, cancel", "Cancel")
                .replace(".", "")
            }}
            (local time)
          </span>
        </p>
      </div>

      <div v-if="isInstantConfirmation" class="flex gap-2">
        <UIcon name="i-lucide-circle-check" class="size-5 text-green-600 shrink-0 mt-0.5" />
        <p>
          <span class="text-green-700 font-semibold underline">
            Reserve now, pay nothing
          </span>
          <span class="text-neutral-600"> today</span>
        </p>
      </div>

      <div class="flex gap-2 pt-1">
        <UIcon name="i-lucide-clock" class="size-5 text-neutral-500 shrink-0 mt-0.5" />
        <div>
          <p class="font-semibold text-neutral-800">Book ahead!</p>
          <p class="text-neutral-500">
            Check availability for your preferred dates.
          </p>
        </div>
      </div>
    </div>
  </div>
</template>

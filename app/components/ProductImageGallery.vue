<script setup lang="ts">
import type { ProductImage } from "~/types";

const props = defineProps<{
  images: ProductImage[];
}>();

const activeIndex = ref(0);
const showLightbox = ref(false);

const MAX_THUMBNAILS = 5;

const visibleThumbnails = computed(() => props.images.slice(0, MAX_THUMBNAILS));
const hasMoreImages = computed(() => props.images.length > MAX_THUMBNAILS);

const activeImage = computed(() => props.images[activeIndex.value]);

function getVariantUrl(
  image: ProductImage | undefined,
  preferredWidth: number,
): string {
  if (!image?.variants?.length) return "";
  const sorted = [...image.variants].sort(
    (a, b) =>
      Math.abs(a.width - preferredWidth) - Math.abs(b.width - preferredWidth),
  );
  return sorted[0]?.url ?? "";
}

const mainImageUrl = computed(() => getVariantUrl(activeImage.value, 720));
const lightboxImageUrl = computed(() => getVariantUrl(activeImage.value, 720));

function thumbnailUrl(image: ProductImage): string {
  return getVariantUrl(image, 200);
}

function selectImage(index: number) {
  activeIndex.value = index;
}

function nextImage() {
  activeIndex.value = (activeIndex.value + 1) % props.images.length;
}

function prevImage() {
  activeIndex.value =
    (activeIndex.value - 1 + props.images.length) % props.images.length;
}

function openLightbox(index?: number) {
  if (index !== undefined) activeIndex.value = index;
  showLightbox.value = true;
}

function closeLightbox() {
  showLightbox.value = false;
}

function handleKeydown(e: KeyboardEvent) {
  if (!showLightbox.value) return;
  if (e.key === "ArrowRight") nextImage();
  else if (e.key === "ArrowLeft") prevImage();
  else if (e.key === "Escape") closeLightbox();
}

onMounted(() => {
  window.addEventListener("keydown", handleKeydown);
});

onUnmounted(() => {
  window.removeEventListener("keydown", handleKeydown);
});
</script>

<template>
  <div>
    <div class="flex gap-3">
      <div class="hidden lg:flex flex-col gap-2 w-30 shrink-0">
        <button v-for="(img, i) in visibleThumbnails" :key="i"
          class="relative rounded-lg overflow-hidden aspect-4/3 border-2 transition-colors" :class="activeIndex === i
            ? 'border-primary-500'
            : 'border-transparent hover:border-slate-300'
            " @click="selectImage(i)">
          <img :src="thumbnailUrl(img)" :alt="img.caption || `Image ${i + 1}`" class="w-full h-full object-cover"
            loading="lazy">
          <div v-if="i === MAX_THUMBNAILS - 1 && hasMoreImages"
            class="absolute inset-0 bg-black/60 flex flex-col items-center justify-center text-white text-sm font-semibold cursor-pointer"
            @click.stop="openLightbox(i)">
            <span>See</span>
            <span>More</span>
          </div>
        </button>
      </div>

      <div class="relative flex-1 rounded-xl overflow-hidden bg-slate-100 aspect-3/2 cursor-pointer"
        @click="openLightbox()">
        <img v-if="mainImageUrl" :src="mainImageUrl" :alt="activeImage?.caption || 'Product image'"
          class="w-full h-full object-cover">

        <button
          class="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-md flex items-center justify-center hover:bg-white transition-colors"
          @click.stop="prevImage">
          <UIcon name="i-lucide-chevron-left" class="size-5 text-slate-700" />
        </button>

        <button
          class="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/90 shadow-md flex items-center justify-center hover:bg-white transition-colors"
          @click.stop="nextImage">
          <UIcon name="i-lucide-chevron-right" class="size-5 text-slate-700" />
        </button>

        <button
          class="absolute top-3 right-3 bg-white rounded-full px-3 py-1.5 flex items-center gap-1.5 shadow-md hover:shadow-lg transition-shadow text-sm font-medium"
          @click.stop>
          <UIcon name="i-lucide-heart" class="size-4 text-slate-600" />
          <span class="hidden sm:inline text-slate-700">Add to Wishlist</span>
        </button>

        <div class="lg:hidden absolute bottom-3 right-3 bg-black/60 text-white text-xs px-2.5 py-1 rounded-full">
          {{ activeIndex + 1 }} / {{ images.length }}
        </div>
      </div>
    </div>

    <Teleport to="body">
      <Transition name="lightbox">
        <div v-if="showLightbox" class="fixed inset-0 z-50 bg-black/95 flex flex-col" @click="closeLightbox">
          <div class="flex items-center justify-between px-4 py-3 text-white shrink-0">
            <span class="text-sm font-medium">
              {{ activeIndex + 1 }} / {{ images.length }}
            </span>
            <button class="w-10 h-10 rounded-full hover:bg-white/10 flex items-center justify-center transition-colors"
              @click.stop="closeLightbox">
              <UIcon name="i-lucide-x" class="size-6" />
            </button>
          </div>

          <div class="flex-1 flex items-center justify-center px-4 md:px-16 relative min-h-0" @click.stop>
            <button
              class="absolute left-2 md:left-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
              @click.stop="prevImage">
              <UIcon name="i-lucide-chevron-left" class="size-6 text-white" />
            </button>

            <img :src="lightboxImageUrl" :alt="activeImage?.caption || ''"
              class="max-h-[75vh] max-w-full object-contain rounded-lg">

            <button
              class="absolute right-2 md:right-4 w-12 h-12 rounded-full bg-white/10 hover:bg-white/20 flex items-center justify-center transition-colors z-10"
              @click.stop="nextImage">
              <UIcon name="i-lucide-chevron-right" class="size-6 text-white" />
            </button>
          </div>

          <div v-if="activeImage?.caption" class="text-center text-white/80 text-sm py-4 px-4 shrink-0">
            {{ activeImage.caption }}
          </div>
        </div>
      </Transition>
    </Teleport>
  </div>
</template>

<style scoped>
.lightbox-enter-active,
.lightbox-leave-active {
  transition: opacity 0.2s ease;
}

.lightbox-enter-from,
.lightbox-leave-to {
  opacity: 0;
}
</style>

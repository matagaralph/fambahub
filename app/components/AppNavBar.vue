<script setup lang="ts">
import { en, zh_cn, nl, fr, de, it, ja, pt, ru, es } from '@nuxt/ui/locale'

const route = useRoute()
const isHome = computed(() => route.path === '/')

const locales = { en, zh_cn, nl, fr, de, it, ja, pt, ru, es }
const locale = ref('en')

const avatarOpen = ref(false)

</script>

<template>
  <nav class="fixed inset-x-0 top-0 z-10 border-b border-slate-950/5">
    <div class="bg-white">
      <div class="flex h-14 items-center justify-between gap-8 px-4 sm:px-6">
        <div class="flex items-center gap-4">
          <a class="flex items-center gap-3 shrink-0" aria-label="Home" href="/">
            <img src="/favicon.svg" alt="FambaHub" class="h-6 w-6">
            <span class="text-base font-semibold text-slate-950">FambaHub</span>
          </a>

          <div v-if="!isHome"
            class="hidden md:flex items-center gap-2 rounded-md border border-slate-200 bg-slate-50 px-3 py-1.5 focus-within:border-slate-400 focus-within:bg-white transition">
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" class="size-4 shrink-0 fill-slate-400">
              <path fill-rule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clip-rule="evenodd" />
            </svg>
            <input type="text" placeholder="Search for a place or activity"
              class="bg-transparent text-sm text-slate-950 placeholder-slate-400 outline-none w-60">
          </div>
        </div>

        <div class="flex items-center gap-6 max-md:hidden">

          <a class="text-sm/6 text-slate-950" href="#">List your place</a>
          <a class="text-sm/6 text-slate-950" href="/support">Support</a>

          <ULocaleSelect v-model="locale" :locales="Object.values(locales)" class="w-40 " />

          <div class="relative">
            <button type="button" class="flex items-center" @click="avatarOpen = !avatarOpen">
              <img src="/avatar.png" alt="User avatar"
                class="size-7 rounded-full object-cover ring-2 ring-slate-200 hover:ring-slate-300 transition">
            </button>

            <div v-if="avatarOpen"
              class="absolute right-0 mt-2 w-48 rounded-md border border-slate-200 bg-white py-1 shadow-lg"
              @mouseleave="avatarOpen = false">
              <a href="/auth/sign-in"
                class="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                <UIcon name="i-lucide-log-in" class="size-4" />
                Sign In
              </a>
              <a href="/auth/sign-up"
                class="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                <UIcon name="i-lucide-user-plus" class="size-4" />
                Sign Up
              </a>
              <div class="my-1 border-t border-slate-100" />
              <a href="/wishlists" class="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                <UIcon name="i-lucide-heart" class="size-4" />
                Wishlists
              </a>
              <a href="/help" class="flex items-center gap-2 px-4 py-2 text-sm text-slate-700 hover:bg-slate-50">
                <UIcon name="i-lucide-circle-help" class="size-4" />
                Help Center
              </a>
            </div>
          </div>
        </div>

        <div class="flex items-center gap-2.5 md:hidden">
          <button v-if="!isHome" type="button" aria-label="Search"
            class="inline-grid size-7 place-items-center rounded-md">
            <svg viewBox="0 0 16 16" fill="currentColor" class="size-4">
              <path fill-rule="evenodd"
                d="M9.965 11.026a5 5 0 1 1 1.06-1.06l2.755 2.754a.75.75 0 1 1-1.06 1.06l-2.755-2.754ZM10.5 7a3.5 3.5 0 1 1-7 0 3.5 3.5 0 0 1 7 0Z"
                clip-rule="evenodd" />
            </svg>
          </button>

          <button type="button" class="inline-grid size-7 place-items-center rounded-md" aria-label="Navigation"
            @click="avatarOpen = !avatarOpen">
            <UIcon name="i-lucide-menu" class="size-5 text-slate-700" />
          </button>
        </div>
      </div>
    </div>
  </nav>
</template>

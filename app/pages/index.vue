<script setup lang="ts">
const reasons = [
  {
    icon: 'i-lucide-shield-check',
    name: 'Book with Confidence',
    description: 'Free cancellation on most activities. Plans change — we get it.',
  },
  {
    icon: 'i-lucide-ticket-percent',
    name: 'Best Price Guarantee',
    description: 'Find it cheaper elsewhere? We\'ll match it. No questions asked.',
  },
  {
    icon: 'i-lucide-headset',
    name: '24/7 Travel Support',
    description: 'Real humans ready to help, any time zone, any day of the week.',
  },
  {
    icon: 'i-lucide-star',
    name: 'Verified Reviews',
    description: 'Millions of honest reviews from travellers who\'ve been there, done that.',
  },
]
</script>

<template>
  <div>
    <HeroSection />
    <section class="bg-white">
      <div class="mx-auto max-w-7xl px-4 py-20 sm:px-6 lg:px-8">
        <h2 class="text-2xl font-bold text-slate-900 text-center mb-2">Why FambaHub?</h2>
        <p class="text-slate-500 text-center mb-12 max-w-xl mx-auto">Trusted by travellers worldwide to find and book
          the
          best experiences.</p>
        <div class="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div v-for="reason in reasons" :key="reason.name" class="text-center">
            <div class="mx-auto flex size-14 items-center justify-center rounded-full bg-primary-50">
              <UIcon :name="reason.icon" class="size-7 text-primary-600" />
            </div>
            <h3 class="mt-4 text-sm font-semibold text-slate-900">{{ reason.name }}</h3>
            <p class="mt-1.5 text-sm text-slate-500 leading-relaxed">{{ reason.description }}</p>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

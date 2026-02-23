<template>

  <div
    class="border border-slate-300 rounded-xl overflow-hidden mb-4 w-[90vw] max-w-2xl lg:max-w-3xl pointer-events-auto bg-white">
    <div class="grid grid-cols-2 divide-x divide-slate-300">
      <div class="p-2">
        <div class="text-xs font-semibold text-slate-500 uppercase tracking-wide">Date</div>
        <div class="flex items-center gap-2 mt-1.5 text-sm text-slate-900"><span>Thu, Feb 26</span><span
            class="iconify i-lucide:chevron-down size-4 text-slate-400 ml-auto" aria-hidden="true" style=""></span>
        </div>
      </div>
      <div class="p-2">
        <div class="text-xs font-semibold text-slate-500 uppercase tracking-wide">Travelers</div>
        <div class="flex items-center gap-2 mt-1.5 text-sm text-slate-900"><span>2</span><span
            class="iconify i-lucide:chevron-down size-4 text-slate-400 ml-auto" aria-hidden="true" style=""></span>
        </div>
      </div>
    </div>
    <div class="border-t border-slate-300 p-2">
      <div class="text-xs font-semibold text-slate-500 uppercase tracking-wide">Search</div>
      <div class="flex items-center gap-2 mt-1.5 text-sm text-slate-900">
        <UIcon name="i-lucide-search" class="size-4 text-slate-400" />
        <input type="text" placeholder="Search for a place or activity"
          class="bg-transparent text-sm text-slate-900 placeholder-slate-400 outline-none w-full">
      </div>
    </div>
  </div>
</template>

<template>
  <router-link to="/" class="inline-flex items-center gap-3 group focus:outline-none select-none">
    <span
      class="flex shrink-0 items-center justify-center rounded-full border border-[#C5A059]/60 bg-[#12151B] text-xs font-bold tracking-[0.18em] text-[#C5A059] shadow-[0_2px_8px_rgba(0,0,0,0.35)] transition-transform duration-300 group-hover:scale-105"
      :class="sizeClasses.image"
      aria-hidden="true"
    >
      S
    </span>

    <div v-if="showText" class="flex flex-col leading-tight">
      <span class="text-[10px] font-medium uppercase tracking-[0.25em] text-[#C5A059]">SITE</span>
      <span class="text-lg font-bold tracking-wider text-[#F5F3EF] transition-colors group-hover:text-[#C5A059] sm:text-xl">STARTER</span>
      <span class="text-[8px] uppercase tracking-widest text-[#9CA3AF] sm:text-[9px]">SITE INSTITUCIONAL</span>
    </div>
  </router-link>
</template>

<script setup lang="ts">
import { computed } from 'vue'

const props = withDefaults(
  defineProps<{
    size?: 'sm' | 'md' | 'lg' | 'xl'
    showText?: boolean
  }>(),
  {
    size: 'md',
    showText: true,
  },
)

const sizeClasses = computed(() => {
  switch (props.size) {
    case 'sm':
      return { image: 'h-8 w-8 sm:h-9 sm:w-9' }
    case 'lg':
      return { image: 'h-14 w-14 sm:h-16 sm:w-16' }
    case 'xl':
      return { image: 'h-20 w-20 sm:h-24 sm:w-24' }
    case 'md':
    default:
      return { image: 'h-11 w-11 sm:h-12 sm:w-12' }
  }
})
</script>

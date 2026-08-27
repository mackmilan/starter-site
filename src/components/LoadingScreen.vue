<template>
  <div
    :class="[
      fullscreen ? 'fixed inset-0 z-50' : 'relative w-full py-20',
      'flex flex-col items-center justify-center bg-[#080A0C] text-[#E5E7EB] overflow-hidden select-none'
    ]"
  >
    <!-- Ambient Gold Radial Glows in Background -->
    <div class="pointer-events-none absolute inset-0 overflow-hidden">
      <!-- Center Gold Core Glow -->
      <div class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-[#C5A059]/10 rounded-full blur-[120px]"></div>
      <!-- Top Subtle Warm Glow -->
      <div class="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[300px] bg-[#C5A059]/5 rounded-full blur-[140px]"></div>
      <!-- Fine Dot Grid Pattern -->
      <div class="absolute inset-0 opacity-[0.04] bg-[radial-gradient(#C5A059_1px,transparent_1px)] [background-size:24px_24px]"></div>
    </div>

    <!-- Center Content Container -->
    <div class="relative z-10 flex flex-col items-center max-w-md px-6 text-center">
      <!-- Animated Logo Emblem with Pulse Rings -->
      <div class="relative mb-8 flex items-center justify-center">
        <!-- Expanding Radar Waves -->
        <div class="absolute w-28 h-28 sm:w-32 sm:h-32 rounded-full border border-[#C5A059]/30 animate-radar-wave-1"></div>
        <div class="absolute w-28 h-28 sm:w-32 sm:h-32 rounded-full border border-[#C5A059]/20 animate-radar-wave-2"></div>

        <!-- Main Logo Card with Glassmorphism & Gold Glow -->
        <div class="relative w-24 h-24 sm:w-28 sm:h-28 p-2 flex items-center justify-center rounded-full bg-gradient-to-br from-[#1A1D24]/90 via-[#12151B]/90 to-[#0B0D10]/95 border border-[#C5A059]/50 shadow-[0_0_40px_rgba(197,160,89,0.35)] animate-pulse-glow backdrop-blur-md">
          <img
            src="/images/placeholder.svg"
            alt="Site Starter"
            class="w-full h-full object-contain drop-shadow-[0_0_15px_rgba(197,160,89,0.4)]"
          />
        </div>
      </div>

      <!-- Brand Identity -->
      <div class="space-y-2 mb-8">
        <div class="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#1A1D24]/80 border border-[#C5A059]/30 text-[10px] uppercase font-bold tracking-[0.25em] text-[#C5A059]">
          <span class="w-1.5 h-1.5 rounded-full bg-[#C5A059] animate-pulse"></span>
          SITE STARTER
        </div>

        <h2 class="text-2xl sm:text-3xl font-serif tracking-tight loading-shimmer-text">
          Conteúdo & Experiência
        </h2>

        <p class="text-[11px] uppercase tracking-[0.2em] text-[#9CA3AF] font-medium">
          Estrutura para seu site institucional
        </p>
      </div>

      <!-- Luxury Progress Bar -->
      <div class="w-64 sm:w-72 space-y-2">
        <div class="h-1 w-full bg-[#1A1D24] rounded-full overflow-hidden border border-[#C5A059]/20">
          <!-- Determinate or Indeterminate Fill -->
          <div
            v-if="effectiveProgress !== null"
            class="h-full bg-gradient-to-r from-[#936B32] via-[#C5A059] to-[#F5F3EF] rounded-full transition-all duration-300"
            :style="{ width: `${effectiveProgress}%` }"
          ></div>
          <div
            v-else
            class="h-full w-full loading-bar-indeterminate bg-gradient-to-r from-[#936B32]/30 via-[#C5A059]/40 to-[#936B32]/30 rounded-full"
          ></div>
        </div>

        <!-- Optional Progress Percentage -->
        <div v-if="effectiveProgress !== null" class="flex justify-end text-[10px] font-mono text-[#C5A059]">
          {{ effectiveProgress }}%
        </div>
      </div>

      <!-- Rotating Status Message with Smooth Transition -->
      <div class="h-8 mt-5 flex items-center justify-center">
        <transition name="fade" mode="out-in">
          <p
            :key="displayMessage"
            class="text-xs text-[#A0A6B2] font-light tracking-wide italic flex items-center gap-2"
          >
            <span>{{ displayMessage }}</span>
          </p>
        </transition>
      </div>

      <!-- Bottom Tagline -->
      <div class="mt-8 text-[9px] uppercase tracking-[0.3em] text-[#6B7280]">
        Uma base pronta para personalizar
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue'
import { loadingService } from '../services/loading.service'

const props = withDefaults(
  defineProps<{
    message?: string
    progress?: number | null
    fullscreen?: boolean
  }>(),
  {
    message: '',
    progress: null,
    fullscreen: true
  }
)

const displayMessage = computed(() => {
  return props.message || loadingService.currentMessage.value
})

const effectiveProgress = computed(() => {
  if (props.progress !== null) return props.progress
  return loadingService.progress.value
})
</script>

<style scoped>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s ease, transform 0.3s ease;
}

.fade-enter-from {
  opacity: 0;
  transform: translateY(4px);
}

.fade-leave-to {
  opacity: 0;
  transform: translateY(-4px);
}
</style>

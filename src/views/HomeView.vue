<template>
  <LoadingScreen v-if="!homeData" :fullscreen="false" />

  <div v-else class="relative bg-[#0B0D10] text-[#E5E7EB] overflow-hidden">
    <!-- Left Floating Vertical Step Indicator (Desktop) -->
    <div class="hidden xl:flex fixed left-6 top-1/2 -translate-y-1/2 z-40 flex-col items-center space-y-4 text-[10px] text-[#6B7280]">
      <div v-for="step in 10" :key="step" class="flex flex-col items-center group cursor-pointer">
        <span class="font-mono text-[9px] group-hover:text-[#C5A059] transition-colors" :class="step === 1 ? 'text-[#C5A059] font-bold' : ''">
          {{ step < 10 ? `0${step}` : step }}
        </span>
        <div class="w-1 h-3 border-l border-dashed border-[#2B3140] my-0.5 group-hover:border-[#C5A059]"></div>
      </div>
      <div class="pt-2 text-[8px] uppercase tracking-widest text-[#9CA3AF] [writing-mode:vertical-lr] rotate-180">
        ROLAR PARA DESCOBRIR
      </div>
    </div>

    <!-- HERO SECTION -->
    <section class="relative min-h-[90vh] flex items-center pt-12 pb-44 lg:pb-56 overflow-hidden">
      <img
        :src="homeData.hero.image"
        alt="Placeholder visual da página inicial"
        class="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-[#050607] via-[#050607]/70 to-[#050607]/10"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-[#0B0D10] via-transparent to-transparent"></div>

      <div class="relative z-10 w-full px-6 sm:px-10 lg:px-16 xl:px-24 xl:pl-32">
        <div class="max-w-3xl space-y-6">
          <div class="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#1A1D24] border border-[#C5A059]/30 text-xs text-[#C5A059] font-medium tracking-wide">
            <span class="w-2 h-2 rounded-full bg-[#C5A059] animate-pulse"></span>
            {{ homeData.hero.tagline }}
          </div>
          <h1 class="text-4xl sm:text-6xl lg:text-7xl font-serif leading-[1.08] tracking-tight text-[#F5F3EF] whitespace-pre-line">
            {{ homeData.hero.title }}
          </h1>
          <p class="text-lg sm:text-xl text-[#9CA3AF] font-light max-w-xl">
            {{ homeData.hero.subtitle }}
          </p>

          <div class="pt-4 flex items-center gap-4">
            <router-link
              :to="homeData.hero.ctaLink || '/sobre'"
              class="px-8 py-3.5 rounded-full text-xs font-bold uppercase tracking-widest bg-[#C5A059] text-black hover:bg-[#D4AF37] transition-all shadow-lg shadow-[#C5A059]/20 flex items-center gap-2"
            >
      <span>{{ homeData.hero.ctaText || 'CONHECER A ESTRUTURA' }}</span>
              <ArrowRight class="w-4 h-4" />
            </router-link>
          </div>
        </div>
      </div>
    </section>

    <!-- STATEMENT BLOCK 1 -->
    <section v-if="homeData.statements[0]" class="relative z-20 -mt-28 lg:-mt-40 bg-transparent border-b border-[#191D26]">
      <div class="ml-6 sm:ml-16 lg:ml-[18vw] bg-[#F5F3EF] text-[#0B0D10] px-6 sm:px-12 lg:px-16 py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center shadow-2xl shadow-black/35">
        <div class="lg:col-span-7">
          <h2 class="text-4xl sm:text-6xl lg:text-7xl font-serif leading-[0.98] whitespace-pre-line">
            {{ homeData.statements[0].title }}
          </h2>
        </div>
        <div v-if="homeData.statements[0].subtitle" class="lg:col-span-4 lg:col-start-9 border-l border-[#C5A059] pl-6">
          <p class="text-sm text-[#22252C] leading-relaxed">
            {{ homeData.statements[0].subtitle }}
          </p>
        </div>
      </div>
    </section>

    <!-- STATEMENTS 2, 3, 4 WITH DYNAMIC CROPPED LAYOUTS -->
    <section>
      <!-- Banner 2 -->
      <div v-if="homeData.statements[1]" class="relative min-h-[240px] lg:min-h-[280px] overflow-hidden border-b border-[#191D26]">
        <img
          :src="homeData.statements[1].image"
          alt="Placeholder visual de conteúdo"
          class="absolute inset-0 w-full h-full object-cover object-[70%_45%]"
        />
        <div class="absolute inset-0 bg-gradient-to-r from-[#0B0D10] via-[#0B0D10]/80 to-transparent"></div>
        <div class="relative z-10 w-full px-6 sm:px-10 lg:px-16 xl:px-24 min-h-[240px] lg:min-h-[280px] flex items-center">
          <div class="max-w-xl space-y-5">
            <h2 class="text-3xl sm:text-5xl font-serif leading-tight text-[#F5F3EF] whitespace-pre-line">
              {{ homeData.statements[1].title }}
            </h2>
            <div class="w-12 h-px bg-[#F5F3EF]"></div>
          </div>
        </div>
      </div>

      <!-- Banner 3 -->
      <div v-if="homeData.statements[2]" class="grid grid-cols-1 lg:grid-cols-2 min-h-[260px] lg:min-h-[280px] border-b border-[#191D26]">
        <div class="relative min-h-[240px] lg:min-h-[280px] order-2 lg:order-1">
          <img
            :src="homeData.statements[2].image"
            alt="Placeholder visual de conteúdo"
            class="absolute inset-0 w-full h-full object-cover object-[45%_45%]"
          />
        </div>
        <div class="order-1 lg:order-2 bg-[#F5F3EF] text-[#0B0D10] flex items-center px-6 sm:px-12 lg:px-20 py-12 lg:py-10">
          <div class="max-w-xl space-y-5">
            <h2 class="text-3xl sm:text-5xl font-serif leading-tight whitespace-pre-line">
              {{ homeData.statements[2].title }}
            </h2>
            <div class="w-12 h-px bg-[#0B0D10]"></div>
          </div>
        </div>
      </div>

      <!-- Banner 4 -->
      <div v-if="homeData.statements[3]" class="relative min-h-[260px] lg:min-h-[300px] overflow-hidden">
        <img
          :src="homeData.statements[3].image"
          alt="Placeholder visual de conteúdo"
          class="absolute inset-0 w-full h-full object-cover object-[70%_45%]"
        />
        <div class="absolute inset-0 bg-gradient-to-r from-[#0B0D10] via-[#0B0D10]/75 to-transparent"></div>
        <div class="relative z-10 w-full px-6 sm:px-10 lg:px-16 xl:px-24 min-h-[260px] lg:min-h-[300px] flex items-center">
          <div class="max-w-xl space-y-5">
            <h2 class="text-3xl sm:text-5xl font-serif leading-tight text-[#F5F3EF] whitespace-pre-line">
              {{ homeData.statements[3].title }}
            </h2>
            <div class="w-12 h-px bg-[#F5F3EF]"></div>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION: CONHEÇA NOSSA HISTÓRIA & CARDS -->
    <section class="relative py-14 lg:py-16 bg-[#0B0D10] border-t border-b border-[#191D26] overflow-hidden">
      <div class="absolute inset-0 opacity-35">
        <img :src="homeData.historySection.image" alt="" class="w-full h-full object-cover" />
      </div>
      <div class="absolute inset-0 bg-gradient-to-r from-[#0B0D10] via-[#0B0D10]/92 to-[#0B0D10]/70"></div>
      <div class="relative z-10 w-full px-6 sm:px-10 lg:px-16 xl:px-24 grid grid-cols-1 lg:grid-cols-12 gap-10 items-end">
        <div class="lg:col-span-4 space-y-8">
          <div class="space-y-3">
            <span class="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-semibold">{{ homeData.historySection.tagline }}</span>
            <h2 class="text-4xl sm:text-5xl font-serif leading-tight text-[#F5F3EF] whitespace-pre-line">
              {{ homeData.historySection.title }}
            </h2>
          </div>
          <router-link
            :to="homeData.historySection.buttonLink"
            class="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-[#F5F3EF] border border-[#C5A059]/40 hover:bg-[#C5A059] hover:text-black transition-all"
          >
            <span>{{ homeData.historySection.buttonText }}</span>
            <ArrowRight class="w-4 h-4" />
          </router-link>
        </div>

        <!-- 4 Story Cards Grid -->
        <div class="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 border border-[#C5A059]/30 bg-[#0B0D10]/60 backdrop-blur-sm">
          <router-link
            v-for="card in homeData.historyCards"
            :key="card.id"
            :to="card.link"
            class="group relative min-h-[240px] overflow-hidden border-b sm:border-r border-[#C5A059]/20 transition-all duration-300 flex flex-col justify-end"
          >
            <img
              :src="card.image"
              :alt="card.title"
              class="absolute inset-0 w-full h-full object-cover opacity-60 group-hover:opacity-90 group-hover:scale-[1.03] transition-all duration-500"
            />
            <div class="absolute inset-0 bg-gradient-to-t from-[#0B0D10] via-[#0B0D10]/75 to-transparent"></div>
            <div class="relative z-10 p-5 flex flex-col justify-between min-h-[240px] space-y-5">
              <div class="text-4xl font-serif text-[#C5A059]">{{ card.number }}</div>
              <div>
                <h3 class="text-xs font-bold uppercase tracking-widest text-[#C5A059] mb-1">{{ card.title }}</h3>
                <p class="text-xs text-[#9CA3AF] line-clamp-2 leading-relaxed">{{ card.description }}</p>
              </div>
              <div class="flex items-center justify-end text-[#C5A059] group-hover:translate-x-1 transition-transform">
                <ArrowRight class="w-4 h-4" />
              </div>
            </div>
          </router-link>
        </div>
      </div>
    </section>

    <!-- SECTION: NOSSO IMPACTO -->
    <section class="relative py-20 lg:py-24 bg-[#12151B] overflow-hidden">
      <div class="absolute inset-x-0 bottom-0 h-72 opacity-45">
        <img :src="homeData.ctaBanner.image" alt="" class="w-full h-full object-cover object-left-bottom" />
      </div>
      <div class="absolute inset-0 bg-gradient-to-r from-[#0B0D10] via-[#12151B]/95 to-[#0B0D10]/80"></div>
      <div class="relative z-10 w-full px-6 sm:px-10 lg:px-16 xl:px-24 grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        <div class="lg:col-span-7">
          <span class="block text-xs uppercase tracking-[0.25em] text-[#C5A059] font-semibold mb-10">{{ homeData.impactSection.tagline }}</span>

          <div class="grid grid-cols-2 lg:grid-cols-4 gap-y-10">
            <div
              v-for="stat in homeData.impactStats"
              :key="stat.label"
              class="px-5 first:pl-0 border-l first:border-l-0 border-[#C5A059]/30"
            >
              <div class="mb-5 text-[#C5A059]">
                <component :is="getIcon(stat.iconName)" class="w-9 h-9" />
              </div>
              <div class="text-4xl sm:text-5xl font-serif text-[#F5F3EF]">
                {{ stat.value }}
              </div>
              <div class="mt-2 text-[11px] font-bold uppercase tracking-widest text-[#B8BDC7] max-w-[11rem]">
                {{ stat.label }}
              </div>
            </div>
          </div>
        </div>

        <div class="lg:col-span-5 space-y-6">
          <span class="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-semibold">{{ homeData.ctaBanner.tagline }}</span>
          <h2 class="text-3xl sm:text-5xl font-serif leading-tight text-[#F5F3EF] whitespace-pre-line">
            {{ homeData.ctaBanner.title }}
          </h2>
          <div class="pt-2">
            <router-link
              :to="homeData.ctaBanner.buttonLink || '/apoie'"
              class="inline-flex items-center gap-3 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest bg-[#C5A059] text-black hover:bg-[#D4AF37] transition-all shadow-xl shadow-[#C5A059]/20"
            >
              <span>{{ homeData.ctaBanner.buttonText }}</span>
              <Heart class="w-4 h-4 fill-current" />
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ArrowRight, Heart, Users, Building2, Globe } from 'lucide-vue-next'
import LoadingScreen from '../components/LoadingScreen.vue'
import { homeService } from '../services/home.service'
import type { HomeData } from '../models/home.model'

const homeData = ref<HomeData | null>(null)

function getIcon(name: string) {
  switch (name) {
    case 'Users': return Users
    case 'Heart': return Heart
    case 'Building2': return Building2
    case 'Globe': return Globe
    default: return Users
  }
}

onMounted(async () => {
  const { data, metaTitle } = await homeService.fetchHomeData()
  homeData.value = data
  if (metaTitle) {
    document.title = metaTitle
  }
})
</script>

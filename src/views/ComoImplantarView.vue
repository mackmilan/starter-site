<template>
  <div class="bg-[#0B0D10] text-[#E5E7EB] overflow-hidden">
    <!-- HERO SECTION -->
    <section class="relative min-h-[78vh] flex items-center py-20 border-b border-[#191D26] overflow-hidden">
      <img :src="data.hero.image" alt="Placeholder visual da implementação" class="absolute inset-0 w-full h-full object-cover object-center" />
      <div class="absolute inset-0 bg-gradient-to-r from-[#050607] via-[#050607]/76 to-[#050607]/12"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-[#0B0D10]/65 via-transparent to-transparent"></div>
      <div class="relative z-10 w-full px-6 sm:px-10 lg:px-16 xl:px-24">
        <div class="max-w-2xl space-y-6">
          <span class="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-semibold">{{ data.hero.tagline }}</span>
          <h1 class="text-4xl sm:text-6xl font-serif leading-tight text-[#F5F3EF] whitespace-pre-line">
            {{ data.hero.title }}
          </h1>
          <p class="text-base sm:text-lg text-[#9CA3AF] font-light leading-relaxed max-w-xl">
            {{ data.hero.description }}
          </p>

          <!-- 4 Pillars Icons -->
          <div class="grid grid-cols-2 gap-4 pt-4">
            <div
              v-for="p in data.hero.pillars"
              :key="p.title"
              class="flex items-center gap-3 border-l border-[#C5A059]/40 pl-4 py-2 text-xs font-semibold text-[#F5F3EF]"
            >
              <component :is="getPillarIcon(p.iconName)" class="w-4 h-4 text-[#C5A059] shrink-0" />
              <span>{{ p.title }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- NOSSO LIVRO SECTION -->
    <section class="bg-[#F5F3EF] text-[#0B0D10] border-b border-[#191D26]">
      <div class="w-full px-6 sm:px-10 lg:px-16 xl:px-24 py-14 lg:py-16 space-y-6">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
          <!-- Text Left -->
          <div class="lg:col-span-4 space-y-5 py-2">
            <span class="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-semibold">{{ data.bookSection.tagline }}</span>
            <h2 class="text-3xl sm:text-5xl font-serif whitespace-pre-line">
              {{ data.bookSection.title }}
            </h2>
            <p class="text-sm text-[#22252C] leading-relaxed">
              {{ data.bookSection.subtitle }}
            </p>
            <p class="text-xs text-[#22252C] leading-relaxed">
              {{ data.bookSection.description }}
            </p>

            <ul class="space-y-2.5 pt-2">
              <li v-for="t in data.bookSection.topics" :key="t.text" class="flex items-center gap-3 text-xs text-[#22252C]">
                <span class="w-2 h-2 rounded-full bg-[#C5A059]"></span>
                <span>{{ t.text }}</span>
              </li>
            </ul>

            <div class="pt-4">
              <router-link
                :to="data.bookSection.buttonLink || '/contato'"
                class="inline-flex items-center gap-2 px-6 py-3 rounded-full text-xs font-bold uppercase tracking-wider text-[#0B0D10] border border-[#C5A059]/60 hover:bg-[#C5A059] transition-all"
              >
                <span>{{ data.bookSection.buttonText || 'QUERO RECEBER NOVIDADES DO LIVRO' }}</span>
                <ArrowRight class="w-4 h-4" />
              </router-link>
            </div>
          </div>

          <!-- Book Cover + Side Photos Right -->
          <div class="lg:col-span-8 grid grid-cols-1 sm:grid-cols-5 gap-3">
            <div class="sm:col-span-2 min-h-[360px] overflow-hidden">
              <img :src="data.bookSection.bookCoverImage" alt="Placeholder visual do conteúdo" class="w-full h-full object-cover object-center" />
            </div>
            <div class="sm:col-span-3 grid grid-rows-2 gap-3 min-h-[360px]">
              <div class="overflow-hidden">
                <img :src="data.bookSection.roomImage" alt="Reunião de trabalho" class="w-full h-full object-cover" />
              </div>
              <div class="overflow-hidden">
                <img :src="data.bookSection.writingImage" alt="Escrita do livro" class="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>

        <!-- 6 Gallery Strip Photos -->
        <div class="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-2">
          <div
            v-for="(img, idx) in data.bookSection.galleryStripImages"
            :key="idx"
            class="h-24 overflow-hidden border border-[#C5A059]/20 hover:border-[#C5A059] transition-colors"
          >
            <img :src="img" :alt="`Galeria implantação ${idx+1}`" class="w-full h-full object-cover" />
          </div>
        </div>
      </div>
    </section>

    <!-- ETAPAS PARA IMPLANTAÇÃO (6 STEPS) -->
    <section class="relative py-14 lg:py-16 bg-[#0E1014] border-b border-[#191D26] overflow-hidden">
      <div class="absolute inset-0 opacity-35">
        <img :src="data.bookSection.galleryStripImages[3]" alt="" class="w-full h-full object-cover" />
      </div>
      <div class="absolute inset-0 bg-gradient-to-r from-[#062017] via-[#0B0D10]/88 to-[#062017]"></div>
      <div class="relative z-10 w-full px-6 sm:px-10 lg:px-16 xl:px-24 space-y-10">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div class="lg:col-span-5 space-y-3">
            <span class="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-semibold">{{ data.stepsSection.tagline }}</span>
            <h2 class="text-3xl sm:text-5xl font-serif text-[#F5F3EF] whitespace-pre-line">
              {{ data.stepsSection.title }}
            </h2>
          </div>
          <div class="lg:col-span-5 lg:col-start-8">
            <p class="text-xs text-[#9CA3AF] max-w-xl mx-auto">
              {{ data.stepsSection.description }}
            </p>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 border border-[#C5A059]/40 bg-[#0B0D10]/40 backdrop-blur-sm">
          <div
            v-for="step in data.stepsSection.steps"
            :key="step.number"
            class="relative min-h-[210px] p-5 border-b sm:border-r border-[#C5A059]/30 space-y-4 hover:bg-[#C5A059]/5 transition-colors"
          >
            <div class="flex flex-col items-center text-center gap-3">
              <div class="w-11 h-11 rounded-full bg-[#0B0D10] border border-[#C5A059] flex items-center justify-center text-[#C5A059]">
                <component :is="getStepIcon(step.iconName)" class="w-5 h-5" />
              </div>
              <span class="text-sm font-mono font-bold text-[#C5A059] border border-[#C5A059]/50 rounded-full px-2 py-1">{{ step.number }}</span>
              <h3 class="text-sm font-bold text-[#F5F3EF]">{{ step.title }}</h3>
              <p class="text-xs text-[#9CA3AF] leading-relaxed">{{ step.description }}</p>
            </div>
          </div>
        </div>

        <div class="text-center pt-4">
          <router-link
            :to="data.stepsSection.buttonLink || '/contato'"
            class="inline-flex items-center gap-3 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest bg-[#C5A059] text-black hover:bg-[#D4AF37] transition-all shadow-xl shadow-[#C5A059]/20"
          >
            <span>{{ data.stepsSection.buttonText || 'FALE CONOSCO E SAIBA COMO IMPLANTAR' }}</span>
            <ArrowRight class="w-4 h-4" />
          </router-link>
        </div>
      </div>
    </section>

    <!-- BOTTOM CTA BANNER -->
    <section class="relative min-h-[260px] lg:min-h-[300px] bg-[#12151B] overflow-hidden">
        <img :src="data.ctaBanner.backgroundImage" alt="Placeholder visual do contato" class="absolute inset-0 w-full h-full object-cover object-left-center" />
      <div class="absolute inset-0 bg-gradient-to-r from-[#0B0D10]/30 via-[#0B0D10]/82 to-[#0B0D10]"></div>
      <div class="relative z-10 w-full px-6 sm:px-10 lg:px-16 xl:px-24 min-h-[260px] lg:min-h-[300px] grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div class="lg:col-span-7">
          <blockquote class="text-2xl sm:text-4xl font-serif text-[#F5F3EF] leading-snug max-w-3xl">
            “{{ data.ctaBanner.quote }}”
          </blockquote>
        </div>
        <div class="lg:col-span-4 lg:col-start-9">
          <div class="p-6 bg-[#0B0D10]/72 border border-[#C5A059]/40 space-y-4">
            <h3 class="text-xs font-bold text-[#F5F3EF] uppercase tracking-wider">{{ data.ctaBanner.cardTitle }}</h3>
            <router-link
              :to="data.ctaBanner.cardButtonLink || '/contato'"
              class="w-full py-3 rounded-full text-center text-xs font-bold uppercase tracking-wider text-black bg-[#C5A059] hover:bg-[#D4AF37] transition-all flex items-center justify-center gap-2"
            >
              <span>{{ data.ctaBanner.cardButtonText }}</span>
              <ArrowRight class="w-4 h-4" />
            </router-link>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Award, HeartHandshake, Target, Shield, ArrowRight, Search, ClipboardList, Users, Building, TrendingUp } from 'lucide-vue-next'
import { comoImplantarService } from '../services/como-implantar.service'
import type { ComoImplantarData } from '../models/como-implantar.model'

const data = ref<ComoImplantarData>(comoImplantarService.getComoImplantarData())

function getPillarIcon(name: string) {
  switch (name) {
    case 'Award': return Award
    case 'HeartHandshake': return HeartHandshake
    case 'Target': return Target
    case 'Shield': return Shield
    default: return Award
  }
}

function getStepIcon(name: string) {
  switch (name) {
    case 'Search': return Search
    case 'ClipboardList': return ClipboardList
    case 'Users': return Users
    case 'Building': return Building
    case 'TrendingUp': return TrendingUp
    default: return Search
  }
}

onMounted(async () => {
  const { data: fetchedData, metaTitle } = await comoImplantarService.fetchComoImplantarData()
  data.value = fetchedData
  if (metaTitle) {
    document.title = metaTitle
  }
})
</script>

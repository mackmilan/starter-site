<template>
  <div class="bg-[#0B0D10] text-[#E5E7EB] overflow-hidden">
    <!-- HERO SECTION -->
    <section class="relative min-h-[78vh] flex items-center py-20 border-b border-[#191D26] overflow-hidden">
      <img :src="data.hero.image" alt="Fundamentação científica" class="absolute inset-0 w-full h-full object-cover object-center" />
      <div class="absolute inset-0 bg-gradient-to-r from-[#050607] via-[#050607]/72 to-[#050607]/10"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-[#0B0D10]/65 via-transparent to-transparent"></div>
      <div class="relative z-10 w-full px-6 sm:px-10 lg:px-16 xl:px-24">
        <div class="max-w-2xl space-y-6">
          <span class="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-semibold">{{ data.hero.tagline }}</span>
          <h1 class="text-4xl sm:text-6xl font-serif leading-tight text-[#F5F3EF] whitespace-pre-line">
            {{ data.hero.title }}
          </h1>
          <p class="text-base sm:text-lg text-[#D1D5DB] font-light leading-relaxed max-w-xl">
            {{ data.hero.subtitle }}
          </p>
          <p class="text-sm text-[#9CA3AF] leading-relaxed max-w-xl">
            {{ data.hero.description }}
          </p>
        </div>
      </div>
    </section>

    <!-- SECTION: POR QUE O MÉTODO FAZ DIFERENÇA? -->
    <section class="bg-[#F5F3EF] text-[#0B0D10] border-b border-[#191D26]">
      <div class="w-full px-6 sm:px-10 lg:px-16 xl:px-24 py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div class="lg:col-span-4 space-y-5">
          <h2 class="text-4xl sm:text-5xl font-serif leading-tight whitespace-pre-line">
            {{ data.whyMethodSection?.title || 'Por que o método faz diferença?' }}
          </h2>
          <div class="w-12 h-px bg-[#C5A059]"></div>
          <p class="text-sm text-[#22252C] leading-relaxed">
            {{ data.whyMethodSection?.description }}
          </p>
        </div>

        <div class="lg:col-span-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4">
          <div
            v-for="pillar in data.whyMethodPillars"
            :key="pillar.title"
            class="px-8 py-4 border-l border-[#C5A059]/25 space-y-5"
          >
            <div class="text-[#C5A059]">
              <component :is="getIcon(pillar.iconName)" class="w-11 h-11" />
            </div>
            <h3 class="text-xs font-bold uppercase tracking-widest text-[#0B0D10]">{{ pillar.title }}</h3>
            <p class="text-xs text-[#22252C] leading-relaxed">{{ pillar.description }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- SECTION: PILARES DA FUNDAMENTAÇÃO (6 CARDS) -->
    <section class="py-14 lg:py-16 bg-[#0E1014] border-b border-[#191D26]">
      <div class="w-full px-6 sm:px-10 lg:px-16 xl:px-24">
        <div class="flex flex-col sm:flex-row sm:items-end justify-between mb-10 gap-6">
          <div class="space-y-3">
            <span class="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-semibold">{{ data.studiesSection?.tagline || 'PILARES DA FUNDAMENTAÇÃO' }}</span>
            <h2 class="text-3xl sm:text-5xl font-serif text-[#F5F3EF] whitespace-pre-line">
              {{ data.studiesSection?.title || 'Conhecimento que guia cada passo.' }}
            </h2>
          </div>
        </div>

        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 border border-[#C5A059]/25">
          <div
            v-for="card in data.studyCards"
            :key="card.id"
            class="group relative min-h-[330px] overflow-hidden border-b sm:border-r border-[#C5A059]/20 hover:border-[#C5A059] transition-all duration-300 flex flex-col justify-end"
          >
            <img :src="card.image" :alt="card.category" class="absolute inset-0 w-full h-full object-cover opacity-55 group-hover:opacity-85 group-hover:scale-[1.03] transition-all duration-500" />
            <div class="absolute inset-0 bg-gradient-to-t from-[#0B0D10] via-[#0B0D10]/74 to-transparent"></div>
            <div class="relative z-10 p-5 space-y-3">
              <div class="text-3xl font-serif text-[#F5F3EF]">{{ card.number }}</div>
              <h3 class="text-xs font-bold uppercase tracking-widest text-[#C5A059]">{{ card.category }}</h3>
              <p class="text-xs text-[#9CA3AF] leading-relaxed">{{ card.description }}</p>
              <div class="pt-2 flex justify-end">
                <ArrowRight class="w-4 h-4 text-[#C5A059] group-hover:translate-x-1 transition-transform" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- EVIDÊNCIAS QUE TRANSFORMAM + QUOTE WITH BOOKS IMAGE -->
    <section class="bg-[#F5F3EF] text-[#0B0D10] border-b border-[#191D26]">
      <div class="grid grid-cols-1 lg:grid-cols-2">
        <!-- Stats Left -->
        <div class="px-6 sm:px-12 lg:px-16 py-14 lg:py-16 space-y-10">
          <div>
            <span class="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-semibold">{{ data.evidenceSection?.tagline || 'EVIDÊNCIAS QUE TRANSFORMAM' }}</span>
            <h2 class="text-3xl sm:text-5xl font-serif mt-2 whitespace-pre-line">
              {{ data.evidenceSection?.title || 'A ciência comprova.\nA prática confirma.' }}
            </h2>
          </div>

          <div class="grid grid-cols-2 gap-8">
            <div v-for="stat in data.evidenceStats" :key="stat.label" class="space-y-2">
              <div class="text-4xl font-serif font-bold text-[#C5A059]">{{ stat.value }}</div>
              <div class="text-xs text-[#22252C] uppercase tracking-wider leading-relaxed">{{ stat.label }}</div>
            </div>
          </div>
        </div>

        <!-- Quote Card Right -->
        <div class="relative min-h-[360px] flex items-center justify-center p-8 text-center overflow-hidden group">
          <img :src="data.quoteSection.image" alt="Livros de estudo" class="absolute inset-0 w-full h-full object-cover group-hover:scale-[1.03] transition-transform duration-700" />
          <div class="absolute inset-0 bg-gradient-to-r from-transparent via-[#0B0D10]/20 to-[#0B0D10]/80"></div>
          <div class="relative z-10 ml-auto mr-8 space-y-4 max-w-xs bg-[#0B0D10]/72 border border-[#C5A059]/20 p-8">
            <span class="text-5xl font-serif text-[#C5A059] leading-none">“</span>
            <p class="text-xl sm:text-2xl font-serif italic text-[#F5F3EF]">
              {{ data.quoteSection.quote }}
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- BOTTOM TRUST BANNER -->
    <section class="relative min-h-[320px] lg:min-h-[360px] bg-[#0E1014] overflow-hidden">
      <img :src="data.trustBanner.image" alt="Placeholder visual de confiança" class="absolute inset-0 w-full h-full object-cover object-[42%_center]" />
      <div class="absolute inset-0 bg-gradient-to-r from-[#0B0D10]/30 via-[#0B0D10]/78 to-[#0B0D10]"></div>
      <div class="relative z-10 w-full px-6 sm:px-10 lg:px-16 xl:px-24 min-h-[320px] lg:min-h-[360px] flex items-center">
        <div class="max-w-xl space-y-6">
          <span class="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-semibold">{{ data.trustBanner.tagline }}</span>
          <h2 class="text-3xl sm:text-5xl font-serif text-[#F5F3EF] whitespace-pre-line">
            {{ data.trustBanner.title }}
          </h2>
          <p class="text-sm text-[#9CA3AF] leading-relaxed max-w-lg">
            {{ data.trustBanner.description }}
          </p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ArrowRight, Brain, Heart, Shield, Users, FileText, Building2, Globe } from 'lucide-vue-next'
import { fundamentacaoService } from '../services/fundamentacao.service'
import type { FundamentacaoData } from '../models/fundamentacao.model'

const data = ref<FundamentacaoData>(fundamentacaoService.getFundamentacaoData())

function getIcon(name: string) {
  switch (name) {
    case 'Brain': return Brain
    case 'Heart': return Heart
    case 'Shield': return Shield
    case 'Users': return Users
    case 'FileText': return FileText
    case 'Building2': return Building2
    case 'Globe': return Globe
    default: return Brain
  }
}

onMounted(async () => {
  const { data: fetchedData, metaTitle } = await fundamentacaoService.fetchFundamentacaoData()
  data.value = fetchedData
  if (metaTitle) {
    document.title = metaTitle
  }
})
</script>

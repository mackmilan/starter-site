<template>
  <div class="bg-[#0B0D10] text-[#E5E7EB] overflow-hidden">
    <!-- HERO SECTION -->
    <section class="relative min-h-[78vh] flex items-center py-20 border-b border-[#191D26] overflow-hidden">
      <img
        :src="sobreData.hero.image"
        alt="Placeholder visual da organização"
        class="absolute inset-0 w-full h-full object-cover object-center"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-[#050607] via-[#050607]/75 to-[#050607]/10"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-[#0B0D10]/70 via-transparent to-transparent"></div>
      <div class="relative z-10 w-full px-6 sm:px-10 lg:px-16 xl:px-24 xl:pl-24">
        <div class="max-w-2xl space-y-6">
          <span class="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-semibold">{{ sobreData.hero.tagline }}</span>
          <h1 class="text-4xl sm:text-6xl font-serif leading-tight text-[#F5F3EF] whitespace-pre-line">
            {{ sobreData.hero.title }}
          </h1>
          <p class="text-base sm:text-lg text-[#D1D5DB] font-light leading-relaxed max-w-xl">
            {{ sobreData.hero.subtitle }}
          </p>
          <p class="text-sm text-[#9CA3AF] leading-relaxed max-w-xl">
            {{ sobreData.hero.description }}
          </p>
        </div>
      </div>
    </section>

    <!-- NOSSA ESSÊNCIA (Missão, Visão, Valores) -->
    <section class="bg-[#F5F3EF] text-[#0B0D10] border-b border-[#191D26]">
      <div class="w-full px-6 sm:px-10 lg:px-16 xl:px-24 py-16 lg:py-20 grid grid-cols-1 lg:grid-cols-12 gap-10">
        <div class="lg:col-span-4 space-y-4">
          <span class="text-xs uppercase tracking-[0.25em] text-[#22252C] font-semibold">{{ sobreData.essence.tagline || 'NOSSA' }}</span>
          <h2 class="text-5xl sm:text-6xl font-serif leading-none">{{ sobreData.essence.title }}</h2>
          <div class="w-12 h-px bg-[#C5A059]"></div>
          <p class="text-sm text-[#22252C] leading-relaxed max-w-sm">
            {{ sobreData.essence.description }}
          </p>
        </div>

        <div class="lg:col-span-8 grid grid-cols-1 md:grid-cols-3">
          <div
            v-for="pillar in sobreData.essence.pillars"
            :key="pillar.title"
            class="px-8 py-4 border-l border-[#C5A059]/25 space-y-5"
          >
            <div class="text-[#C5A059]">
              <component :is="getIcon(pillar.iconName)" class="w-10 h-10" />
            </div>
            <h3 class="text-xs font-bold uppercase tracking-widest text-[#0B0D10]">{{ pillar.title }}</h3>
            <p v-if="pillar.description" class="text-xs text-[#22252C] leading-relaxed">
              {{ pillar.description }}
            </p>
            <ul v-if="pillar.items && pillar.items.length" class="space-y-1.5 text-xs text-[#22252C]">
              <li v-for="val in pillar.items" :key="val" class="flex items-center gap-2">
                <span class="w-1.5 h-1.5 rounded-full bg-[#C5A059]"></span>
                <span>{{ val }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>

    <!-- LINHA DO TEMPO -->
    <section class="relative py-14 lg:py-16 bg-[#0E1014] border-b border-[#191D26] overflow-hidden">
      <div class="absolute inset-0 opacity-35">
        <img :src="sobreData.timeline.events[0].image" alt="" class="w-full h-full object-cover" />
      </div>
      <div class="absolute inset-0 bg-gradient-to-r from-[#0B0D10] via-[#0B0D10]/88 to-[#0B0D10]/65"></div>
      <div class="relative z-10 w-full px-6 sm:px-10 lg:px-16 xl:px-24 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div class="lg:col-span-4 space-y-4">
          <span class="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-semibold">{{ sobreData.timeline.tagline }}</span>
          <h2 class="text-3xl sm:text-5xl font-serif text-[#F5F3EF] whitespace-pre-line">
            {{ sobreData.timeline.title }}
          </h2>
          <p class="text-sm text-[#9CA3AF]">{{ sobreData.timeline.description }}</p>
        </div>

        <div class="lg:col-span-8 grid grid-cols-1 sm:grid-cols-5 border border-[#C5A059]/25 bg-[#0B0D10]/55 backdrop-blur-sm">
          <div
            v-for="evt in sobreData.timeline.events"
            :key="evt.year + evt.title"
            class="relative min-h-[220px] overflow-hidden border-b sm:border-r border-[#C5A059]/20 p-5 flex flex-col justify-end hover:border-[#C5A059]/60 transition-colors"
          >
            <img :src="evt.image" :alt="evt.title" class="absolute inset-0 w-full h-full object-cover opacity-35" />
            <div class="absolute inset-0 bg-gradient-to-t from-[#0B0D10] via-[#0B0D10]/75 to-transparent"></div>
            <div class="relative z-10 space-y-2">
              <span class="text-xl font-mono font-bold text-[#C5A059]">{{ evt.year }}</span>
              <h3 class="text-sm font-bold text-[#F5F3EF]">{{ evt.title }}</h3>
              <p class="text-xs text-[#9CA3AF] leading-relaxed">{{ evt.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- NOSSA EQUIPE -->
    <section class="py-16 lg:py-20 bg-[#F5F3EF] text-[#0B0D10] border-b border-[#191D26]">
      <div class="w-full px-6 sm:px-10 lg:px-16 xl:px-24">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start mb-12">
          <div class="space-y-3 max-w-2xl">
            <span class="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-semibold">{{ sobreData.team.tagline }}</span>
            <h2 class="text-4xl sm:text-5xl font-serif">{{ sobreData.team.title }}</h2>
          </div>
          <div class="lg:col-start-7 lg:col-span-6">
            <p class="text-sm text-[#22252C] leading-relaxed">{{ sobreData.team.description }}</p>
          </div>
        </div>

        <!-- 6 Team Photos Grid -->
        <div class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-6 gap-4">
          <div
            v-for="member in sobreData.team.members"
            :key="member.id"
            class="bg-[#0B0D10] overflow-hidden border border-[#C5A059]/20 group hover:border-[#C5A059] transition-all duration-300"
          >
            <div class="h-56 overflow-hidden relative">
              <img :src="member.image" :alt="member.role" class="w-full h-full object-cover object-top group-hover:scale-[1.03] transition-transform duration-500" />
            </div>
            <div class="p-4 space-y-2">
              <h3 class="text-xs font-bold uppercase tracking-widest text-[#C5A059]">{{ member.role }}</h3>
              <p class="text-xs text-[#9CA3AF] leading-relaxed">{{ member.description }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- NOSSO COMPROMISSO -->
    <section class="grid grid-cols-1 lg:grid-cols-2 bg-[#0E1014] border-b border-[#191D26]">
      <div class="relative min-h-[220px] lg:min-h-[300px] overflow-hidden">
        <img :src="sobreData.commitment.image" alt="Nosso compromisso" class="absolute inset-0 w-full h-full object-cover object-left-center" />
        <div class="absolute inset-0 bg-gradient-to-r from-transparent to-[#0E1014]/20"></div>
      </div>
      <div class="min-h-[260px] lg:min-h-[300px] flex items-center px-6 sm:px-12 lg:px-16 py-12 bg-[#0B0D10]">
        <div class="max-w-2xl space-y-5">
          <span class="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-semibold">{{ sobreData.commitment.tagline }}</span>
          <h2 class="text-3xl sm:text-5xl font-serif text-[#F5F3EF] leading-tight whitespace-pre-line">
            {{ sobreData.commitment.title }}
          </h2>
          <p class="text-sm sm:text-base text-[#9CA3AF] leading-relaxed max-w-xl">
            {{ sobreData.commitment.description }}
          </p>
        </div>
      </div>
    </section>

    <!-- FOOTER BANNER CTA -->
    <section class="relative min-h-[300px] lg:min-h-[360px] bg-[#12151B] overflow-hidden">
      <img :src="sobreData.joinUsBanner.image" alt="Faça parte desta história" class="absolute inset-0 w-full h-full object-cover object-[70%_center]" />
      <div class="absolute inset-0 bg-gradient-to-r from-[#0B0D10] via-[#0B0D10]/58 to-[#0B0D10]/10"></div>
      <div class="relative z-10 w-full px-6 sm:px-10 lg:px-16 xl:px-24 min-h-[300px] lg:min-h-[360px] flex items-center">
        <div class="max-w-xl space-y-6">
          <span class="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-semibold">{{ sobreData.joinUsBanner.tagline }}</span>
          <h2 class="text-3xl sm:text-5xl font-serif text-[#F5F3EF] whitespace-pre-line">
            {{ sobreData.joinUsBanner.title }}
          </h2>
          <p class="text-sm text-[#9CA3AF] leading-relaxed max-w-md">
            {{ sobreData.joinUsBanner.description }}
          </p>
          <div>
            <router-link
              :to="sobreData.joinUsBanner.buttonLink || '/apoie'"
              class="inline-flex items-center gap-3 px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest bg-[#C5A059] text-black hover:bg-[#D4AF37] transition-all shadow-xl shadow-[#C5A059]/20"
            >
              <span>{{ sobreData.joinUsBanner.buttonText || 'ENTRE EM CONTATO' }}</span>
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
import { Heart, Eye, Star } from 'lucide-vue-next'
import { sobreService } from '../services/sobre.service'
import type { SobreData } from '../models/sobre.model'

const sobreData = ref<SobreData>(sobreService.getSobreData())

function getIcon(name: string) {
  switch (name) {
    case 'Heart': return Heart
    case 'Eye': return Eye
    case 'Star': return Star
    default: return Star
  }
}

onMounted(async () => {
  const { data, metaTitle } = await sobreService.fetchSobreData()
  sobreData.value = data
  if (metaTitle) {
    document.title = metaTitle
  }
})
</script>

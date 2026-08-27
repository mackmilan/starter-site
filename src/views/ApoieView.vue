<template>
  <div class="bg-[#0B0D10] text-[#E5E7EB] overflow-hidden">
    <!-- HERO SECTION -->
    <section class="relative min-h-[460px] lg:min-h-[520px] flex items-center border-b border-[#191D26]">
      <img
        :src="data.hero.image"
        alt="Placeholder visual da página de apoio"
        class="absolute inset-0 h-full w-full object-cover object-[58%_center]"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-[#0B0D10] via-[#0B0D10]/72 to-[#0B0D10]/10"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-[#0B0D10]/25 via-transparent to-[#0B0D10]/10"></div>
      <div class="relative z-10 w-full px-6 sm:px-10 lg:px-16 xl:px-24 py-20">
        <div class="max-w-[560px] space-y-6">
          <span class="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-semibold">{{ data.hero.tagline }}</span>
          <h1 class="text-5xl sm:text-6xl lg:text-7xl font-serif text-[#F5F3EF] leading-[0.98] whitespace-pre-line">
            {{ data.hero.title }}
          </h1>
          <p class="text-sm sm:text-base text-[#F5F3EF] max-w-md leading-relaxed">
            {{ data.hero.description }}
          </p>

          <div class="pt-2 flex flex-col sm:flex-row items-start gap-5">
            <a
              href="#formas-de-apoiar"
              class="w-full sm:w-auto px-8 py-4 rounded-full text-xs font-bold uppercase tracking-widest bg-[#C5A059] text-black hover:bg-[#D4AF37] transition-all flex items-center justify-center gap-3 shadow-xl shadow-[#C5A059]/20"
            >
              <span>{{ data.hero.ctaText }}</span>
              <Heart class="w-4 h-4 fill-current" />
            </a>
            <a href="#formas-de-apoiar" class="inline-flex items-center gap-3 text-[10px] font-bold uppercase tracking-widest text-[#D9B45F] pt-4">
              <ArrowDown class="w-4 h-4 rounded-full border border-[#C5A059]/50 p-0.5" />
              <span>{{ data.hero.scrollText }}</span>
            </a>
          </div>
        </div>
      </div>
    </section>

    <!-- FORMAS DE APOIAR SECTION -->
    <section id="formas-de-apoiar" class="py-12 lg:py-16 bg-[#F5F3EF] text-[#0B0D10] border-b border-[#D7D0C4]">
      <div class="w-full px-6 sm:px-10 lg:px-16 xl:px-24 space-y-10">
        <div class="flex items-center justify-center gap-4">
          <div class="h-px w-10 bg-[#C5A059]"></div>
          <h2 class="text-2xl sm:text-3xl font-serif text-[#0B0D10]">{{ data.supportSection?.title || 'Formas de apoiar' }}</h2>
          <div class="h-px w-10 bg-[#C5A059]"></div>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-0 border-y border-[#D7D0C4]">
          <div
            v-for="opt in data.supportOptions"
            :key="opt.id"
            class="px-6 py-8 lg:px-8 bg-transparent border-[#D7D0C4] space-y-5 flex flex-col items-center text-center justify-between transition-all duration-300"
            :class="[
              opt.primary
                ? 'lg:border-r'
                : 'border-t md:border-t-0 lg:border-r last:border-r-0'
            ]"
          >
            <div class="space-y-4 flex flex-col items-center">
              <div class="w-14 h-14 rounded-full flex items-center justify-center text-white"
                :class="opt.primary || opt.id === 'sponsor' ? 'bg-[#0C3323]' : 'bg-[#B99049]'"
              >
                <component :is="getOptIcon(opt.iconName)" class="w-6 h-6" />
              </div>
              <h3 class="text-xs font-bold uppercase tracking-widest text-[#0B0D10]">{{ opt.title }}</h3>
              <p class="text-xs text-[#3D382F] leading-relaxed max-w-[210px]">{{ opt.subtitle }}</p>

              <!-- Optional details configured by the project -->
              <div v-if="opt.extraDetails?.pixKey" class="text-center space-y-1">
                <span class="text-[10px] text-[#6F6556] uppercase">Chave PIX (CNPJ):</span>
                <p class="text-xs font-mono font-bold text-[#0B0D10]">{{ opt.extraDetails.pixKey }}</p>
              </div>

              <div v-if="opt.extraDetails?.bankName" class="text-xs space-y-1 text-[#3D382F]">
                <p><strong class="text-[#0B0D10]">{{ opt.extraDetails.bankName }}</strong></p>
                <p>Agência: {{ opt.extraDetails.agency }}</p>
                <p>Conta: {{ opt.extraDetails.account }}</p>
              </div>
            </div>

            <div>
              <button
                @click="handleAction(opt)"
                class="w-full px-6 py-3 rounded-md text-[10px] font-bold uppercase tracking-wider transition-all flex items-center justify-center gap-2 border"
                :class="[
                  opt.primary
                    ? 'bg-[#0C3323] text-white border-[#0C3323] hover:bg-[#124A33]'
                    : 'bg-transparent text-[#0B0D10] border-[#B99049] hover:bg-[#C5A059] hover:text-black'
                ]"
              >
                <span>{{ copiedId === opt.id ? 'COPIADO!' : opt.buttonText }}</span>
                <Copy v-if="opt.id === 'pix'" class="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- PROJETOS EM ANDAMENTO & METAS -->
    <section class="relative py-20 lg:py-24 bg-[#082319] border-b border-[#183B2C] overflow-hidden">
      <div class="absolute inset-0 opacity-[0.08] bg-[radial-gradient(circle_at_center,#C5A059_1px,transparent_1px)] [background-size:22px_22px]"></div>
      <div class="relative z-10 w-full px-6 sm:px-10 lg:px-16 xl:px-24 grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        <div class="lg:col-span-3 space-y-4">
          <span class="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-semibold">{{ data.projectsSection?.tagline || 'PROJETOS EM ANDAMENTO' }}</span>
          <h2 class="text-3xl sm:text-5xl font-serif text-[#F5F3EF] whitespace-pre-line">
            {{ data.projectsSection?.title || 'Estamos construindo o\nfuturo do acolhimento.' }}
          </h2>
          <div class="h-px w-10 bg-[#C5A059]"></div>
        </div>

        <!-- 3 Projects Cards with Progress Bar -->
        <div class="lg:col-span-9 grid grid-cols-1 md:grid-cols-3 gap-5">
          <div
            v-for="proj in data.activeProjects"
            :key="proj.id"
            class="relative min-h-[250px] lg:min-h-[270px] overflow-hidden border border-[#C5A059]/45 bg-[#0B0D10] p-5 flex flex-col justify-between group"
          >
            <img :src="proj.image" :alt="proj.title" class="absolute inset-0 w-full h-full object-cover object-center opacity-[0.42] group-hover:scale-105 transition-transform duration-700" />
            <div class="absolute inset-0 bg-gradient-to-t from-[#0B0D10] via-[#0B0D10]/78 to-[#0B0D10]/45"></div>
            <div class="relative z-10 space-y-5">
              <div class="text-3xl font-serif text-[#C5A059] leading-none">
                {{ proj.number }}
              </div>
              <div class="space-y-2">
                <h3 class="text-sm font-bold uppercase tracking-wider text-[#F5F3EF]">{{ proj.title }}</h3>
                <p class="text-xs text-[#D1D5DB] leading-relaxed">{{ proj.description }}</p>
              </div>
              <div class="h-px w-8 bg-[#C5A059]"></div>
            </div>

            <div class="relative z-10 space-y-4">
              <!-- Progress Bar -->
              <div class="space-y-2">
                <div class="flex items-center justify-between text-xs font-mono font-bold text-[#C5A059]">
                  <span>{{ proj.progressPercent }}%</span>
                </div>
                <div class="w-full h-2 rounded-full bg-white/20 overflow-hidden">
                  <div class="h-full bg-[#C5A059] rounded-full transition-all duration-1000" :style="{ width: proj.progressPercent + '%' }"></div>
                </div>
                <p class="text-[10px] text-[#C9CDD3]">{{ proj.goalText }}</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- IMPACTO E TRANSPARÊNCIA -->
    <section class="bg-[#F5F3EF] text-[#0B0D10] border-b border-[#D7D0C4]">
      <div class="w-full grid grid-cols-1 lg:grid-cols-12">
        <!-- Impact Left -->
        <div class="lg:col-span-5 px-6 sm:px-10 lg:px-16 xl:pl-24 py-16 lg:py-20 space-y-8">
          <div class="space-y-3">
            <span class="text-xs uppercase tracking-[0.25em] text-[#B99049] font-semibold">{{ data.impactSection?.tagline || 'NOSSO IMPACTO' }}</span>
            <h2 class="text-3xl sm:text-4xl font-serif text-[#0B0D10] whitespace-pre-line">
              {{ data.impactSection?.title || 'Cada número\nrepresenta uma vida\nacolhida.' }}
            </h2>
            <div class="h-px w-10 bg-[#C5A059]"></div>
          </div>

          <div class="grid grid-cols-2 sm:grid-cols-4 gap-6">
            <div v-for="st in data.impactStats" :key="st.label" class="space-y-1">
              <div class="text-3xl font-serif text-[#B99049]">{{ st.value }}</div>
              <div class="text-[11px] text-[#3D382F] uppercase leading-tight">{{ st.label }}</div>
            </div>
          </div>
        </div>

        <!-- Transparency Card Right -->
        <div class="lg:col-span-7 grid grid-cols-1 md:grid-cols-2 border-t lg:border-t-0 lg:border-l border-[#D7D0C4]">
          <div class="px-6 sm:px-10 lg:px-12 py-16 lg:py-20 space-y-5">
            <span class="text-xs uppercase tracking-[0.25em] text-[#B99049] font-semibold">{{ data.transparency.tagline }}</span>
            <h3 class="text-3xl font-serif text-[#0B0D10] leading-tight">{{ data.transparency.title }}</h3>
            <div class="h-px w-10 bg-[#C5A059]"></div>
            <p class="text-xs text-[#3D382F] leading-relaxed max-w-sm">{{ data.transparency.description }}</p>
            <button class="px-6 py-3 rounded-full border border-[#B99049] text-[10px] font-bold uppercase tracking-wider text-[#0B0D10] hover:bg-[#C5A059] transition-colors">
              {{ data.transparency.buttonText }}
            </button>
          </div>

          <div class="relative min-h-[240px] lg:min-h-full">
            <div class="absolute inset-0 overflow-hidden">
              <img :src="data.transparency.handsImage" alt="Placeholder visual de transparência" class="w-full h-full object-cover object-center" />
            </div>
            <div class="absolute left-6 right-6 bottom-6 flex items-center gap-3 p-5 bg-[#0C3323] text-[11px] text-[#F5F3EF] shadow-xl">
              <ShieldCheck class="w-4 h-4 shrink-0" />
              <span>{{ data.transparency.badgeText }}</span>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- QUOTE BANNER -->
    <section class="relative min-h-[230px] bg-[#0E1014] overflow-hidden">
      <img :src="data.quoteBanner.image" alt="Placeholder visual de apoio" class="absolute inset-0 h-full w-full object-cover object-[62%_center] opacity-70 grayscale" />
      <div class="absolute inset-0 bg-gradient-to-r from-[#0B0D10] via-[#0B0D10]/78 to-[#0B0D10]/25"></div>
      <div class="relative z-10 w-full px-6 sm:px-10 lg:px-16 xl:px-24 py-12 lg:py-16 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div class="lg:col-span-10 flex items-start gap-8">
          <span class="text-7xl font-serif text-[#C5A059] leading-none">“</span>
          <blockquote class="text-2xl sm:text-4xl font-serif text-[#F5F3EF] leading-snug whitespace-pre-line">
            {{ data.quoteBanner.quote }}
          </blockquote>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Heart, QrCode, Building, Building2, HeartHandshake, Copy, ShieldCheck, ArrowDown } from 'lucide-vue-next'
import { apoieService } from '../services/apoie.service'
import type { ApoieData, SupportOption } from '../models/apoie.model'

const data = ref<ApoieData>(apoieService.getApoieData())
const copiedId = ref<string | null>(null)

function getOptIcon(name: string) {
  switch (name) {
    case 'QrCode': return QrCode
    case 'Building': return Building
    case 'Building2': return Building2
    case 'HeartHandshake': return HeartHandshake
    default: return QrCode
  }
}

async function handleAction(opt: SupportOption) {
  if (opt.id === 'pix' && opt.extraDetails?.pixKey) {
    const success = await apoieService.copyPixKey(opt.extraDetails.pixKey)
    if (success) {
      copiedId.value = opt.id
      setTimeout(() => { copiedId.value = null }, 3000)
    }
  } else {
    alert(`Obrigado pelo seu interesse em ${opt.title.toLowerCase()}! Configure um canal de contato para continuar.`)
  }
}

onMounted(async () => {
  const { data: fetchedData, metaTitle } = await apoieService.fetchApoieData()
  data.value = fetchedData
  if (metaTitle) {
    document.title = metaTitle
  }
})
</script>

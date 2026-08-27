<template>
  <div class="bg-[#0B0D10] text-[#E5E7EB] overflow-hidden">
    <!-- HERO SECTION -->
    <section class="relative min-h-[440px] lg:min-h-[520px] flex items-center border-b border-[#191D26]">
      <img
        :src="data.hero.image"
        alt="Placeholder visual da página"
        class="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-[#0B0D10] via-[#0B0D10]/70 to-[#0B0D10]/10"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-[#0B0D10]/35 via-transparent to-[#0B0D10]/10"></div>
      <div class="relative z-10 w-full px-6 sm:px-10 lg:px-16 xl:px-24 py-20 lg:py-24">
        <div class="max-w-xl space-y-7">
          <div class="flex items-center gap-2 text-xs text-[#D9B45F]">
            <router-link to="/" class="hover:text-[#C5A059]">Início</router-link>
            <span>/</span>
            <span class="font-medium">{{ data.hero.breadcrumb }}</span>
          </div>
          <h1 class="text-5xl sm:text-7xl lg:text-8xl font-serif text-[#F5F3EF] leading-[0.95] whitespace-pre-line">
            {{ data.hero.title }}
          </h1>
          <div class="h-px w-10 bg-[#C5A059]"></div>
          <p class="text-sm sm:text-base text-[#F5F3EF] max-w-md leading-relaxed">
            {{ data.hero.description }}
          </p>
        </div>
      </div>
    </section>

    <!-- FILTER BAR & SEARCH -->
    <section class="py-8 bg-[#F5F3EF] text-[#0B0D10] border-b border-[#D7D0C4]">
      <div class="w-full px-6 sm:px-10 lg:px-16 xl:px-24 flex flex-col md:flex-row items-center justify-between gap-6">
        <!-- Category Buttons -->
        <div class="flex items-center gap-2 overflow-x-auto w-full md:w-auto pb-2 md:pb-0 no-scrollbar">
          <button
            v-for="cat in data.categories"
            :key="cat.id"
            @click="activeCategory = cat.id"
            class="px-4 py-2 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all whitespace-nowrap border"
            :class="[
              activeCategory === cat.id
                ? 'bg-[#0B0D10] text-[#F5F3EF] border-[#0B0D10] shadow-md shadow-[#C5A059]/20'
                : 'bg-transparent text-[#3A3329] border-[#CDBE9E] hover:text-[#0B0D10] hover:border-[#0B0D10]'
            ]"
          >
            {{ cat.name }}
          </button>
        </div>

        <!-- Search Input -->
        <div class="relative w-full md:w-72">
          <input
            v-model="searchQuery"
            type="text"
            :placeholder="data.filterSection?.searchPlaceholder || 'Buscar notícia...'"
            class="w-full pl-10 pr-4 py-2.5 rounded-full bg-white border border-[#CDBE9E] text-xs text-[#0B0D10] placeholder-[#8D8171] focus:outline-none focus:border-[#C5A059] transition-colors"
          />
          <Search class="w-4 h-4 text-[#7A6F5E] absolute left-3.5 top-1/2 -translate-y-1/2" />
        </div>
      </div>
    </section>

    <!-- NEWS CONTENT -->
    <section class="py-8 pb-16 bg-[#F5F3EF] text-[#0B0D10]">
      <div class="w-full px-6 sm:px-10 lg:px-16 xl:px-24 space-y-16">
        <!-- Featured Article -->
        <div v-if="filteredArticles.length > 0 && activeCategory === 'todas' && !searchQuery" class="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          <div class="lg:col-span-7 bg-white overflow-hidden border border-[#D7D0C4] shadow-sm">
            <div class="relative h-[280px] sm:h-[360px] lg:h-[390px]">
              <img :src="data.featuredArticle.image" :alt="data.featuredArticle.title" class="w-full h-full object-cover" />
              <div class="absolute top-5 left-5 px-4 py-2 rounded-full bg-[#C5A059] text-black text-[10px] font-bold tracking-widest uppercase">
                DESTAQUE
              </div>
            </div>
            <div class="p-6 sm:p-8 space-y-4">
              <div class="flex items-center gap-3 text-[10px] text-[#B1883E]">
                <span class="font-bold uppercase tracking-wider">{{ data.featuredArticle.category }}</span>
                <span>•</span>
                <span class="text-[#625847]">{{ data.featuredArticle.date }}</span>
              </div>
              <h2 class="text-2xl sm:text-4xl font-serif text-[#0B0D10] leading-tight">
                {{ data.featuredArticle.title }}
              </h2>
              <p class="text-xs sm:text-sm text-[#4B443A] leading-relaxed max-w-2xl">
                {{ data.featuredArticle.excerpt }}
              </p>
              <a :href="data.featuredArticle.link || '#'" class="inline-flex items-center gap-3 text-[11px] font-bold text-[#B1883E] hover:text-[#0B0D10] uppercase tracking-wider">
                <span>LER MAIS</span>
                <ArrowRight class="w-4 h-4" />
              </a>
            </div>
          </div>

          <div class="lg:col-span-5 grid grid-cols-1 gap-6">
            <article
              v-for="art in sideArticles"
              :key="art.id"
              class="bg-white overflow-hidden border border-[#D7D0C4] shadow-sm group grid grid-cols-1"
            >
              <div class="h-[190px] overflow-hidden">
                <img :src="art.image" :alt="art.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div class="p-6 space-y-3">
                <div class="flex items-center gap-2 text-[10px] text-[#B1883E] font-semibold uppercase tracking-wider">
                  <span>{{ art.category }}</span>
                  <span>•</span>
                  <span class="text-[#625847]">{{ art.date }}</span>
                </div>
                <h3 class="text-xl sm:text-2xl font-serif text-[#0B0D10] leading-tight group-hover:text-[#B1883E] transition-colors">
                  {{ art.title }}
                </h3>
                <a :href="art.link || '#'" class="inline-flex items-center gap-2 text-[11px] text-[#B1883E] font-bold tracking-wider uppercase">
                  LER MAIS <ArrowRight class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </article>
          </div>
        </div>

        <!-- News Grid -->
        <div v-if="filteredArticles.length > 0" class="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          <div
            v-for="art in visibleGridArticles"
            :key="art.id"
            class="bg-white overflow-hidden border border-[#D7D0C4] hover:border-[#C5A059] transition-all duration-300 flex flex-col justify-between group shadow-sm"
          >
            <div class="h-[170px] overflow-hidden relative">
              <img :src="art.image" :alt="art.title" class="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
            </div>
            <div class="p-5 space-y-3 flex-grow flex flex-col justify-between">
              <div class="space-y-2">
                <div class="flex items-center gap-2 text-[10px] text-[#B1883E] font-semibold uppercase tracking-wider">
                  <span>{{ art.category }}</span>
                  <span>•</span>
                  <span class="text-[#625847]">{{ art.date }}</span>
                </div>
                <h3 class="text-lg font-serif text-[#0B0D10] leading-snug group-hover:text-[#B1883E] transition-colors">
                  {{ art.title }}
                </h3>
              </div>
              <div class="pt-2">
                <a :href="art.link || '#'" class="inline-flex items-center gap-2 text-[11px] text-[#B1883E] font-bold tracking-wider uppercase">
                  LER MAIS <ArrowRight class="w-3.5 h-3.5 group-hover:translate-x-1 transition-transform" />
                </a>
              </div>
            </div>
          </div>
        </div>

        <div v-else class="py-16 text-center text-[#9CA3AF] space-y-4">
          <p>{{ data.filterSection?.emptyMessage || 'Nenhuma notícia encontrada para a categoria ou busca selecionada.' }}</p>
          <button @click="resetFilters" class="px-4 py-2 rounded-full text-xs font-bold bg-[#C5A059] text-black">
            {{ data.filterSection?.clearFiltersText || 'Limpar Filtros' }}
          </button>
        </div>
      </div>
    </section>

    <!-- NEWSLETTER BANNER -->
    <section class="relative py-14 lg:py-20 bg-[#0B0D10] border-t border-[#191D26] overflow-hidden">
      <img
        :src="data.newsletter.image"
        alt="Placeholder visual da newsletter"
        class="absolute inset-y-0 right-0 h-full w-full object-cover object-right opacity-70"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-[#0B0D10] via-[#0B0D10]/90 to-[#0B0D10]/20"></div>
      <div class="relative z-10 w-full px-6 sm:px-10 lg:px-16 xl:px-24 grid grid-cols-1 lg:grid-cols-12 gap-10 items-center">
        <div class="lg:col-span-4 space-y-4">
          <h2 class="text-3xl sm:text-4xl font-serif text-[#F5F3EF] whitespace-pre-line">
            {{ data.newsletter.title }}
          </h2>
          <p class="text-xs text-[#9CA3AF] max-w-md">
            {{ data.newsletter.description }}
          </p>
        </div>

        <div class="lg:col-span-5">
          <form @submit.prevent="handleSubscribe" class="flex flex-col sm:flex-row items-center gap-0 max-w-xl border border-[#C5A059]/40 bg-[#0B0D10]/60">
            <input
              v-model="newsletterEmail"
              type="email"
              required
              :placeholder="data.newsletter.placeholder"
              class="w-full px-5 py-4 bg-transparent text-xs text-[#F5F3EF] placeholder-[#9CA3AF] focus:outline-none"
            />
            <button
              type="submit"
              class="w-full sm:w-auto px-8 py-4 bg-[#C5A059] text-black font-bold text-xs uppercase tracking-wider hover:bg-[#D4AF37] transition-all flex items-center justify-center gap-3 shrink-0"
            >
              <span>{{ data.newsletter.buttonText }}</span>
              <Send class="w-3.5 h-3.5" />
            </button>
          </form>
          <p v-if="subscribed" class="mt-3 text-xs text-[#C5A059] font-medium">Inscrição realizada com sucesso! Obrigado.</p>
          <p class="mt-3 text-[10px] text-[#9CA3AF]">{{ data.newsletter.privacyNotice }}</p>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { Search, ArrowRight, Send } from 'lucide-vue-next'
import { noticiasService } from '../services/noticias.service'
import type { NoticiasData } from '../models/noticias.model'

const data = ref<NoticiasData>(noticiasService.getNoticiasData())
const activeCategory = ref('todas')
const searchQuery = ref('')
const newsletterEmail = ref('')
const subscribed = ref(false)

const filteredArticles = computed(() => {
  return noticiasService.filterArticles(data.value.articles, activeCategory.value, searchQuery.value)
})

const hasFeaturedLayout = computed(() => activeCategory.value === 'todas' && !searchQuery.value)

const sideArticles = computed(() => {
  return hasFeaturedLayout.value ? filteredArticles.value.slice(0, 2) : []
})

const visibleGridArticles = computed(() => {
  return hasFeaturedLayout.value ? filteredArticles.value.slice(2) : filteredArticles.value
})

function resetFilters() {
  activeCategory.value = 'todas'
  searchQuery.value = ''
}

function handleSubscribe() {
  if (newsletterEmail.value) {
    subscribed.value = true
    newsletterEmail.value = ''
  }
}

onMounted(async () => {
  const { data: fetchedData, metaTitle } = await noticiasService.fetchNoticiasData()
  data.value = fetchedData
  if (metaTitle) {
    document.title = metaTitle
  }
})
</script>

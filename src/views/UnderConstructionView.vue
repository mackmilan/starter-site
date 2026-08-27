<template>
  <section class="relative min-h-screen overflow-hidden bg-[#0B0D10] text-[#E5E7EB]">
    <img
      src="/images/placeholder.svg"
      alt="Placeholder visual do site"
      class="absolute inset-0 h-full w-full object-cover object-center"
    />
    <div class="absolute inset-0 bg-gradient-to-r from-[#050607] via-[#050607]/80 to-[#050607]/35"></div>
    <div class="absolute inset-0 bg-gradient-to-t from-[#0B0D10] via-[#0B0D10]/35 to-transparent"></div>

    <div class="relative z-10 flex min-h-screen flex-col">
      <header class="w-full px-6 py-6 sm:px-10 lg:px-16 xl:px-24">
        <SiteLogo />
      </header>

      <main class="flex flex-1 items-center px-6 py-12 sm:px-10 lg:px-16 xl:px-24">
        <div class="max-w-3xl space-y-8">
          <div class="inline-flex items-center gap-2 rounded-full border border-[#C5A059]/30 bg-[#1A1D24]/85 px-3.5 py-1.5 text-xs font-medium tracking-wide text-[#C5A059] backdrop-blur">
            <span class="h-2 w-2 rounded-full bg-[#C5A059]"></span>
            {{ badgeText }}
          </div>

          <div class="space-y-5">
            <h1 class="font-serif text-4xl leading-[1.06] tracking-tight text-[#F5F3EF] sm:text-6xl lg:text-7xl">
              {{ titleText }}
            </h1>
            <p class="max-w-2xl text-base font-light leading-relaxed text-[#D1D5DB] sm:text-xl">
              {{ messageText }}
            </p>
          </div>

          <div class="grid max-w-2xl grid-cols-1 border border-[#C5A059]/25 bg-[#0B0D10]/70 backdrop-blur-sm sm:grid-cols-3">
            <div
              v-for="item in highlights"
              :key="item.title"
              class="border-b border-[#C5A059]/20 px-5 py-5 last:border-b-0 sm:border-b-0 sm:border-r sm:last:border-r-0"
            >
              <component :is="item.icon" class="mb-4 h-7 w-7 text-[#C5A059]" />
              <h2 class="text-xs font-bold uppercase tracking-widest text-[#F5F3EF]">{{ item.title }}</h2>
              <p class="mt-2 text-xs leading-relaxed text-[#9CA3AF]">{{ item.description }}</p>
            </div>
          </div>

          <form class="max-w-2xl border border-[#C5A059]/20 bg-[#0B0D10]/70 p-4 backdrop-blur-sm" @submit.prevent="submitToken">
            <label for="construction-token" class="block text-xs font-bold uppercase tracking-widest text-[#F5F3EF]">
              Acesso antecipado
            </label>
            <div class="mt-3 flex flex-col gap-3 sm:flex-row">
              <input
                id="construction-token"
                v-model="tokenInput"
                type="password"
                autocomplete="off"
                placeholder="Digite o token de acesso"
                class="min-w-0 flex-1 rounded-full border border-[#C5A059]/35 bg-[#11141A] px-4 py-3 text-sm text-[#F5F3EF] outline-none placeholder:text-[#6B7280] focus:border-[#C5A059]"
              />
              <button
                type="submit"
                class="rounded-full border border-[#C5A059] px-6 py-3 text-xs font-bold uppercase tracking-widest text-[#C5A059] transition-colors hover:bg-[#C5A059] hover:text-black"
              >
                Acessar site
              </button>
            </div>
            <p v-if="tokenError" class="mt-2 text-xs text-red-300">Token inválido.</p>
          </form>

          <div class="flex flex-col gap-4 text-xs text-[#B8BDC7] sm:flex-row sm:items-center">
            <a
              :href="`mailto:${contactEmail}`"
              class="inline-flex items-center justify-center gap-2 rounded-full bg-[#C5A059] px-6 py-3 font-bold uppercase tracking-widest text-black transition-all hover:bg-[#D4AF37]"
            >
              <Mail class="h-4 w-4" />
              {{ contactEmail }}
            </a>
            <span class="text-[#9CA3AF]">Uma nova experiência está a caminho.</span>
          </div>
        </div>
      </main>
    </div>
  </section>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import { Building2, HeartHandshake, Mail, Sparkles } from 'lucide-vue-next'
import SiteLogo from '../components/SiteLogo.vue'
import { activateConstructionAccess, siteSettings } from '../config/site'

const tokenInput = ref('')
const tokenError = ref(false)
const isSubmitting = ref(false)

const badgeText = computed(() => siteSettings.value?.under_construction_badge || 'SITE STARTER')
const titleText = computed(() => siteSettings.value?.under_construction_title || 'Nosso site está em construção.')
const messageText = computed(() => siteSettings.value?.under_construction_message || 'Estamos preparando um espaço para apresentar sua organização, seus projetos e os caminhos para participar.')
const contactEmail = computed(() => (siteSettings.value?.settings as any)?.contact_email || 'contato@example.com')

async function submitToken() {
  if (isSubmitting.value) {
    return
  }

  isSubmitting.value = true
  tokenError.value = false

  try {
    tokenError.value = !(await activateConstructionAccess(tokenInput.value))

    if (!tokenError.value) {
      window.location.reload()
    }
  } finally {
    isSubmitting.value = false
  }
}

const highlights = [
  {
    title: 'Clareza',
    description: 'Uma presença preparada para comunicar o que importa.',
    icon: HeartHandshake
  },
  {
    title: 'Conexão',
    description: 'Caminhos simples para pessoas encontrarem sua organização.',
    icon: Building2
  },
  {
    title: 'Em breve',
    description: 'Novos conteúdos, notícias e formas de apoiar.',
    icon: Sparkles
  }
]

onMounted(() => {
  const siteName = siteSettings.value?.site_name || 'Site Starter'
  document.title = `${siteName} - Site em construção`
})
</script>

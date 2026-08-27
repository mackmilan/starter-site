<template>
  <div class="bg-[#0B0D10] text-[#E5E7EB] overflow-hidden">
    <!-- HERO SECTION -->
    <section class="relative min-h-[560px] lg:min-h-[650px] flex items-center border-b border-[#191D26]">
      <img
        :src="data.hero.image"
        alt="Placeholder visual da página de contato"
        class="absolute inset-0 h-full w-full object-cover object-center"
      />
      <div class="absolute inset-0 bg-gradient-to-r from-[#0B0D10] via-[#0B0D10]/74 to-[#0B0D10]/12"></div>
      <div class="absolute inset-0 bg-gradient-to-t from-[#0B0D10]/25 via-transparent to-[#0B0D10]/10"></div>
      <div class="relative z-10 w-full px-6 sm:px-10 lg:px-16 xl:px-24 py-24">
        <div class="max-w-[620px] space-y-7">
          <span class="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-semibold">{{ data.hero.tagline }}</span>
          <h1 class="text-5xl sm:text-6xl lg:text-7xl font-serif text-[#F5F3EF] leading-[1] whitespace-pre-line">
            {{ data.hero.title }}
          </h1>
          <div class="h-px w-12 bg-[#C5A059]"></div>
          <p class="text-sm sm:text-base text-[#F5F3EF] max-w-md leading-relaxed">
            {{ data.hero.description }}
          </p>
        </div>
      </div>
    </section>

    <!-- CHANNELS & CONTACT FORM GRID -->
    <section class="-mt-20 relative z-20 pb-6 lg:pb-8">
      <div class="w-full px-6 sm:px-10 lg:px-16 xl:px-24">
        <div class="grid grid-cols-1 lg:grid-cols-12 gap-0 bg-[#0B0D10]/94 border border-[#C5A059]/35 shadow-2xl backdrop-blur-sm">
          <!-- Left: Channels -->
          <div class="lg:col-span-5 space-y-8 p-8 sm:p-10 lg:p-12 lg:border-r border-[#C5A059]/30">
            <div>
              <span class="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-semibold">{{ data.channelsSection?.tagline || 'CANAIS DE ATENDIMENTO' }}</span>
              <div class="w-12 h-0.5 bg-[#C5A059] mt-2"></div>
            </div>

            <div class="space-y-6">
              <!-- Channel Item -->
              <div v-for="ch in data.channels" :key="ch.title" class="flex items-start gap-4">
                <div class="w-12 h-12 rounded-full bg-transparent border border-[#C5A059] flex items-center justify-center text-[#C5A059] shrink-0 mt-0.5">
                  <component :is="getIcon(ch.iconName)" class="w-5 h-5" />
                </div>
                <div class="space-y-0.5">
                  <h4 class="text-[11px] font-bold uppercase tracking-wider text-[#C5A059]">{{ ch.title }}</h4>
                  <p class="text-sm font-semibold text-[#F5F3EF]">{{ ch.detail }}</p>
                  <p v-if="ch.subDetail" class="text-xs text-[#9CA3AF] whitespace-pre-line">{{ ch.subDetail }}</p>
                </div>
              </div>
            </div>
          </div>

          <!-- Right: Contact Form -->
          <div class="lg:col-span-7 p-8 sm:p-10 lg:p-12 space-y-6">
            <div>
              <span class="text-xs uppercase tracking-[0.25em] text-[#C5A059] font-semibold">{{ data.formSection?.tagline || 'ENVIE SUA MENSAGEM' }}</span>
              <div class="w-12 h-0.5 bg-[#C5A059] mt-2"></div>
            </div>

            <form @submit.prevent="handleSubmit" class="space-y-4">
              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-[11px] uppercase tracking-wider text-[#9CA3AF] mb-1">Nome completo</label>
                  <input
                    v-model="form.name"
                    type="text"
                    required
                    placeholder="Nome completo"
                    class="w-full px-4 py-3 bg-transparent border border-[#C5A059]/30 text-xs text-[#F5F3EF] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
                <div>
                  <label class="block text-[11px] uppercase tracking-wider text-[#9CA3AF] mb-1">E-mail</label>
                  <input
                    v-model="form.email"
                    type="email"
                    required
                    placeholder="E-mail"
                    class="w-full px-4 py-3 bg-transparent border border-[#C5A059]/30 text-xs text-[#F5F3EF] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <div class="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label class="block text-[11px] uppercase tracking-wider text-[#9CA3AF] mb-1">Telefone</label>
                  <input
                    v-model="form.phone"
                    type="text"
                    placeholder="(00) 00000-0000"
                    class="w-full px-4 py-3 bg-transparent border border-[#C5A059]/30 text-xs text-[#F5F3EF] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
                <div>
                  <label class="block text-[11px] uppercase tracking-wider text-[#9CA3AF] mb-1">Assunto</label>
                  <input
                    v-model="form.subject"
                    type="text"
                    placeholder="Assunto da mensagem"
                    class="w-full px-4 py-3 bg-transparent border border-[#C5A059]/30 text-xs text-[#F5F3EF] focus:outline-none focus:border-[#C5A059]"
                  />
                </div>
              </div>

              <div>
                <label class="block text-[11px] uppercase tracking-wider text-[#9CA3AF] mb-1">Mensagem</label>
                <textarea
                  v-model="form.message"
                  rows="4"
                  required
                  placeholder="Escreva sua mensagem..."
                  class="w-full px-4 py-3 bg-transparent border border-[#C5A059]/30 text-xs text-[#F5F3EF] focus:outline-none focus:border-[#C5A059]"
                ></textarea>
              </div>

              <div class="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                <button
                  type="submit"
                  :disabled="submitting"
                  class="w-full sm:w-auto px-8 py-3.5 rounded-md border border-[#C5A059] text-[#C5A059] font-bold text-xs uppercase tracking-wider hover:bg-[#C5A059] hover:text-black transition-all flex items-center justify-center gap-3"
                >
                  <span>{{ submitting ? (data.formSection?.loadingText || 'ENVIANDO...') : (data.formSection?.buttonText || 'ENVIAR MENSAGEM') }}</span>
                  <Send class="w-4 h-4" />
                </button>

                <div class="flex items-center gap-2 text-[10px] text-[#6B7280]">
                  <Lock class="w-3.5 h-3.5 text-[#C5A059]" />
                  <span>{{ data.formSection?.privacyNotice || 'Seus dados estão protegidos e serão utilizados somente para contato.' }}</span>
                </div>
              </div>

              <p v-if="successMsg" class="text-xs text-[#C5A059] font-medium pt-2">{{ successMsg }}</p>
              <p v-if="errorMsg" class="text-xs text-red-400 font-medium pt-2">{{ errorMsg }}</p>
            </form>
          </div>
        </div>
      </div>
    </section>

    <!-- ONDE ESTAMOS & MAP -->
    <section class="bg-[#F5F3EF] text-[#0B0D10] border-b border-[#D7D0C4]">
      <div class="w-full px-6 sm:px-10 lg:px-16 xl:px-24 grid grid-cols-1 lg:grid-cols-12 gap-0">
        <!-- Text Left -->
        <div class="lg:col-span-5 space-y-6 bg-[#F5F3EF] px-0 lg:pr-12 py-14 lg:py-16">
          <span class="text-xs uppercase tracking-[0.25em] text-[#B99049] font-semibold">{{ data.officeLocation.tagline }}</span>
          <h2 class="text-3xl sm:text-5xl font-serif text-[#0B0D10] whitespace-pre-line">
            {{ data.officeLocation.title }}
          </h2>
          <div class="h-px w-10 bg-[#C5A059]"></div>
          <p class="text-xs text-[#3D382F] leading-relaxed max-w-sm">
            {{ data.officeLocation.description }}
          </p>
          <div>
            <a
              :href="data.officeLocation.buttonLink || '#'"
              target="_blank"
              rel="noopener noreferrer"
              class="inline-flex items-center gap-2 px-6 py-3 rounded-md text-[10px] font-bold uppercase tracking-wider text-[#0B0D10] border border-[#B99049] hover:bg-[#C5A059] transition-all"
            >
              <span>{{ data.officeLocation.buttonText }}</span>
              <MapPin class="w-4 h-4" />
            </a>
          </div>
        </div>

        <!-- Map & Card Right -->
        <div class="lg:col-span-7 min-h-[310px] lg:min-h-[340px] overflow-hidden relative group">
          <img :src="data.officeLocation.mapImage" alt="Placeholder visual de localização" class="absolute inset-0 w-full h-full object-cover object-center group-hover:scale-[1.02] transition-transform duration-700" />
          <div class="absolute inset-0 bg-black/28"></div>
          <div class="absolute bottom-8 right-8 p-5 bg-[#0B0D10]/92 backdrop-blur-md border border-[#C5A059]/40 text-xs space-y-1 max-w-xs shadow-2xl">
            <h4 class="font-bold text-[#C5A059] uppercase tracking-wider">{{ data.officeLocation.addressCard.title }}</h4>
            <p class="text-[#F5F3EF] whitespace-pre-line leading-relaxed">{{ data.officeLocation.addressCard.address }}</p>
            <p class="text-[#9CA3AF] text-[10px]">{{ data.officeLocation.addressCard.zip }}</p>
          </div>
        </div>
      </div>
    </section>

    <!-- QUOTE BANNER -->
    <section class="relative min-h-[190px] bg-[#0B0D10] overflow-hidden border-y border-[#C5A059]/25">
      <img :src="data.quoteBanner.image" alt="Placeholder visual de contato" class="absolute inset-0 h-full w-full object-cover object-[70%_center] opacity-75" />
      <div class="absolute inset-0 bg-gradient-to-r from-[#0B0D10] via-[#0B0D10]/80 to-[#0B0D10]/18"></div>
      <div class="relative z-10 w-full px-6 sm:px-10 lg:px-16 xl:px-24 py-10 lg:py-12 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
        <div class="lg:col-span-8 flex items-start gap-8">
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
import { ref, reactive, onMounted } from 'vue'
import { Phone, Mail, MapPin, Clock, Instagram, Send, Lock } from 'lucide-vue-next'
import { contatoService } from '../services/contato.service'
import type { ContatoData, ContactFormInput } from '../models/contato.model'

const data = ref<ContatoData>(contatoService.getContatoData())
const submitting = ref(false)
const successMsg = ref('')
const errorMsg = ref('')

const form = reactive<ContactFormInput>({
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: ''
})

function getIcon(name: string) {
  switch (name) {
    case 'Phone': return Phone
    case 'Mail': return Mail
    case 'MapPin': return MapPin
    case 'Clock': return Clock
    case 'Instagram': return Instagram
    default: return Phone
  }
}

async function handleSubmit() {
  submitting.value = true
  successMsg.value = ''
  errorMsg.value = ''
  const res = await contatoService.submitContactForm({ ...form })
  submitting.value = false
  if (res.success) {
    successMsg.value = res.message
    form.name = ''
    form.email = ''
    form.phone = ''
    form.subject = ''
    form.message = ''
  } else {
    errorMsg.value = res.message
  }
}

onMounted(async () => {
  const { data: fetchedData, metaTitle } = await contatoService.fetchContatoData()
  data.value = fetchedData
  if (metaTitle) {
    document.title = metaTitle
  }
})
</script>

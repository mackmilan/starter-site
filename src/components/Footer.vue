<template>
  <footer class="bg-[#080A0C] border-t border-[#C5A059]/15 text-[#9CA3AF] pt-16 pb-8">
    <div class="w-full px-6 sm:px-10 lg:px-16 xl:px-24">
      <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-10 pb-12 border-b border-[#191D26]">
        <!-- Col 1: Brand & Slogan -->
        <div class="lg:col-span-2 space-y-4">
          <SiteLogo />
          <p class="text-xs text-[#9CA3AF] max-w-sm leading-relaxed">
            {{ navData.footerDescription }}
          </p>
          <p class="text-sm font-serif italic text-[#C5A059]">
            {{ navData.footerQuote }}
          </p>

          <!-- Social Icons -->
          <div class="flex items-center space-x-3 pt-2">
            <a
              v-for="social in navData.socialLinks"
              :key="social.platform"
              :href="social.url"
              target="_blank"
              rel="noopener noreferrer"
              class="w-9 h-9 rounded-full bg-[#12151B] border border-[#2B3140] hover:border-[#C5A059] text-[#9CA3AF] hover:text-[#C5A059] flex items-center justify-center transition-all duration-200"
              :aria-label="social.platform"
            >
              <component :is="getSocialIcon(social.icon)" class="w-4 h-4" />
            </a>
          </div>
        </div>

        <!-- Col 2: NAVEGAÇÃO -->
        <div>
          <h4 class="text-xs font-bold uppercase tracking-widest text-[#F5F3EF] mb-4">NAVEGAÇÃO</h4>
          <ul class="space-y-2 text-xs">
            <li v-for="item in navData.navItems" :key="item.path">
              <router-link :to="item.path" class="hover:text-[#C5A059] transition-colors">
                {{ item.name }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Col 3: CONHEÇA MAIS -->
        <div>
          <h4 class="text-xs font-bold uppercase tracking-widest text-[#F5F3EF] mb-4">CONHEÇA MAIS</h4>
          <ul class="space-y-2 text-xs">
            <li v-for="link in navData.knowMoreLinks" :key="link.path + link.label">
              <router-link :to="link.path" class="hover:text-[#C5A059] transition-colors">
                {{ link.label }}
              </router-link>
            </li>
          </ul>
        </div>

        <!-- Col 4: TRANSPARÊNCIA & CONTATO -->
        <div class="space-y-6">
          <div>
            <h4 class="text-xs font-bold uppercase tracking-widest text-[#F5F3EF] mb-3">TRANSPARÊNCIA</h4>
            <ul class="space-y-2 text-xs">
              <li v-for="link in navData.transparencyLinks" :key="link.path + link.label">
                <router-link :to="link.path" class="hover:text-[#C5A059] transition-colors">
                  {{ link.label }}
                </router-link>
              </li>
            </ul>
          </div>

          <div>
            <h4 class="text-xs font-bold uppercase tracking-widest text-[#F5F3EF] mb-3">CONTATO</h4>
            <ul class="space-y-2 text-xs">
              <li class="flex items-center gap-2">
                <Phone class="w-3.5 h-3.5 text-[#C5A059]" />
                <span>{{ navData.contactInfo.phone }}</span>
              </li>
              <li class="flex items-center gap-2">
                <Mail class="w-3.5 h-3.5 text-[#C5A059]" />
                <span>{{ navData.contactInfo.email }}</span>
              </li>
              <li class="flex items-start gap-2">
                <MapPin class="w-3.5 h-3.5 text-[#C5A059] mt-0.5 shrink-0" />
                <span>{{ navData.contactInfo.address }}</span>
              </li>
            </ul>
          </div>

          <a
            :href="navData.contactInfo.contactUrl"
            target="_blank"
            rel="noopener noreferrer"
            class="inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-wider text-[#F5F3EF] bg-[#191D26] border border-[#C5A059]/40 hover:bg-[#C5A059] hover:text-black transition-all duration-300"
          >
            <span>FALE CONOSCO</span>
            <MessageSquare class="w-3.5 h-3.5 text-[#C5A059] group-hover:text-black" />
          </a>
        </div>
      </div>

      <!-- Bottom Bar -->
      <div class="pt-8 flex flex-col sm:flex-row items-center justify-between text-[11px] text-[#6B7280] gap-4">
        <p>{{ navData.copyrightText }}</p>
        <div class="flex items-center space-x-6">
          <a href="#" class="hover:text-[#C5A059] transition-colors">Política de Privacidade</a>
          <span class="text-[#2B3140]">|</span>
          <a href="#" class="hover:text-[#C5A059] transition-colors">Termos de Uso</a>
        </div>
      </div>
    </div>
  </footer>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { Instagram, Youtube, Facebook, Linkedin, Phone, Mail, MapPin, MessageSquare } from 'lucide-vue-next'
import SiteLogo from './SiteLogo.vue'
import { navigationService } from '../services/navigation.service'
import type { NavigationData } from '../models/navigation.model'

const navData = ref<NavigationData>(navigationService.getNavigationData())

function getSocialIcon(icon: string) {
  switch (icon) {
    case 'Instagram': return Instagram
    case 'Youtube': return Youtube
    case 'Facebook': return Facebook
    case 'Linkedin': return Linkedin
    default: return Instagram
  }
}

onMounted(async () => {
  navData.value = await navigationService.fetchNavigationData()
})
</script>

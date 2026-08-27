<template>
  <header class="sticky top-0 z-50 bg-[#0B0D10]/90 backdrop-blur-md border-b border-[#C5A059]/15 transition-all duration-300">
    <div class="w-full px-6 sm:px-10 lg:px-16 xl:px-24 h-20 flex items-center justify-between">
      <!-- Logo -->
      <SiteLogo />

      <!-- Desktop Navigation Links -->
      <nav class="hidden lg:flex items-center space-x-1 xl:space-x-2">
        <router-link
          v-for="item in navData.navItems"
          :key="item.path"
          :to="item.path"
          class="px-3.5 py-2 text-xs font-semibold uppercase tracking-widest transition-all duration-200 relative group"
          :class="[
            route.path === item.path
              ? 'text-[#C5A059]'
              : 'text-[#D1D5DB] hover:text-[#F5F3EF]'
          ]"
        >
          {{ item.name }}
          <!-- Gold active indicator line under active item -->
          <span
            class="absolute bottom-0 left-3.5 right-3.5 h-[2px] bg-[#C5A059] transition-all duration-300"
            :class="route.path === item.path ? 'opacity-100 scale-x-100' : 'opacity-0 scale-x-0 group-hover:opacity-100 group-hover:scale-x-100'"
          ></span>
        </router-link>
      </nav>

      <!-- Desktop CTA Button -->
      <div class="hidden lg:flex items-center">
        <router-link
          :to="navData.headerCta?.link || '/apoie'"
          class="px-5 py-2.5 rounded-full text-xs font-bold uppercase tracking-wider text-[#C5A059] border border-[#C5A059]/60 hover:bg-[#C5A059] hover:text-black transition-all duration-300 flex items-center gap-2 shadow-lg shadow-[#C5A059]/5 hover:shadow-[#C5A059]/20"
        >
          <span>{{ navData.headerCta?.text || 'ENTRE EM CONTATO' }}</span>
          <Heart class="w-4 h-4" />
        </router-link>
      </div>

      <!-- Mobile Hamburger Button -->
      <button
        @click="mobileMenuOpen = !mobileMenuOpen"
        class="lg:hidden p-2.5 rounded-lg text-[#D1D5DB] hover:text-[#C5A059] hover:bg-[#191D26] transition-colors focus:outline-none"
        aria-label="Menu Toggle"
      >
        <Menu v-if="!mobileMenuOpen" class="w-6 h-6" />
        <X v-else class="w-6 h-6" />
      </button>
    </div>

    <!-- Mobile Dropdown Navigation -->
    <transition
      enter-active-class="transition duration-200 ease-out"
      enter-from-class="transform -translate-y-4 opacity-0"
      enter-to-class="transform translate-y-0 opacity-100"
      leave-active-class="transition duration-150 ease-in"
      leave-from-class="transform translate-y-0 opacity-100"
      leave-to-class="transform -translate-y-4 opacity-0"
    >
      <div v-if="mobileMenuOpen" class="lg:hidden bg-[#0B0D10] border-b border-[#C5A059]/20 px-4 pt-3 pb-6 space-y-2">
        <router-link
          v-for="item in navData.navItems"
          :key="item.path"
          :to="item.path"
          @click="mobileMenuOpen = false"
          class="block px-4 py-3 rounded-lg text-sm font-semibold uppercase tracking-wider transition-colors"
          :class="[
            route.path === item.path
              ? 'bg-[#C5A059]/10 text-[#C5A059] border-l-2 border-[#C5A059]'
              : 'text-[#D1D5DB] hover:bg-[#191D26] hover:text-[#F5F3EF]'
          ]"
        >
          {{ item.name }}
        </router-link>
        <div class="pt-4 border-t border-[#191D26]">
          <router-link
            :to="navData.headerCta?.link || '/apoie'"
            @click="mobileMenuOpen = false"
            class="w-full py-3 rounded-full text-center text-xs font-bold uppercase tracking-wider text-[#0B0D10] bg-[#C5A059] hover:bg-[#D4AF37] transition-all flex items-center justify-center gap-2"
          >
            <span>{{ navData.headerCta?.text || 'ENTRE EM CONTATO' }}</span>
            <Heart class="w-4 h-4 fill-current" />
          </router-link>
        </div>
      </div>
    </transition>
  </header>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { useRoute } from 'vue-router'
import { Heart, Menu, X } from 'lucide-vue-next'
import SiteLogo from './SiteLogo.vue'
import { navigationService } from '../services/navigation.service'
import type { NavigationData } from '../models/navigation.model'

const route = useRoute()
const mobileMenuOpen = ref(false)
const navData = ref<NavigationData>(navigationService.getNavigationData())

onMounted(async () => {
  navData.value = await navigationService.fetchNavigationData()
})
</script>

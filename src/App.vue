<template>
  <transition name="screen-fade" mode="out-in">
    <LoadingScreen v-if="isLoading" key="loading" />

    <UnderConstructionView
      v-else-if="isUnderConstruction && !hasAccess"
      key="construction"
    />

    <div v-else key="content" class="min-h-screen flex flex-col bg-[#0B0D10] text-[#E5E7EB]">
      <Navbar />

      <main class="flex-grow">
        <router-view v-slot="{ Component }">
          <transition name="fade" mode="out-in">
            <component :is="Component" />
          </transition>
        </router-view>
      </main>

      <Footer />
    </div>
  </transition>
</template>

<script setup lang="ts">
import { computed, onMounted, ref } from 'vue'
import Navbar from './components/Navbar.vue'
import Footer from './components/Footer.vue'
import LoadingScreen from './components/LoadingScreen.vue'
import UnderConstructionView from './views/UnderConstructionView.vue'
import { loadingService } from './services/loading.service'
import {
  fetchSiteSettings,
  isUnderConstruction,
  restoreConstructionAccess
} from './config/site'

const isLoading = computed(() => loadingService.isLoading.value)
const hasAccess = ref(false)

onMounted(async () => {
  loadingService.startLoading('Preparando acolhimento e proteção...')
  try {
    await fetchSiteSettings()
    hasAccess.value = await restoreConstructionAccess()
  } finally {
    await loadingService.stopLoading()
  }
})
</script>

<style>
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.25s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}
</style>

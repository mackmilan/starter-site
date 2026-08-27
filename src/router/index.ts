import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    component: () => import('../views/HomeView.vue')
  },
  {
    path: '/sobre',
    name: 'sobre',
    component: () => import('../views/SobreView.vue')
  },
  {
    path: '/fundamentacao',
    name: 'fundamentacao',
    component: () => import('../views/FundamentacaoView.vue')
  },
  {
    path: '/como-implantar',
    name: 'como-implantar',
    component: () => import('../views/ComoImplantarView.vue')
  },
  {
    path: '/noticias',
    name: 'noticias',
    component: () => import('../views/NoticiasView.vue')
  },
  {
    path: '/contato',
    name: 'contato',
    component: () => import('../views/ContatoView.vue')
  },
  {
    path: '/apoie',
    name: 'apoie',
    component: () => import('../views/ApoieView.vue')
  },
  {
    path: '/:pathMatch(.*)*',
    redirect: '/'
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior(_to, _from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    }
    return { top: 0 }
  }
})

export default router

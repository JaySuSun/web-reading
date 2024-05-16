import { createRouter, createWebHashHistory } from 'vue-router'

const router = createRouter({
  history: createWebHashHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      redirect: '/home'
    },
    {
      path: '/home',
      name: 'home',
      component: () => import('../views/index.vue')
    },
    {
      path: '/detail/:id',
      name: 'detail',
      component: () => import('../views/details.vue')
    },
    {
      path: '/document',
      name: 'document',
      component: () => import('../views/document.vue')
    },
    {
      path: '/upload',
      name: 'upload',
      component: () => import('../views/upload.vue')
    },
  
  ]
})

export default router

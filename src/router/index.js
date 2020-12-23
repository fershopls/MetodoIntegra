import { createRouter, createWebHistory } from '@ionic/vue-router';


const routes = [
  {
    path: '/',
    component: () => import("@/pages/HomeList.vue")
  },
  {
    path: '/protocol/:id',
    component: () => import("@/pages/ProtocolOverview.vue")
  },
  {
    path: '/create',
    component: () => import("@/pages/CreateProtocol.vue")
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

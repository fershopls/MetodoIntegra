import { createRouter, createWebHistory } from '@ionic/vue-router';


const routes = [
  {
    path: '/',
    redirect: '/home_list'
  },
  {
    path: '/home_list',
    component: () => import("@/pages/HomeList.vue")
  },
  {
    path: '/protocol/:id',
    component: () => import("@/pages/ProtocolOverview.vue")
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

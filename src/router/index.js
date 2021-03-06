import { createRouter, createWebHistory } from '@ionic/vue-router';


const routes = [
  {
    path: '/',
    component: () => import("@/pages/Home/Home.vue")
  },
  {
    path: '/developer',
    component: () => import("@/pages/Developer/Developer.vue")
  },
  {
    path: '/protocol/:id',
    component: () => import("@/pages/ProtocolOverview/ProtocolOverview.vue")
  },
  {
    path: '/create',
    component: () => import("@/pages/CreateProtocol.vue")
  },
  {
    path: '/welcome-screen',
    component: () => import("@/components/WelcomeScreen.vue")
  },
  {
    path: '/modal',
    component: () => import("@/pages/test/Modal.vue")
  },
  {
    path: '/test',
    component: () => import("@/pages/Test.vue")
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

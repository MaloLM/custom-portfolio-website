import { createRouter, createWebHashHistory } from 'vue-router'
import AboutMe from '../views/AboutMeView.vue'

const routes = [
  {
    path: '/',
    name: 'aboutMe',
    component: AboutMe
  },
  {
    path: '/career',
    name: 'career',
    component: () => import(/* webpackChunkName: "about" */ '../views/CareerView.vue')
  },
  {
    path: '/travels',
    name: 'travels',
    component: () => import(/* webpackChunkName: "about" */ '../views/TravelsView.vue')
  },
  {
    path: '/get-in-touch',
    name: 'getInTouch',
    component: () => import(/* webpackChunkName: "about" */ '../views/GetInTouchView.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import(/* webpackChunkName: "about" */ '../views/AdminView.vue')
  },
  {
    path: '/authentication',
    name: 'authentication',
    component: () => import(/* webpackChunkName: "about" */ '../views/AuthenticationView.vue')
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import(/* webpackChunkName: "about" */ '../views/NotFound.vue')
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

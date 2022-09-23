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
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/CareerView.vue')
  },
  {
    path: '/travels',
    name: 'travels',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/TravelsView.vue')
  },
  {
    path: '/get-in-touch',
    name: 'getInTouch',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/GetInTouchView.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AdminView.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router

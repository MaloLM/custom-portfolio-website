// Copyright (c) [2023] [Malo Le Mestre]
// This software is released under the MIT License
// https://opensource.org/licenses/MIT

import { createRouter, createWebHashHistory } from 'vue-router'
import AboutMe from '../views/AboutMe.vue'

const routes = [
  {
    path: '/',
    name: 'aboutMe',
    component: AboutMe,
  },
  {
    path: '/career',
    name: 'career',
    component: () => import(/* webpackChunkName: "about" */ '../views/Career.vue')
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import(/* webpackChunkName: "about" */ '../views/Contact.vue')
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import(/* webpackChunkName: "about" */ '../views/Admin.vue')
  },
  {
    path: '/authentication',
    name: 'authentication',
    component: () => import(/* webpackChunkName: "about" */ '../views/Authentication.vue')
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

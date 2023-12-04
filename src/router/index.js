// Copyright (c) [2023] [Malo Le Mestre]
// This software is released under the Apache 2.0 License
// https://www.apache.org/licenses/LICENSE-2.0.html


import { createRouter, createWebHashHistory } from 'vue-router'; // Importing Vue Router functions
import AboutMe from '../views/AboutMe.vue'; // Importing the AboutMe component

// Define the routes for your Vue application
const routes = [
  {
    path: '/',
    name: 'aboutMe', // Name of the route
    component: AboutMe, // Component to render when this route is accessed
  },
  {
    path: '/career',
    name: 'career',
    component: () => import(/* webpackChunkName: "about" */ '../views/Career.vue') // Lazy-loading Career component
  },
  {
    path: '/contact',
    name: 'contact',
    component: () => import(/* webpackChunkName: "about" */ '../views/Contact.vue') // Lazy-loading Contact component
  },
  {
    path: '/admin',
    name: 'admin',
    component: () => import(/* webpackChunkName: "about" */ '../views/Admin.vue') // Lazy-loading Admin component
  },
  {
    path: '/authentication',
    name: 'authentication',
    component: () => import(/* webpackChunkName: "about" */ '../views/Authentication.vue') // Lazy-loading Authentication component
  },
  {
    path: "/:pathMatch(.*)*",
    name: "NotFound",
    component: () => import(/* webpackChunkName: "about" */ '../views/NotFound.vue') // Lazy-loading NotFound component
  },
]

// Create a Vue Router instance with the defined routes and history mode
const router = createRouter({
  history: createWebHashHistory(), // Using hash mode for routing
  routes // Pass the defined routes to the router instance
})

export default router // Export the router instance to use it in your Vue application

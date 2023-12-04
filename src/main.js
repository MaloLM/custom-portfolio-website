// Copyright (c) [2023] [Malo Le Mestre]
// This software is released under the Apache 2.0 License
// https://www.apache.org/licenses/LICENSE-2.0.html


import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import WaveUI from 'wave-ui'
import 'wave-ui/dist/wave-ui.css'
 
// Initialize Vue app with Vuex store and Vue Router
const app = createApp(App).use(store).use(router)

// Setup WaveUI with the Vue app
new WaveUI(app, {})

// Mount the Vue app to the #app element
app.mount('#app')



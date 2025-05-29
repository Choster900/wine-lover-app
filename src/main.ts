import './assets/css/style.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

import App from './App.vue'
import router from './router'

import { fetchUserFromToken } from '@/modules/auth/actions/auth.action'


const app = createApp(App)
const queryClient = new QueryClient()

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

app.use(pinia)
app.use(VueQueryPlugin, { queryClient })
app.use(router)

fetchUserFromToken()

app.mount('#app')

import './assets/css/style.css'
import '@fortawesome/fontawesome-free/css/all.min.css';
import { VueQueryPlugin, QueryClient } from '@tanstack/vue-query'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)
const queryClient = new QueryClient()

app.use(createPinia())
app.use(VueQueryPlugin, { queryClient })
app.use(router)

app.mount('#app')

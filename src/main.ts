import { createApp } from 'vue'
import App from './App.vue'
import { createPinia } from 'pinia'
import router from "./router";

import 'virtual:windi.css'
import 'virtual:windi-devtools'
import "./styles/main.css"

const app = createApp(App)
app.use(createPinia())
app.use(router)
app.mount('#app')

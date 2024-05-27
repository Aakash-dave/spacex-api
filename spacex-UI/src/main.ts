import './assets/main.css'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import Vue3Toastify, { type ToastContainerOptions } from 'vue3-toastify';

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'

const app = createApp(App)

app.use(Vue3Toastify, {
    autoClose: 2000,
    transition: 'zoom',
    limit: 2,
    position: 'top-center'
} as ToastContainerOptions);

app.use(createPinia())
app.use(router)

app.mount('#app')

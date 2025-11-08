<<<<<<< HEAD
import { createApp } from 'vue' // Importa la funzione per creare l'app Vue
import App from './App.vue' // Importa il componente principale
import router from './router' // Importa il router

const app = createApp(App) // Crea l'app Vue
app.use(router) // Aggiunge il router all'app
app.mount('#app') // Monta l'app nel div con id="app"
=======
<<<<<<< HEAD
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import './registerServiceWorker'

Vue.config.productionTip = false

new Vue({
    router,
    render: h => h(App)
}).$mount('#app')
=======
import { createApp } from 'vue' // Importa la funzione per creare l'app Vue
import App from './App.vue' // Importa il componente principale
import router from './router' // Importa il router

const app = createApp(App) // Crea l'app Vue
app.use(router) // Aggiunge il router all'app
app.mount('#app') // Monta l'app nel div con id="app"
>>>>>>> 5e35342 (Initial commit: progetto Vue con routing e PWA)
>>>>>>> c24b677 (Fix: package.json pulito e coerente con Vue 3 + Vite + PWA)

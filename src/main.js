import { createApp } from 'vue' // Importa la funzione per creare l'app Vue
import App from './App.vue' // Importa il componente principale
import router from './router' // Importa il router

const app = createApp(App) // Crea l'app Vue
app.use(router) // Aggiunge il router all'app
app.mount('#app') // Monta l'app nel div con id="app"

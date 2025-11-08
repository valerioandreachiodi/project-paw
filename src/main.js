// Importa la funzione per creare l'app Vue
import { createApp } from 'vue'

// Importa il componente principale
import App from './App.vue'

// Importa il router
import router from './router'

// Crea l'app Vue
const app = createApp(App)

// Aggiunge il router all'app
app.use(router)

// Monta l'app nel div con id="app"
app.mount('#app')


import { createRouter, createWebHistory } from 'vue-router' // Importa le funzioni per creare il router
import HomeView from '../views/HomeView.vue' // Importa la vista Home
import AboutView from '../views/AboutView.vue' // 👈 Importa la nuova pagina

const routes = [
    {
        path: '/', // URL della route
        name: 'home', // Nome interno della route
        component: HomeView // Componente da mostrare
    },
    {
        path: '/about', // 👈 Nuova route
        name: 'about',
        component: AboutView
    }
]

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL), // Usa la modalità history (URL puliti)
routes // Registra le route
})

export default router // Esporta il router per usarlo nell'app

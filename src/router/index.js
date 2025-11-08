<<<<<<< HEAD
import { createRouter, createWebHistory } from 'vue-router' // Importa le funzioni per creare il router
import HomeView from '../views/HomeView.vue' // Importa la vista Home
import AboutView from '../views/AboutView.vue' // 👈 Importa la nuova pagina
=======
<<<<<<< HEAD
import { createRouter, createWebHistory } from 'vue-router';
import Auth from '../components/Auth.vue';
import Home from '../views/Home.vue';
>>>>>>> c24b677 (Fix: package.json pulito e coerente con Vue 3 + Vite + PWA)

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

<<<<<<< HEAD
export default router // Esporta il router per usarlo nell'app
=======
export default router;
=======
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
>>>>>>> 5e35342 (Initial commit: progetto Vue con routing e PWA)
>>>>>>> c24b677 (Fix: package.json pulito e coerente con Vue 3 + Vite + PWA)

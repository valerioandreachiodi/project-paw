import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import Register from '../views/Register.vue'
import Login from '../views/Login.vue'
import ResetPassword from '../views/ResetPassword.vue'
import Pagina1 from '../views/Pagina1.vue'
import Pagina2 from '../views/Pagina2.vue'
import Pagina3 from '../views/Pagina3.vue'
import Pagina4 from '../views/Pagina4.vue'
import Pagina5 from '../views/Pagina5.vue'
import Pagina6 from '../views/Pagina6.vue'

import { supabase } from '../supabase'   // ➕ importa Supabase per controllare l'utente

const routes = [
    { path: '/', name: 'Home', component: HomeView },
{ path: '/login', name: 'Login', component: Login },
{ path: '/register', name: 'Register', component: Register },
{ path: '/reset-password', name: 'ResetPassword', component: ResetPassword },
{ path: '/pagina1', name: 'Pagina1', component: Pagina1 },
{ path: '/pagina2', name: 'Pagina2', component: Pagina2 },
{ path: '/pagina3', name: 'Pagina3', component: Pagina3 },
{ path: '/pagina4', name: 'Pagina4', component: Pagina4 },
{ path: '/pagina5', name: 'Pagina5', component: Pagina5 },
{ path: '/pagina6', name: 'Pagina6', component: Pagina6 },
]

const router = createRouter({
    history: createWebHistory(),
                            routes
})

// ➕ Guardia globale
router.beforeEach(async (to, from, next) => {
    const { data: { user } } = await supabase.auth.getUser()

    if (!user && to.name !== 'Login' && to.name !== 'Register' && to.name !== 'ResetPassword') {
        // se non sei loggato e non stai andando a login/register/reset → redirect
        next({ name: 'Login' })
    } else {
        next()
    }
})

export default router

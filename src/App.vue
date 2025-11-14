<template>
  <!-- 🔹 Barra di navigazione -->
  <nav class="navbar">
    <div class="nav-left">
      <router-link to="/">Home</router-link> |
      <router-link to="/about">Chi siamo</router-link>
    </div>
    <div class="nav-right">
      <button @click="logout" class="logout-btn">Logout</button>
    </div>
  </nav>

  <!-- 🔹 Mostra il componente della route attiva -->
  <router-view />

  <!-- 🔹 Footer globale -->
  <footer class="footer">
    © 2025 Project Paw ENPA - Tutti i diritti riservati
  </footer>
</template>

<script setup>
import { supabase } from './supabase'
import { useRouter } from 'vue-router'

const router = useRouter()

// 🔹 Funzione Logout
const logout = async () => {
  await supabase.auth.signOut()
  router.push({ name: 'Login' })
}
</script>

<style>
/* 🔹 Navbar */
.navbar {
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #353535; /* sfondo scuro elegante */
  padding: 1rem 2rem;
  font-size: 18px;
  font-family: "Segoe UI", Roboto, sans-serif;
}

/* 🔹 Link ENPA */
.nav-left a {
  margin: 0 10px;
  text-decoration: none;
  color: #1BA7A1; /* verde acqua ENPA */
  font-weight: 600;
  transition: color 0.2s ease;
}
.nav-left a:hover {
  color: #42b983; /* verde brillante ENPA */
}

/* 🔹 Pulsante Logout corallo/arancione elegante */
.logout-btn {
  padding: 8px 16px;
  background-color: #FF6F61; /* corallo elegante */
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s ease;
}
.logout-btn:hover {
  background-color: #E65C50; /* corallo più scuro */
}

/* 🔹 Footer */
.footer {
  background-color: #353535; /* stesso sfondo della navbar */
  text-align: center;
  padding: 1rem;
  font-size: 0.9rem;
  color: #1BA7A1; /* verde acqua ENPA */
  margin-top: 20px;
}
</style>

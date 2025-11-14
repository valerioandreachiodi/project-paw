<template>
  <div class="home">
    <!-- 🔹 Contenuto principale -->
    <main class="main-content">
      <h1>Benvenuto su Project Paw 🐾</h1>

      <div v-if="loading">Caricamento profilo...</div>
      <div v-else-if="profile">
        <p><strong>Nome utente:</strong> {{ profile.username }}</p>
        <p><strong>Ruolo:</strong> {{ profile.role }}</p>
      </div>
      <div v-else>
        <p>Effettua il login per visualizzare il tuo profilo.</p>
      </div>

      <!-- 🔹 Griglia di pulsanti ENPA -->
      <div class="button-grid">
        <router-link v-for="n in 6" :key="n" :to="`/pagina${n}`" class="icon-button">
          <img :src="icons[n-1]" alt="Icona Pagina" />
          <span>Pagina {{ n }}</span>
        </router-link>
      </div>
    </main>

    <!-- 🔹 Footer elegante -->

</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../supabase'
import { useRouter } from 'vue-router'

// 🔹 importa le icone locali da src/assets
import icon1 from '../assets/open-book.png'
import icon2 from '../assets/calendar.png'
import icon3 from '../assets/golden-retriever.png'
import icon4 from '../assets/cat.png'
import icon5 from '../assets/health-checkup.png'
import icon6 from '../assets/physics.png'

const icons = [icon1, icon2, icon3, icon4, icon5, icon6]

const profile = ref(null)
const loading = ref(true)
const router = useRouter()

onMounted(async () => {
  const { data: { user } } = await supabase.auth.getUser()
  if (user) {
    const { data, error } = await supabase
      .from('profiles')
      .select('username, role')
      .eq('id', user.id)
      .single()
    if (!error) profile.value = data
  }
  loading.value = false
})

// 🔹 Funzione Logout
const logout = async () => {
  await supabase.auth.signOut()
  router.push({ name: 'Login' })
}
</script>

<style scoped>
:root {
  --black-elegant: #2C2C2C;   /* Charcoal */
  --black-soft: #353535;      /* Onyx */
  --black-graphite: #3A3A3A;  /* Graphite */
  --white: #F5F5F5;
  --accent: #1BA7A1;          /* Teal accent */
  --scuro: #353535            /* Scuro elegante */
}

.home {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  background-color: var(--black-elegant);
  color: var(--white);
  font-family: "Segoe UI", Roboto, sans-serif;
}

/* 🔹 Header */
.top-bar {
  background-color: var(--black-soft);
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 1rem 2rem;
}
.logo {
  font-size: 1.4em;
  font-weight: bold;
  color: var(--white);
}
.nav-links a {
  color: var(--white);
  margin: 0 1rem;
  text-decoration: none;
  font-weight: 600;
}
.nav-links a:hover {
  color: var(--accent);
}
.logout-area {
  margin-left: auto;
}
.logout-btn {
  padding: 6px 14px;
  background-color: #ff4d4d;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  font-weight: bold;
  transition: background-color 0.2s ease;
}
.logout-btn:hover {
  background-color: #e60000;
}

/* 🔹 Main */
.main-content {
  flex: 1;
  max-width: 1000px;
  margin: 40px auto;
  padding: 20px;
  text-align: center;
}
h1 {
  color: var(--accent);
  margin-bottom: 20px;
}
p {
  font-size: 1.1em;
}
strong {
  color: var(--white);
}

/* 🔹 Griglia pulsanti */
.button-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(140px, 1fr));
  gap: 20px;
  margin-top: 30px;
}
.icon-button {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: var(--black-graphite);
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0,0,0,.4);
  padding: 20px;
  text-decoration: none;
  color: var(--white);
  font-weight: bold;
  transition: transform 0.2s ease, background-color 0.2s ease;
}
.icon-button:hover {
  transform: translateY(-5px);
  background-color: var(--black-soft);
}
.icon-button img {
  width: 60px;
  height: 60px;
  margin-bottom: 10px;
  object-fit: contain;
}
.icon-button span {
  font-size: 1.1em;
}

/* 🔹 Footer */
.bottom-bar {
  background-color: var(--scuro);
  text-align: center;
  padding: 1rem;
  font-size: 0.9rem;
  color: #1BA7A1;
}
</style>

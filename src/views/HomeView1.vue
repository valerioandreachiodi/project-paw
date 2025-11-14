<template>
  <div class="home">
    <h1>Benvenuto su Project Paw 🐾</h1>

    <div v-if="loading">Caricamento profilo...</div>
    <div v-else-if="profile">
      <p><strong>Nome utente:</strong> {{ profile.username }}</p>
      <p><strong>Ruolo:</strong> {{ profile.role }}</p>
      <!-- 🔹 Pulsante Logout -->
      <button @click="logout" class="logout-btn">Logout</button>
    </div>
    <div v-else>
      <p>Effettua il login per visualizzare il tuo profilo.</p>
    </div>

    <!-- 🔹 Griglia di pulsanti con icone -->
    <div class="button-grid">
      <router-link v-for="n in 6" :key="n" :to="`/pagina${n}`" class="icon-button">
        <img :src="icons[n-1]" alt="Icona Pagina" />
        <span>Pagina {{ n }}</span>
      </router-link>
    </div>
  </div>
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
  const {
    data: { user }
  } = await supabase.auth.getUser()

  if (user) {
    const { data, error } = await supabase
      .from('profiles')
      .select('username, role')
      .eq('id', user.id)
      .single()

    if (!error) {
      profile.value = data
    }
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
.home {
  max-width: 1000px;
  margin: 50px auto;
  padding: 20px;
  background-color: #f0f8ff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 119, 182, 0.2);
  font-family: sans-serif;
  text-align: center;
}
h1 {
  color: #0077b6;
  margin-bottom: 20px;
}
p {
  font-size: 1.1em;
  color: #333;
}
strong {
  color: #005f8a;
}

/* 🔹 Pulsante Logout */
.logout-btn {
  margin-top: 15px;
  padding: 8px 16px;
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
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 119, 182, 0.2);
  padding: 20px;
  text-decoration: none;
  color: #0077b6;
  font-weight: bold;
  transition: transform 0.2s ease, background-color 0.2s ease;
}
.icon-button:hover {
  transform: translateY(-5px);
  background-color: #e6f7ff;
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
</style>

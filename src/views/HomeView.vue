<template>
  <div class="home">
    <h1>Benvenuto su Project Paw 🐾</h1>

    <div v-if="loading">Caricamento profilo...</div>
    <div v-else-if="profile">
      <p><strong>Nome utente:</strong> {{ profile.username }}</p>
      <p><strong>Ruolo:</strong> {{ profile.role }}</p>
    </div>
    <div v-else>
      <p>Effettua il login per visualizzare il tuo profilo.</p>
    </div>

    <!-- 🔹 Griglia di card -->
    <div class="card-grid">
      <div class="card" v-for="n in 6" :key="n">
        <img :src="`https://picsum.photos/300/200?random=${n}`" alt="Card image" />
        <h3>Pagina {{ n }}</h3>
        <router-link :to="`/pagina${n}`" class="card-button">Vai</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../supabase'

const profile = ref(null)
const loading = ref(true)

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

/* 🔹 Stile griglia card */
.card-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
  gap: 20px;
  margin-top: 30px;
}
.card {
  background: white;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 119, 182, 0.2);
  overflow: hidden;
  text-align: center;
  transition: transform 0.2s ease;
}
.card:hover {
  transform: translateY(-5px);
}
.card img {
  width: 100%;
  height: 160px;
  object-fit: cover;
}
.card h3 {
  margin: 15px 0;
  color: #0077b6;
}
.card-button {
  display: inline-block;
  margin-bottom: 15px;
  padding: 10px 20px;
  background-color: #0077b6;
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
}
.card-button:hover {
  background-color: #005f8a;
}
</style>

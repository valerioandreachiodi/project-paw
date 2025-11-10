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
  max-width: 600px;
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
</style>

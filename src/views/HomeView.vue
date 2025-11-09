<template>
  <div class="home">
    <h1>Benvenuto su Project Paw 🐾</h1>
    <p>Questa è la tua homepage dedicata, pronta per essere pubblicata.</p>

    <div v-if="loading">Caricamento dati utente...</div>
    <div v-else-if="user">
      <h2>Ciao, {{ username }}!</h2>
      <p>Il tuo ruolo è: <strong>{{ role }}</strong></p>
    </div>
    <div v-else>
      <p>Effettua il login per vedere i tuoi dati.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../supabase'

const user = ref(null)
const username = ref('')
const role = ref('')
const loading = ref(true)

onMounted(async () => {
  const { data: authData, error: authError } = await supabase.auth.getUser()
  if (authError) {
    console.error('Errore nel recupero utente:', authError.message)
    loading.value = false
    return
  }

  if (authData?.user) {
    user.value = authData.user

    const { data: profile, error: profileError } = await supabase
      .from('profiles')
      .select('username, role')
      .eq('id', authData.user.id)
      .single()

    if (profileError) {
      console.error('Errore nel recupero profilo:', profileError.message)
    } else {
      username.value = profile?.username || authData.user.email
      role.value = profile?.role || 'user'
    }
  }

  loading.value = false
})
</script>

<style scoped>
.home {
  text-align: center;
  margin-top: 50px;
  font-family: sans-serif;
}
</style>

<template>
  <div class="home" v-if="user">
    <h1>Benvenuto su Project Paw 🐾</h1>
    <p>Questa è la tua homepage dedicata, pronta per essere pubblicata.</p>
    <h2>Ciao, {{ username }}!</h2>
    <p>Il tuo ruolo è: <strong>{{ role }}</strong></p>
  </div>
  <div v-else>
    <p>🔒 Devi accedere per visualizzare questa pagina.</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../supabase'
import { useRouter } from 'vue-router'

const user = ref(null)
const username = ref('')
const role = ref('')
const router = useRouter()

onMounted(async () => {
  const { data: authData } = await supabase.auth.getUser()
  if (!authData?.user) {
    router.push('/login')
    return
  }

  user.value = authData.user

  const { data: profile } = await supabase
    .from('profiles')
    .select('username, role')
    .eq('id', authData.user.id)
    .single()

  username.value = profile?.username || authData.user.email
  role.value = profile?.role || 'user'
})
</script>

<style scoped>
.home {
  text-align: center;
  margin-top: 50px;
  font-family: sans-serif;
}
</style>

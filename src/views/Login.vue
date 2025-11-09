<template>
  <div class="login">
    <h2>Accedi</h2>
    <form @submit.prevent="handleLogin">
      <label>Email:</label>
      <input type="email" v-model="email" required />

      <label>Password:</label>
      <input type="password" v-model="password" required />

      <label>
        <input type="checkbox" v-model="rememberMe" />
        Ricordami
      </label>

      <button type="submit" :disabled="loading">
        {{ loading ? 'Accesso in corso...' : 'Accedi' }}
      </button>

      <p v-if="error" class="error">{{ error }}</p>

      <div class="links">
        <router-link to="/register">Registrati</router-link> |
        <router-link to="/reset-password">Recupera password</router-link>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '../supabase'
import { useRouter } from 'vue-router'

const email = ref('')
const password = ref('')
const rememberMe = ref(false)
const loading = ref(false)
const error = ref('')
const router = useRouter()

const handleLogin = async () => {
  loading.value = true
  error.value = ''

  const { error: loginError } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  })

  if (loginError) {
    error.value = loginError.message
  } else {
    // Ricordami: salva sessione nel localStorage
    if (rememberMe.value) {
      const { data } = await supabase.auth.getSession()
      localStorage.setItem('supabase_session', JSON.stringify(data.session))
    }
    router.push('/')
  }

  loading.value = false
}
</script>

<style scoped>
.login {
  max-width: 400px;
  margin: 50px auto;
  font-family: sans-serif;
}
label {
  display: block;
  margin-top: 15px;
}
input[type="email"],
input[type="password"] {
  width: 100%;
  padding: 8px;
  margin-top: 5px;
}
button {
  margin-top: 20px;
  padding: 10px;
  width: 100%;
}
.error {
  color: red;
  margin-top: 10px;
}
.links {
  margin-top:

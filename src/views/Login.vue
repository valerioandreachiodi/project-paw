<template>
  <div class="auth-container">
    <form @submit.prevent="handleLogin" class="auth-form">
      <h2>Accedi</h2>

      <label>Email</label>
      <input type="email" v-model="email" required />

      <label>Password</label>
      <input type="password" v-model="password" required />

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
    router.push('/')
  }

  loading.value = false
}
</script>

<style scoped>
.auth-container {
  background-color: #f0f8ff;
  min-height: 100vh;
  display: flex;
  justify-content: center;
  align-items: center;
}
.auth-form {
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 119, 182, 0.2);
  width: 100%;
  max-width: 400px;
  font-family: sans-serif;
}
.auth-form h2 {
  text-align: center;
  color: #0077b6;
  margin-bottom: 20px;
}
label {
  display: block;
  margin-top: 15px;
  color: #333;
}
input {
  width: 100%;
  padding: 10px;
  margin-top: 5px;
  border: 1px solid #ccc;
  border-radius: 8px;
}
button {
  margin-top: 20px;
  width: 100%;
  padding: 12px;
  background-color: #0077b6;
  color: white;
  border: none;
  border-radius: 8px;
  font-weight: bold;
  cursor: pointer;
}
button:hover {
  background-color: #005f8a;
}
.error {
  color: #d32f2f;
  margin-top: 10px;
  text-align: center;
}
.links {
  margin-top: 20px;
  text-align: center;
  font-size: 0.9em;
}
.links a {
  color: #0077b6;
  text-decoration: none;
}
.links a:hover {
  text-decoration: underline;
}
</style>

<template>
  <div class="auth-container">
    <form @submit.prevent="handleRegister" class="auth-form">
      <h2>Registrati</h2>

      <label>Email</label>
      <input type="email" v-model="email" required />

      <label>Password</label>
      <input type="password" v-model="password" required />

      <label>Nome utente</label>
      <input type="text" v-model="username" required />

      <button type="submit" :disabled="loading">
        {{ loading ? 'Registrazione in corso...' : 'Registrati' }}
      </button>

      <p v-if="error" class="error">{{ error }}</p>
      <p v-if="success" class="success">Registrazione completata! Controlla la tua email per confermare.</p>

      <div class="links">
        <router-link to="/login">Hai già un account? Accedi</router-link>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '../supabase'

const email = ref('')
const password = ref('')
const username = ref('')
const loading = ref(false)
const error = ref('')
const success = ref(false)

const handleRegister = async () => {
  loading.value = true
  error.value = ''
  success.value = false

  const { data, error: signUpError } = await supabase.auth.signUp({
    email: email.value,
    password: password.value,
    options: {
      data: {
        username: username.value
      },
      redirectTo: 'https://project-paw.pages.dev/login' // ✅ redirect dopo conferma email
    }
  })

  if (signUpError) {
    error.value = signUpError.message
    loading.value = false
    return
  }

  const userId = data?.user?.id
  if (userId) {
    const { error: profileError } = await supabase.from('profiles').insert({
      id: userId,
      username: username.value,
      role: 'user'
    })

    if (profileError) {
      error.value = profileError.message
    } else {
      success.value = true
      email.value = ''
      password.value = ''
      username.value = ''
    }
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
.success {
  color: #2e7d32;
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

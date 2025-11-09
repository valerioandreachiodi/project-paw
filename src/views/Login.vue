<template>
  <div class="login">
    <h2>Accedi</h2>
    <form @submit.prevent="handleLogin">
      <label>Email:</label>
      <input type="email" v-model="email" required />

      <label>Password:</label>
      <input type="password" v-model="password" required />

      <button type="submit" :disabled="loading">
        {{ loading ? 'Accesso in corso...' : 'Accedi' }}
      </button>

      <p v-if="error" class="error">{{ error }}</p>
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
.login {
  max-width: 400px;
  margin: 50px auto;
  font-family: sans-serif;
}
label {
  display: block;
  margin-top: 15px;
}
input {
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
</style>

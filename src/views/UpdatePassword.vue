<template>
  <div class="auth-container">
    <form @submit.prevent="handleUpdate" class="auth-form">
      <h2>Imposta nuova password</h2>

      <label>Nuova password</label>
      <input type="password" v-model="newPassword" required />

      <button type="submit" :disabled="loading">
        {{ loading ? 'Aggiornamento in corso...' : 'Aggiorna password' }}
      </button>

      <p v-if="message" class="success">{{ message }}</p>
      <p v-if="error" class="error">{{ error }}</p>

      <div class="links">
        <router-link to="/login">Torna al login</router-link>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '../supabase'

const newPassword = ref('')
const loading = ref(false)
const error = ref('')
const message = ref('')

const handleUpdate = async () => {
  loading.value = true
  error.value = ''
  message.value = ''

  const { error: updateError } = await supabase.auth.updateUser({
    password: newPassword.value
  })

  if (updateError) {
    error.value = updateError.message
  } else {
    message.value = 'Password aggiornata con successo! Ora puoi accedere.'
    newPassword.value = ''
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
.success {
  color: #2e7d32;
  margin-top: 10px;
  text-align: center;
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

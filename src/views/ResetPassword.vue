<template>
  <div class="reset">
    <h2>Recupera password</h2>
    <form @submit.prevent="handleReset">
      <label>Email:</label>
      <input type="email" v-model="email" required />

      <button type="submit" :disabled="loading">
        {{ loading ? 'Invio in corso...' : 'Invia link di reset' }}
      </button>

      <p v-if="message" class="success">{{ message }}</p>
      <p v-if="error" class="error">{{ error }}</p>
    </form>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { supabase } from '../supabase'

const email = ref('')
const loading = ref(false)
const error = ref('')
const message = ref('')

const handleReset = async () => {
  loading.value = true
  error.value = ''
  message.value = ''

  const { error: resetError } = await supabase.auth.resetPasswordForEmail(email.value, {
    redirectTo: 'https://project-paw.pages.dev/update-password' // 👈 pagina di conferma
  })

  if (resetError) {
    error.value = resetError.message
  } else {
    message.value = 'Email inviata! Controlla la tua casella di posta.'
  }

  loading.value = false
}
</script>

<style scoped>
.reset {
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
.success {
  color: green;
  margin-top: 10px;
}
.error {
  color: red;
  margin-top: 10px;
}
</style>

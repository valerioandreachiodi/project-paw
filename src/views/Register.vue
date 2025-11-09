<template>
  <div class="register">
    <h2>Registrati</h2>
    <form @submit.prevent="handleRegister">
      <label>Email:</label>
      <input type="email" v-model="email" required />

      <label>Password:</label>
      <input type="password" v-model="password" required />

      <label>Nome utente:</label>
      <input type="text" v-model="username" required />

      <button type="submit" :disabled="loading">
        {{ loading ? 'Registrazione in corso...' : 'Registrati' }}
      </button>

      <p v-if="error" class="error">{{ error }}</p>
      <p v-if="success" class="success">Registrazione completata! Ora puoi effettuare il login.</p>
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
      }
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
.register {
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
.success {
  color: green;
  margin-top: 10px;
}
</style>

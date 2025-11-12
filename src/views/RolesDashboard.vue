<template>
  <div class="dashboard">
    <h2>Gestione Ruoli 👑</h2>

    <div v-if="loading">Caricamento utenti...</div>
    <div v-else>
      <table>
        <thead>
          <tr>
            <th>Email</th>
            <th>Username</th>
            <th>Ruolo</th>
            <th>Azioni</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="user in users" :key="user.id">
            <td>{{ user.email }}</td>
            <td>{{ user.username }}</td>
            <td>
              <select v-model="user.role" @change="updateRole(user)">
                <option value="user">User</option>
                <option value="admin">Admin</option>
                <option value="moderator">Moderator</option>
              </select>
            </td>
            <td>
              <button @click="updateRole(user)">Aggiorna</button>
            </td>
          </tr>
        </tbody>
      </table>
    </div>

    <p v-if="error" class="error">{{ error }}</p>
    <p v-if="message" class="success">{{ message }}</p>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { supabase } from '../supabase'

const users = ref([])
const loading = ref(true)
const error = ref('')
const message = ref('')

onMounted(async () => {
  const { data, error: fetchError } = await supabase
    .from('profiles')
    .select('id, username, role, auth.users(email)')

  if (fetchError) {
    error.value = fetchError.message
  } else {
    // Supabase non fa join diretta, quindi meglio gestire email separatamente
    const { data: authUsers } = await supabase.auth.admin.listUsers()
    users.value = data.map(profile => {
      const authUser = authUsers.users.find(u => u.id === profile.id)
      return {
        ...profile,
        email: authUser?.email || 'N/D'
      }
    })
  }

  loading.value = false
})

const updateRole = async (user) => {
  const { error: updateError } = await supabase
    .from('profiles')
    .update({ role: user.role })
    .eq('id', user.id)

  if (updateError) {
    error.value = updateError.message
  } else {
    message.value = `Ruolo aggiornato per ${user.username} (${user.email})`
  }
}
</script>

<style scoped>
.dashboard {
  max-width: 800px;
  margin: 40px auto;
  padding: 20px;
  background: #f0f8ff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 119, 182, 0.2);
  font-family: sans-serif;
}
h2 {
  text-align: center;
  color: #0077b6;
  margin-bottom: 20px;
}
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  padding: 12px;
  border: 1px solid #ccc;
  text-align: center;
}
select {
  padding: 6px;
  border-radius: 6px;
}
button {
  padding: 6px 12px;
  background-color: #0077b6;
  color: white;
  border: none;
  border-radius: 6px;
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
</style>

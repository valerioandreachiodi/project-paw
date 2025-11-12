<template>
  <div class="page">
    <h2>Quaderno condiviso ✍️</h2>

    <!-- Form scrittura -->
    <form @submit.prevent="addNote" class="note-form">
      <textarea v-model="newNote" placeholder="Scrivi qui..." required></textarea>
      <button type="submit" :disabled="loading">Salva</button>
    </form>

    <p v-if="error" class="error">{{ error }}</p>

    <!-- Lista note -->
    <div class="notes">
      <div v-for="note in notes" :key="note.id" class="note">
        <small class="date">{{ formatDate(note.created_at) }}</small>
        <p class="content">{{ note.content }}</p>
        <div class="note-footer">
          <small class="author">✍️ {{ note.username }}</small>
          <!-- 🔹 Mostra cestino solo se la nota è dell'utente loggato -->
          <button v-if="note.user_id === currentUserId" @click="deleteNote(note.id)" class="delete-btn">🗑️</button>
        </div>
      </div>
    </div>

    <router-link to="/" class="back-button">⬅ Torna alla Home</router-link>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { supabase } from '../supabase'

const newNote = ref('')
const notes = ref([])
const loading = ref(false)
const error = ref('')
const currentUserId = ref(null)

onMounted(async () => {
  const { data: { user } } = await supabase.auth.getUser()
  currentUserId.value = user?.id || null

  await fetchNotes()

  // 🔹 realtime: ascolta nuovi insert
  supabase
    .channel('notes-channel')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'notes' },
      async payload => {
        const n = payload.new
        const username = await fetchUsername(n.user_id)
        notes.value.unshift({
          id: n.id,
          content: n.content,
          created_at: n.created_at,
          user_id: n.user_id,
          username
        })
      }
    )
    .on(
      'postgres_changes',
      { event: 'DELETE', schema: 'public', table: 'notes' },
      payload => {
        notes.value = notes.value.filter(n => n.id !== payload.old.id)
      }
    )
    .subscribe()
})

onUnmounted(() => {
  supabase.removeChannel('notes-channel')
})

const fetchNotes = async () => {
  const { data, error: fetchError } = await supabase
    .from('notes')
    .select('id, content, created_at, user_id, profiles(username)')
    .order('created_at', { ascending: false })

  if (fetchError) {
    error.value = fetchError.message
  } else {
    notes.value = data.map(n => ({
      id: n.id,
      content: n.content,
      created_at: n.created_at,
      user_id: n.user_id,
      username: n.profiles?.username || 'Anonimo'
    }))
  }
}

const fetchUsername = async (userId) => {
  const { data } = await supabase
    .from('profiles')
    .select('username')
    .eq('id', userId)
    .single()
  return data?.username || 'Anonimo'
}

const addNote = async () => {
  loading.value = true
  error.value = ''

  const { data: { user } } = await supabase.auth.getUser()
  if (!user) {
    error.value = 'Devi essere loggato per scrivere.'
    loading.value = false
    return
  }

  const { error: insertError } = await supabase
    .from('notes')
    .insert({
      user_id: user.id,
      content: newNote.value
    })

  if (insertError) {
    error.value = insertError.message
  } else {
    newNote.value = ''
    // realtime aggiorna automaticamente
  }

  loading.value = false
}

const deleteNote = async (noteId) => {
  const { error: deleteError } = await supabase
    .from('notes')
    .delete()
    .eq('id', noteId)

  if (deleteError) {
    error.value = deleteError.message
  }
}

const formatDate = (dateStr) => {
  const d = new Date(dateStr)
  return d.toLocaleString()
}
</script>

<style scoped>
.page {
  max-width: 700px;
  margin: 40px auto;
  padding: 20px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 119, 182, 0.2);
  text-align: center;
}
h2 {
  color: #0077b6;
  margin-bottom: 20px;
}
.note-form {
  display: flex;
  flex-direction: column;
  gap: 10px;
  margin-bottom: 20px;
}
textarea {
  min-height: 80px;
  padding: 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
}
button {
  align-self: flex-end;
  padding: 8px 16px;
  background-color: #0077b6;
  color: white;
  border: none;
  border-radius: 8px;
  cursor: pointer;
}
button:hover {
  background-color: #005f8a;
}
.notes {
  display: flex;
  flex-direction: column;
  gap: 15px;
}
.note {
  background: #f0f8ff;
  border-radius: 8px;
  padding: 15px;
  text-align: left;
  box-shadow: 0 2px 6px rgba(0, 119, 182, 0.1);
}
.date {
  font-size: 0.8em;
  color: #555;
}
.content {
  margin: 10px 0;
  font-size: 1.1em;
}
.note-footer {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
.author {
  font-size: 0.9em;
  color: #0077b6;
}
.delete-btn {
  background: transparent;
  border: none;
  cursor: pointer;
  font-size: 1.2em;
}
.delete-btn:hover {
  color: #d32f2f;
}
.back-button {
  display: inline-block;
  margin-top: 20px;
  padding: 10px 20px;
  background-color: #0077b6;
  color: white;
  border-radius: 8px;
  text-decoration: none;
}
.back-button:hover {
  background-color: #005f8a;
}
.error {
  color: #d32f2f;
  margin-bottom: 10px;
}
</style>

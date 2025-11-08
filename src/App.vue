<template>
  <!-- Navigazione con link alle route -->
  <nav>
    <router-link to="/">Home</router-link> |
    <router-link to="/about">Chi siamo</router-link>
  </nav>

  <!-- Mostra il componente della route attiva -->
  <router-view />
</template>

<script setup>
// Nessuna logica necessaria qui per ora
</script>

<style>
/* Stili globali opzionali */
nav {
  text-align: center;
  margin-top: 20px;
  font-size: 18px;
}

router-link {
  margin: 0 10px;
  text-decoration: none;
  color: #42b983;
}
</style>

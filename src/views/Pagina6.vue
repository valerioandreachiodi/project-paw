<template>
  <div class="page">
    <h2>Questa è Pagina 6</h2>
    <p>Contenuto della pagina 6.</p>

    <router-link to="/" class="back-button">⬅ Torna alla Home</router-link>
  </div>
</template>

<style scoped>
.page {
  max-width: 600px;
  margin: 50px auto;
  padding: 20px;
  background: #fff;
  border-radius: 12px;
  box-shadow: 0 4px 12px rgba(0, 119, 182, 0.2);
  text-align: center;
}
h2 {
  color: #0077b6;
  margin-bottom: 15px;
}
p {
  color: #333;
  margin-bottom: 20px;
}
.back-button {
  display: inline-block;
  padding: 10px 20px;
  background-color: #0077b6;
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
}
.back-button:hover {
  background-color: #005f8a;
}
</style>

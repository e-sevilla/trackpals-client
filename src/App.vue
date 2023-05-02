<script setup>
  import { ref, onMounted } from "vue";
  import { RouterLink, RouterView } from 'vue-router';
  import BotonUsuarioActual from './components/BotonUsuarioActual.vue';
  
  import variableSesion from "./variablesSesion.js";
  const varSesion = variableSesion();

  onMounted(() => {
    
  });
</script>

<template>
  <div class="d-flex flex-column expandMinHeight">
  <header class="header d-flex justify-content-between">
    <img class="logo" src="./assets/trackpals_logo.png" />
    <div v-if="!varSesion.getUsuarioActual()">
      <nav>
        <RouterLink to="/registro" class="btn btn-yellow btn-lg m-4">Registro</RouterLink>
        <RouterLink to="/login" class="btn btn-yellow btn-lg m-4">Login</RouterLink>
      </nav>
    </div>
    <BotonUsuarioActual v-else></BotonUsuarioActual>
  </header>

  <!-- Componente en el que se carga la vista de la ruta correspondiente -->
    <div class="main">
      <RouterView />
    </div>
    
    <footer class="footer text-white d-flex flex-column align-items-center p-2">
      <div>Esta web es un proyecto de fin del grado superior de Técnico Superior en Desarrollo de Aplicaciones Multiplataforma</div>
      <div>No es una web real y todos los datos que se muestran son falsos</div>
      <div>Cualquier parecido con organizaciones o personas reales son pura coincidencia</div>
    </footer>
  </div>
</template>

<style>
  body {
    padding-top: 100px;
    background-color: rgb(252, 252, 206);
  }
  .expandMinHeight {
    min-height: calc(100vh - 100px);
  }
  .header {
    height: 100px;
    width: 100%;
    background-color: #2ea903;
    position: fixed;
    top: 0;
  }
  .logo {
    margin: 0 20px 8px;
    object-fit: cover;
  }
  .main {
    flex-grow: 1;
  }
  .footer {
    width: 100%;
    background-color: #405039;
    font-size: small;
  }
</style>

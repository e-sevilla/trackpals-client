<script setup>
  import { RouterLink, RouterView } from 'vue-router';
  import { useRouter } from 'vue-router'
  const router = useRouter()
  import BotonUsuarioActual from './components/BotonUsuarioActual.vue';
  import Alert from './components/Alert.vue';
  
  import variableSesion from "./variablesSesion.js";
  const varSesion = variableSesion();

  import { unref } from "vue";
  import { alertMessage, alertShow } from "./fetchMethods.js";
</script>


<template>
  <div class="d-flex flex-column expandMinHeight">
    <Transition class="d-flex justify-content-center w-100">
      <Alert :alert-show="unref(alertShow)" :alert-message="unref(alertMessage)" @close-alert="alertShow = false"></Alert>
    </Transition>
    <header class="header d-flex justify-content-between">
      <img class="logo" src="./assets/trackpals_logo.png" @click="router.push((!varSesion.getUsuarioActual()) ? '/' : '/inicio')" />
      <div v-if="!varSesion.getUsuarioActual()">
        <nav>
          <RouterLink to="/registro" class="btn btn-yellow btn-lg m-4"
            v-if="router.currentRoute.value.path != '/registro'">Registro</RouterLink>
          <RouterLink to="/login" class="btn btn-yellow btn-lg m-4"
            v-if="router.currentRoute.value.path != '/login'">Login</RouterLink>
          </nav>
        </div>
      <div v-else class="d-flex">
        <RouterLink to="/excursion/nueva" class="btn btn-yellow btn-lg m-4"
          v-if="router.currentRoute.value.path != '/excursion/nueva'">Crear excursión</RouterLink>
        <BotonUsuarioActual :key="varSesion.getUsuarioActual().foto"></BotonUsuarioActual>
      </div>
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
    min-width: 1000px;
  }
  textarea {
    resize: none;
    cursor: inherit;
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
    z-index: 1
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
  .v-enter-active {
    transition: all 0.3s ease-out;
  }
  .v-leave-active {
    transition: all 0.8s cubic-bezier(1, 0.5, 0.8, 1);
  }
  .v-enter-from,
  .v-leave-to {
    transform: translateY(-20px);
    opacity: 0;
  }
</style>

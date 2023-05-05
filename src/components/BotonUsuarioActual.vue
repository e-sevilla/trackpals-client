<script setup>
  import { useRouter } from 'vue-router'
  const router = useRouter()

  import variableSesion from "../variablesSesion.js";
  const varSesion = variableSesion();

  const cerrarSesion = () => {
    varSesion.clearUsuarioActual();
    router.push("/").then(() => { router.go() });
  }
</script>


<template>
  <div class="dropdown">
    <img class="btn dropdown-toggle user-photo" data-bs-toggle="dropdown"
     :src="varSesion.getUsuarioActual().foto || '../../src/assets/user_default_img.png'">
    <ul class="dropdown-menu bg-success bg-opacity-25">
      <li><router-link :to="'/perfil/' + varSesion.getUsuarioActual().id" class="dropdown-item">Ver perfil</router-link></li>
      <li><router-link to="/misexcursiones" class="dropdown-item">Ver mis excursiones</router-link></li>
      <li><router-link to="/misamigos" class="dropdown-item">Ver mis amigos</router-link></li>
      <li><a class="dropdown-item" href="#" @click="cerrarSesion">Cerrar sesión</a></li>
    </ul>
  </div>
</template>


<style>
  .user-photo {
    padding: 8px;
    height: 100px;
    width: 100px;
    object-fit: cover;
    border-radius: 50%;
  }
</style>
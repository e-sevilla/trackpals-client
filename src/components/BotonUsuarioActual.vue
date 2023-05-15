<script setup>
  import { useRouter } from 'vue-router'
  const router = useRouter()

  import variableSesion from "../variablesSesion.js";
  const varSesion = variableSesion();

  const cerrarSesion = () => {
    varSesion.clearUsuarioActual();
    router.push("/")
  }
</script>


<template>
  <div class="dropdown">
    <img class="btn dropdown-toggle user-photo" data-bs-toggle="dropdown"
     :src="varSesion.getUsuarioActual().foto || '../../src/assets/user_default_img.png'">
    <ul class="dropdown-menu bg-green">
      <li><span class="dropdown-item-text text-center fw-bold fs-5">{{ varSesion.getUsuarioActual().nombre }}</span></li>
      <li><RouterLink to="/mi-perfil" class="dropdown-item">Modificar perfil</RouterLink></li>
      <li><RouterLink to="/mis-excursiones" class="dropdown-item">Ver mis excursiones</RouterLink></li>
      <li><RouterLink to="/mis-amigos" class="dropdown-item">Ver mis amigos</RouterLink></li>
      <li><RouterLink to="/buscar-usuarios" class="dropdown-item">Buscar usuarios</RouterLink></li>
      <li><hr class="dropdown-divider"></li>
      <li><a class="dropdown-item" href="#" @click="cerrarSesion">Cerrar sesión</a></li>
    </ul>
  </div>
</template>


<style scoped>
  .user-photo {
    padding: 8px;
    height: 100px;
    width: 100px;
    object-fit: cover;
    border-radius: 50%;
  }
  .bg-green {
    background-color: #2ea903;
  }
</style>
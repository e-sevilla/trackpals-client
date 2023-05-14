<script setup>

  import variableSesion from "../variablesSesion.js";
  const varSesion = variableSesion();
</script>


<template>
  <div>{{ varSesion.getUsuarioActual().idsAmigos }}</div>
  <div class="fs-2 fw-bold text-center m-3">Mis amigos</div>
</template>


<style>

</style>
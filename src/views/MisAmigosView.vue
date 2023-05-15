<script setup>
  import { ref, onMounted } from "vue";
  import UsuarioCard from "../components/UsuarioCard.vue"

  import fetchMethods from "../fetchMethods.js";
  const fetchMeths = fetchMethods();

  import variableSesion from "../variablesSesion.js";
  const varSesion = variableSesion();

  const amigos = ref([]);

  const obtenerAmigos = async () => {
    amigos.value = await fetchMeths.post(fetchMeths.urlBase + "/usuarios/amigos", varSesion.getUsuarioActual().idsAmigos);
  };

  onMounted(async () => {
    await obtenerAmigos();
  });
</script>


<template>
  <div class="fs-2 fw-bold text-center m-4">Mis amigos</div>
  <div class="d-flex flex-wrap justify-content-evenly mx-5">
    <UsuarioCard v-for="amigo in amigos" :id="amigo.id" :nombre="amigo.nombre" :foto="amigo.foto"></UsuarioCard>
  </div>
</template>


<style>

</style>
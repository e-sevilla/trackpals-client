<script setup>
  import { ref } from "vue";
  import UsuarioCard from "../components/UsuarioCard.vue"

  import fetchMethods from "../fetchMethods.js";
  const fetchMeths = fetchMethods();

  const usuarios = ref([]);
  const nombre = ref();

  const buscarUsuarios = async () => {
    usuarios.value = await fetchMeths.get(fetchMeths.urlBase + "/usuarios/buscar/" + nombre.value);
  };
</script>


<template>
  <div class="fs-2 fw-bold text-center m-4">Buscar usuarios</div>
  <form class="d-flex justify-content-center z-0 w-100" @submit.prevent="buscarUsuarios">
    <div class="input-group w-50">
      <input class="form-control" type="text" placeholder="Nombre a buscar..." v-model="nombre" required />
      <button class="btn btn-green z-0" type="submit">Buscar</button>
    </div>
  </form>
  <div class="d-flex flex-wrap justify-content-evenly mx-5 my-3">
    <UsuarioCard v-for="usuario in usuarios" :id="usuario.id" :nombre="usuario.nombre" :foto="usuario.foto"></UsuarioCard>
  </div>
</template>


<style>

</style>
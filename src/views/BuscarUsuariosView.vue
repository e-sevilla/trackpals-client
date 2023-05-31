<script setup>
  import { ref } from "vue";
  import UsuarioCard from "../components/UsuarioCard.vue"

  import fetchMethods from "../fetchMethods.js";
  const fetchMeths = fetchMethods();

  const usuarios = ref([]);
  const nombre = ref();
  const cargando = ref(false);

  const buscarUsuarios = async () => {
    usuarios.value = [];
    cargando.value = true;
    usuarios.value = await fetchMeths.get(fetchMeths.urlBase + "/usuarios/buscar/" + nombre.value);
    cargando.value = false;
  };
</script>


<template>
  <div class="fs-2 fw-bold text-center m-4">Buscar usuarios</div>
  <form class="d-flex justify-content-center z-0 w-100" @submit.prevent="buscarUsuarios">
    <div class="input-group w-50">
      <input class="form-control z-0" type="text" placeholder="Nombre a buscar..." v-model="nombre" required />
      <button class="btn btn-green z-0" type="submit">Buscar</button>
    </div>
  </form>
  <div class="d-flex flex-wrap justify-content-evenly mx-5 my-3">
    <div v-if="cargando" class="d-flex justify-content-center my-5">
      <div class="spinner-border text-success" style="width: 3rem; height: 3rem;" role="status"></div>
    </div>
    <UsuarioCard v-for="usuario in usuarios" :id="usuario.id" :nombre="usuario.nombre" :foto="usuario.foto"></UsuarioCard>
  </div>
</template>


<style>

</style>
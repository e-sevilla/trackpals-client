<script setup>
  import { ref, onMounted } from "vue";
  import { useRoute } from 'vue-router'
  const route = useRoute()
  import MessageCard from './MessageCard.vue';
  import fetchMethods from "../fetchMethods.js";
  const fetchMeths = fetchMethods();

  import variableSesion from "../variablesSesion.js";
  const varSesion = variableSesion();

  const mensajes = ref([]);
  const texto = ref();
  const cargando = ref(false);

  const getMensajes = async () => {
    cargando.value = true;
    mensajes.value = await fetchMeths.get(fetchMeths.urlBase + "/excursiones/" + route.params.id + "/mensaje");
    mensajes.value = mensajes.value.sort((a, b) => b.fecha - a.fecha);
    cargando.value = false;
  };

  const crearMensaje = async () => {
    mensajes.value = await fetchMeths.post(fetchMeths.urlBase + "/excursiones/" + route.params.id + "/mensaje",
      {
        texto: texto.value,
        autor: {id: varSesion.getUsuarioActual().id}
      });
    mensajes.value = mensajes.value.sort((a, b) => b.fecha - a.fecha);
    texto.value = null;
  };

  onMounted(async () => {
    await getMensajes();
  });
</script>


<template>
  <form class="my-3 z-0" @submit.prevent="crearMensaje">
    <div class="input-group">
      <input class="form-control z-0" type="text" placeholder="Escribe aquí tu mensaje..." v-model="texto" required />
      <button class="btn btn-green z-0" type="submit">Enviar</button>
    </div>
  </form>
  <div v-if="cargando" class="d-flex justify-content-center my-5">
    <div class="spinner-border text-success" style="width: 3rem; height: 3rem;" role="status"></div>
  </div>
  <div v-if="mensajes.length > 0" class="bg-white bg-opacity-75 rounded-3 p-3">
    <template v-for="mensaje in mensajes">
      <MessageCard :mensaje="mensaje"></MessageCard>
    </template>
  </div>
</template>


<style>
  
</style>
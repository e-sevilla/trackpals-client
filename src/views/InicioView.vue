<script setup>
  import { ref, onMounted } from "vue";
  import ExcursionCard from "../components/ExcursionCard.vue"

  import fetchMethods from "../fetchMethods.js";
  const fetchMeths = fetchMethods();

  import variableSesion from "../variablesSesion.js";
  const varSesion = variableSesion();
  let usuarioActual = varSesion.getUsuarioActual();

  const excursiones = ref([]);
  const mostrarPrivadas = ref(false);

  const obtenerExcursiones = async () => {
    excursiones.value = await fetchMeths.get(fetchMeths.urlBase + "/excursiones");
    excursiones.value = excursiones.value.sort((a, b) => a.fecha - b.fecha);
  };

  onMounted(async () => {
    await obtenerExcursiones();
  });
</script>


<template>
  <div class="d-flex flex-column align-items-center mx-5 my-2">
    <div class="d-flex justify-content-evenly w-100">
      <button class="btn btn-green m-4 btn-lg w-25" :class="(!mostrarPrivadas) ? 'active' : ''"
        @click="mostrarPrivadas = false">Excursiones públicas</button>
      <button class="btn btn-green m-4 btn-lg w-25" :class="(mostrarPrivadas) ? 'active' : ''"
        @click="mostrarPrivadas = true">Excursiones privadas</button>
    </div>
    <div class="w-75">
      <div v-if="excursiones.length == 0" class="d-flex justify-content-center my-5">
        <div class="spinner-border text-success" style="width: 3rem; height: 3rem;" role="status"></div>
      </div>
      <template v-for="excursion in excursiones">
        <ExcursionCard :excursion="excursion"
          v-if="!mostrarPrivadas && !excursion.privada"></ExcursionCard>
        <ExcursionCard :excursion="excursion"
          v-else-if="mostrarPrivadas && excursion.privada && (excursion.creador.id == usuarioActual.id || usuarioActual.idsAmigos.includes(excursion.creador.id))"></ExcursionCard>
      </template>
    </div>
  </div>
</template>


<style>
  
</style>

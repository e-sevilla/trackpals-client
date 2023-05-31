<script setup>
  import { ref, onMounted } from "vue";
  import ExcursionCard from "../components/ExcursionCard.vue"
  
  import fetchMethods from "../fetchMethods.js";
  const fetchMeths = fetchMethods();

  import variableSesion from "../variablesSesion.js";
  const varSesion = variableSesion();

  const excursiones = ref([]);
  const mostrarPasadas = ref(false);

  const obtenerExcursiones = async () => {
    excursiones.value = await fetchMeths.post(fetchMeths.urlBase + "/excursiones/mias", varSesion.getUsuarioActual().idsExcursionesApuntado);
    excursiones.value = excursiones.value.sort((a, b) => a.fecha - b.fecha);
  };

  onMounted(async () => {
    await obtenerExcursiones();
  });
</script>


<template>
  <div class="fs-2 fw-bold text-center m-3">Mis excursiones</div>
  <div class="d-flex flex-column align-items-center mx-5 my-2">
    <div class="d-flex justify-content-evenly w-100">
      <button class="btn btn-green m-3 btn-lg w-25" :class="(!mostrarPasadas) ? 'active' : ''"
        @click="mostrarPasadas = false">Excursiones por hacer</button>
      <button class="btn btn-green m-3 btn-lg w-25" :class="(mostrarPasadas) ? 'active' : ''"
        @click="mostrarPasadas = true">Excursiones pasadas</button>
    </div>
    <div class="w-75">
      <div v-if="excursiones.length == 0" class="d-flex justify-content-center my-5">
        <div class="spinner-border text-success" style="width: 3rem; height: 3rem;" role="status"></div>
      </div>
      <template v-for="excursion in excursiones">
        <ExcursionCard :excursion="excursion"
          v-if="!mostrarPasadas && (excursion.fecha >= Date.parse(new Date))"></ExcursionCard>
        <ExcursionCard :excursion="excursion"
          v-else-if="mostrarPasadas && (excursion.fecha < Date.parse(new Date))"></ExcursionCard>
      </template>
    </div>
  </div>
</template>


<style>

</style>
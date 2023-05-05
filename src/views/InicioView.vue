<script setup>
  import { ref, onMounted } from "vue";
  import ExcursionCard from "../components/ExcursionCard.vue"
  import { useRouter } from 'vue-router';
  const router = useRouter();

  import fetchMethods from "../fetchMethods.js";
  const fetchMeths = fetchMethods();

  import variableSesion from "../variablesSesion.js";
  const varSesion = variableSesion();
  const usuarioActual = varSesion.getUsuarioActual();

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
  <!-- TODO añadir boton para crear una excursion -->
  <div class="d-flex flex-column align-items-center mx-5">
    <div class="d-flex justify-content-evenly w-100">
      <button class="btn btn-green m-5 btn-lg w-25" :class="(!mostrarPrivadas) ? 'active' : ''"
        @click="mostrarPrivadas = false">Públicas</button>
      <button class="btn btn-green m-5 btn-lg w-25" :class="(mostrarPrivadas) ? 'active' : ''"
        @click="mostrarPrivadas = true">Privadas</button>
    </div>
    <div class="w-75">
      <template v-for="excursion in excursiones">
        <ExcursionCard :excursion="excursion"
          v-if="!mostrarPrivadas && !excursion.privada"></ExcursionCard>
        <ExcursionCard :excursion="excursion"
          v-else-if="mostrarPrivadas && excursion.privada && (excursion.creador.id == usuarioActual.id || excursion.creador.id in usuarioActual.idsAmigos)"></ExcursionCard>
      </template>
    </div>
  </div>
</template>


<style>
  
</style>

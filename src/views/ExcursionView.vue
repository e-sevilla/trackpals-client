<script setup>
  import { ref, onBeforeMount } from "vue";
  import { useRouter } from 'vue-router'
  const router = useRouter()
  import UsuarioMini from '../components/UsuarioMini.vue';
  import ExcursionData from '../components/ExcursionData.vue';
  import ExcursionMessages from '../components/ExcursionMessages.vue';

  import fetchMethods from "../fetchMethods.js";
  const fetchMeths = fetchMethods();

  import variableSesion from "../variablesSesion.js";
  const varSesion = variableSesion();

  import commonMethods from "../commonMethods.js";
  const commonMeths = commonMethods();

  // PROPS
  const props = defineProps({
    id: {
      type: String,
      required: true
    }
  });

  let usuarioActual = varSesion.getUsuarioActual();
  const excursion = ref();
  const verDatos = ref(true);

  const getExcursion = async () => {
    excursion.value = await fetchMeths.get(fetchMeths.urlBase + "/excursiones/" + props.id);
  };

  const unirseExcursion = async () => {
    let excursionesApuntado = await fetchMeths.get(fetchMeths.urlBase + "/usuarios/seguir-excursion/" + usuarioActual.id + "/" + props.id);
    if (excursionesApuntado) {
      usuarioActual.idsExcursionesApuntado = excursionesApuntado;
      varSesion.setUsuarioActual(usuarioActual);
      router.go();
    }
  };

  const abandonarExcursion = async () => {
    let excursionesApuntado = await fetchMeths.get(fetchMeths.urlBase + "/usuarios/quitar-excursion/" + usuarioActual.id + "/" + props.id);
    if (excursionesApuntado) {
      usuarioActual.idsExcursionesApuntado = excursionesApuntado;
      varSesion.setUsuarioActual(usuarioActual);
      router.go();
    }
  };

  const borrarExcursion = async () => {
    let excursionesApuntado = await fetchMeths.get(fetchMeths.urlBase + "/excursiones/borrar/" + props.id);
    if (excursionesApuntado) {
      usuarioActual.idsExcursionesApuntado = excursionesApuntado;
      varSesion.setUsuarioActual(usuarioActual);
      router.push("/inicio");
    }
  };

  onBeforeMount(async () => {
    await getExcursion();
  });
</script>


<template>
  <div v-if="excursion" class="m-4 p-4 bg-success bg-opacity-25 rounded-3 position-relative">
    <div class="d-flex flex-column buttons-pos">
      <button v-if="excursion.creador.id == usuarioActual.id"
        @click="borrarExcursion" class="btn btn-red m-2">Borrar excursión</button>
      <button v-else-if="usuarioActual.idsExcursionesApuntado.includes(excursion.id)"
        @click="abandonarExcursion" class="btn btn-red m-2">Abandonar</button>
      <button v-else
        @click="unirseExcursion" class="btn btn-green m-2">Unirse</button>
      <button v-if="usuarioActual.idsExcursionesApuntado.includes(excursion.id)" class="btn btn-yellow m-2" 
        @click="verDatos = !verDatos">{{ (verDatos) ? "Mostrar mensajes" : "Mostrar datos"}}</button>
    </div>
    <div class="row">
      <!-- Foto -->
      <div class="col-4">
        <img class="fit-img" :src="excursion.foto || '../../src/assets/excursion_default_img.png'" />
      </div>
      <!-- Datos principales -->
      <div class="col-8">
        <div class="row">
          <h4 class="col-12">{{ excursion.nombre }}</h4>
          <RouterLink :to="'/perfil/' + excursion.creador.id" class="col-2 link-dark">
            <UsuarioMini :medida="'52px'" :foto="excursion.creador.foto" :nombre="excursion.creador.nombre"></UsuarioMini>
          </RouterLink>
          <div class="col-10"></div>
          <div class="col-12 my-3">
            <span class="fw-bolder">Fecha: </span>{{ commonMeths.millisToDatestring(excursion.fecha) }}
          </div>
          <div class="col-12 mb-3">
            <span class="fw-bolder">Hora: </span>{{ commonMeths.millisToTimestring(excursion.fecha) }}
          </div>
          <div class="col-12 fw-bolder">Punto de encuentro:</div>
          <textarea class="col-12 px-4 form-control-plaintext" rows="3" readonly>{{ commonMeths.dirBBDDToDir(excursion.puntoEncuentro) }}</textarea>
        </div>
      </div>
    </div>
    <!-- Datos o mensajes -->
    <ExcursionData v-if="verDatos"
      :latitud="excursion.latitud" :longitud="excursion.longitud" :punto-encuentro="excursion.puntoEncuentro"
      :descripcion="excursion.descripcion" :ruta="excursion.ruta"></ExcursionData>
    <ExcursionMessages v-else></ExcursionMessages>
  </div>
  <div v-else class="d-flex justify-content-center my-5">
    <div class="spinner-border text-success" style="width: 3rem; height: 3rem;" role="status"></div>
  </div>
</template>


<style scoped>
  .fit-img {
    height: 300px;
    width: 100%;
    object-fit: cover;
  }
  .buttons-pos {
    width: 200px;
    position: absolute;
    top: 100px;
    right: 40px;
  }
</style>
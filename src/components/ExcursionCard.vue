<script setup>
  import UsuarioMini from './UsuarioMini.vue';

  import commonMethods from "../commonMethods.js";
  const commonMeths = commonMethods();

  // PROPS
  defineProps({
    excursion: {
      type: Object,
      required: true
    }
  });
</script>


<template>
  <router-link :to="'/excursion/' + excursion.id" class="card m-2 w-100 bg-success bg-opacity-25 text-decoration-none equal-height">
    <div class="row g-0">
      <div class="col-md-4">
        <img class="img-fluid rounded-start equal-height" :src="excursion.foto || '../../src/assets/excursion_default_img.png'">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">{{ excursion.nombre }}</h5>
          <UsuarioMini class="card-text my-3" :medida="'52px'" :foto="excursion.creador.foto" :nombre="excursion.creador.nombre"></UsuarioMini>
          <div class="card-text fw-bolder">{{ commonMeths.millisToDatestring(excursion.fecha) }} - {{ commonMeths.millisToTimestring(excursion.fecha) }}</div>
          <textarea class="card-text w-100 form-control-plaintext" rows="3" readonly>{{ commonMeths.dirBBDDToDir(excursion.puntoEncuentro) }}</textarea>
        </div>
      </div>
    </div>
  </router-link>
</template>


<style scoped>
  .equal-height {
    height: 25vh;
  }
  img {
    height: 100%;
    width: 100%;
    object-fit: cover;
  }
</style>
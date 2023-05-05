<script setup>
  import UsuarioMini from './UsuarioMini.vue';

  // PROPS
  defineProps({
    excursion: {
      type: Object,
      required: true
    }
  });
</script>


<template>
  <router-link :to="'/excursion/' + excursion.id" class="card m-2 w-100 bg-success bg-opacity-25 text-decoration-none">
    <div class="row g-0">
      <div class="col-md-4">
        <img class="img-fluid rounded-start" :src="excursion.foto || '../../src/assets/excursion_default_img.png'">
      </div>
      <div class="col-md-8">
        <div class="card-body">
          <h5 class="card-title">{{ excursion.nombre }}</h5>
          <UsuarioMini class="card-text my-3" :medida="'52px'" :foto="excursion.creador.foto" :nombre="excursion.creador.nombre"></UsuarioMini>
          <p class="card-text">{{ excursion.fecha }}</p>
          <p class="card-text">{{ excursion.puntoEncuentro }}</p>
        </div>
      </div>
    </div>
  </router-link>
</template>


<style>

</style>
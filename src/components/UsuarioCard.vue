<script setup>
  // PROPS
  defineProps({
    id: {
      type: String,
      required: true
    },
    nombre: {
      type: String,
      required: true
    },
    foto: {
      type: String
    }
  });
</script>


<template>
  <router-link :to="'/perfil/' + id" class="card m-2 bg-success bg-opacity-25 text-decoration-none equal-size d-flex flex-column align-items-center">
    <div class="img-cont my-3">
      <img :src="foto || '/user_default_img.png'" class="h-100 w-100 rounded-circle">
    </div>
    <p class="text-center fs-4 fw-bold">{{ nombre }}</p>
  </router-link>
</template>


<style scoped>
  .equal-size {
    width: 300px;
  }
  .img-cont {
    height: 260px;
    width: 260px;
  }
  img {
    object-fit: cover;
  }
</style>
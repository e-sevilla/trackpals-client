<script setup>
  // PROPS
  defineProps({
    medida: {
      type: String,
      required: true
    },
    foto: {
      type: String
    },
    nombre: {
      type: String,
      required: true
    }
  });
</script>


<template>
  <div class="d-flex align-items-center">
    <img class="user-mini-photo" :src="foto || '../../src/assets/user_default_img.png'">
    <div class="fw-bolder">{{ nombre }}</div>
  </div>
</template>


<style scoped>
  .user-mini-photo {
    padding: 8px;
    height: v-bind(medida);
    width: v-bind(medida);
    object-fit: cover;
    border-radius: 50%;
  }
</style>
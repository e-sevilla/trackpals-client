<script setup>
  // PROPS
  defineProps({
    servicios: {
      type: Object,
      required: true
    },
    opcion_servicio: {
      type: Number,
      required: true
    }
  });

  //EMITS
  defineEmits(['changeServicio']);
</script>


<template>
  
</template>


<style>

</style>
<script setup>
  // PROPS
  defineProps({
    id: {
      type: String,
      required: true
    }
  });
</script>


<template>
  <div>{{ id }}</div>
</template>


<style>

</style>
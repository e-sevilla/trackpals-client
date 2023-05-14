<script setup>
  // PROPS
  const props = defineProps({
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
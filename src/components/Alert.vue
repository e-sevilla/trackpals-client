<script setup>
  // PROPS
  defineProps({
    alertShow: {
      type: Boolean,
      required: true
    },
    alertMessage: {
      type: String
    }
  });

  // EMITS
  const emit = defineEmits(['closeAlert']);
</script>


<template>
  <div class="alert text-white fs-5" data-bs-theme="dark" v-if="alertShow">
    <div class="alert-box d-flex shadow" :class="(alertMessage == 'Usuario creado correctamente') ? 'green' : 'red'">
      <div class="mx-4">{{ alertMessage }}</div>
      <button type="button" class="btn-close active" @click="emit('closeAlert')"></button>
    </div>
  </div>
</template>


<style scoped>
  .alert {
    position: fixed;
    top: 40px;
    z-index: 2
  }
  .alert-box {
    padding: 20px;
    border-radius: 10px;
  }
  .red { background-color: #D81208; }
  .green { background-color: #2EA903; }
</style>
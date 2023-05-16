<script setup>
  import UsuarioMini from './UsuarioMini.vue';
  
  import commonMethods from "../commonMethods.js";
  const commonMeths = commonMethods();

  // PROPS
  defineProps({
    mensaje: {
      type: Object,
      required: true
    }
  });
</script>


<template>
  <div class="row bg-success bg-opacity-25 rounded-3 m-2 p-2">
    <div class="col-11">
      <div class="row">
        <RouterLink :to="'/perfil/' + mensaje.autor.id" class="col-2 link-dark">
          <UsuarioMini :medida="'52px'" :foto="mensaje.autor.foto" :nombre="mensaje.autor.nombre"></UsuarioMini>
        </RouterLink>
      </div>
      <div class="m-2">{{ mensaje.texto }}</div>
    </div>
    <div class="col-1 text-end">
      <div>{{ commonMeths.millisToDatestring(mensaje.fecha) }}</div>
      <div>{{ commonMeths.millisToTimestring(mensaje.fecha) }}</div>
    </div>
  </div>
</template>


<style>

</style>
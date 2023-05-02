<script setup>
  import { useRouter } from 'vue-router'
  const router = useRouter()

  import variableSesion from "../variablesSesion.js";
  const varSesion = variableSesion();

  let user = {'name':'Paco', 'id':123}

  const uno = (usu) => {
    varSesion.setUsuarioActual(usu)
    router.go()
  }

  const dos = () => {
    varSesion.clearUsuarioActual()
    router.go()
  }
</script>


<template>
  <button class="btn btn-green m-5" @click="uno(user)">Boton</button>
  <button class="btn btn-yellow m-5">Boton</button>
  <button class="btn btn-red m-5" @click="dos">Boton</button>
</template>


<style>

</style>
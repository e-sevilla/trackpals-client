<script setup>
  import { ref } from "vue";
  import { useRouter } from 'vue-router'
  const router = useRouter()

  import fetchMethods from "../fetchMethods.js";
  const fetchMeths = fetchMethods();

  import variableSesion from "../variablesSesion.js";
  const varSesion = variableSesion();

  const nombre = ref("");
  const contrasenia = ref("");
  
  const login = async () => {
    let usuarioDto = {
      nombre: nombre.value,
      contrasenia: contrasenia.value
    }
    let usuario = await fetchMeths.post(fetchMeths.urlBase + "/usuarios/login", usuarioDto)
    if (usuario) {
      varSesion.setUsuarioActual(usuario);
      router.push("/inicio").then(() => { router.go() });
    }
  };

  // EMITS
  const emit = defineEmits(['loginOk']);
</script>


<template>
  <form @submit.prevent="login">
    <label>
      Usuario
      <input type="text" v-model="nombre" />
    </label>
    <label>
      Contraseña
      <input type="password" v-model="contrasenia" />
    </label>
    <button class="btn btn-green" type="submit">Entrar</button>
  </form>
</template>


<style>

</style>
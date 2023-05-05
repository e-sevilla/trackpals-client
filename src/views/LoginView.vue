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
      router.push("/inicio")//.then(() => { router.go() });
    }
  };

  // EMITS
  const emit = defineEmits(['loginOk']);
</script>


<template>
  <div class="d-flex justify-content-center my-5">
    <form class="d-flex flex-column" @submit.prevent="login">
      <label class="form-label my-2">
        <div class="my-2">Usuario</div>
        <input type="text" class="form-control" v-model="nombre" required />
      </label>
      <label class="form-label my-3">
        <div class="my-2">Contraseña</div>
        <input type="password" class="form-control" v-model="contrasenia" required />
      </label>
      <button class="btn btn-green my-4" type="submit">Entrar</button>
    </form>
  </div>
</template>


<style>

</style>
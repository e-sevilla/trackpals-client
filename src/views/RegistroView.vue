<script setup>
  import { ref } from "vue";
  import { useRouter } from 'vue-router'
  const router = useRouter()

  import { alertMessage, alertShow } from "../fetchMethods.js";
  import fetchMethods from "../fetchMethods.js";
  const fetchMeths = fetchMethods();
  
  import commonMethods from "../commonMethods.js";
  const commonMeths = commonMethods();

  const nombre = ref("");
  const email = ref("");
  const contrasenia = ref("");

  const checkNombre = () => {
    let re = /^[A-z0-9._-]{3,}$/;
    if (re.test(nombre.value)) {
      document.getElementById("nombre").setCustomValidity("");
    }
    else {
      document.getElementById("nombre").setCustomValidity("Mínimo 3 carácteres, con letras, números o . - _");
    }
  };

  const checkEmail = () => {
    let re = /^([A-z0-9]+(?:[._-][A-z0-9]+)*)@([A-z0-9]+(?:[.-][A-z0-9]+)*\.[A-z]{2,})$/;
    if (re.test(email.value)) {
      document.getElementById("email").setCustomValidity("");
    }
    else {
      document.getElementById("email").setCustomValidity("Introduce un email válido");
    }
  };

  const checkContrasenia = () => {
    let re = /^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{7,})\S$/;
    if (re.test(contrasenia.value)) {
      document.getElementById("contrasenia").setCustomValidity("");
    }
    else {
      document.getElementById("contrasenia").setCustomValidity("Mínimo 8 carácteres, con mayúsculas, minúsculas y números");
    }
  };

  const registrar = async () => {
    let usuarioDto = {
      nombre: nombre.value,
      email: email.value,
      contrasenia: commonMeths.encrypt(contrasenia.value)
    };
    let usuario = await fetchMeths.post(fetchMeths.urlBase + "/usuarios", usuarioDto);
    if (usuario) {
      alertMessage.value = "Usuario creado correctamente";
      alertShow.value = true;
      router.push("/login");
    }
  };
</script>


<template>
  <div>
    <div class="fs-2 fw-bold text-center m-3">Registro</div>
    <div class="d-flex justify-content-center my-5">
      <form class="d-flex flex-column bg-warning bg-opacity-25 rounded-3 px-4 py-2 w-25" @submit.prevent="registrar">
        <label class="form-label my-2">
          <div class="my-2 fw-bolder">Usuario</div>
          <input type="text" class="form-control" id="nombre" v-model="nombre"
            pattern="^([A-z0-9_.-])*[^\s]\1*$" :oninput="checkNombre" required />
        </label>
        <label class="form-label my-2">
          <div class="my-2 fw-bolder">Email</div>
          <input type="text" class="form-control" id="email" v-model="email"
            pattern="^([A-z0-9]+(?:[._-][A-z0-9]+)*)@([A-z0-9]+(?:[.-][A-z0-9]+)*\.[A-z]{2,})$" :oninput="checkEmail" required />
        </label>
        <label class="form-label my-3">
          <div class="my-2 fw-bolder">Contraseña</div>
          <input type="password" class="form-control" id="contrasenia" v-model="contrasenia"
            pattern="^((?=\S*?[A-Z])(?=\S*?[a-z])(?=\S*?[0-9]).{7,})\S$" :oninput="checkContrasenia" required />
        </label>
        <button class="btn btn-green my-4" type="submit">Crear cuenta</button>
      </form>
    </div>
  </div>
</template>


<style>

</style>
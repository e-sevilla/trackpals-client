<script setup>
  import { ref, onMounted } from "vue";
  import { useRouter } from 'vue-router'
  const router = useRouter()

  import fetchMethods from "../fetchMethods.js";
  const fetchMeths = fetchMethods();

  import variableSesion from "../variablesSesion.js";
  const varSesion = variableSesion();
  let usuarioActual = varSesion.getUsuarioActual();

  import commonMethods from "../commonMethods.js";
  const commonMeths = commonMethods();

  const nombre = ref();
  const fechaNac = ref();
  const direccion = ref();
  const descripcion = ref();
  const foto = ref();

  const getPerfil = async () => {
    let perfil = await fetchMeths.get(fetchMeths.urlBase + "/usuarios/perfil/" + usuarioActual.id);
    if (perfil) {
      nombre.value = perfil.nombre;
      fechaNac.value = (perfil.fechaNac) ? (new Date(perfil.fechaNac).toISOString().slice(0, 10)) : null;
      direccion.value = perfil.direccion;
      descripcion.value = perfil.descripcion;
      foto.value = perfil.foto;
    }
  };
  
  const modificarUsuario = async () => {
    let usuarioModificado = {
      id: usuarioActual.id,
      nombre: nombre.value,
      fechaNac: commonMeths.datetimeToMillis(fechaNac.value),
      direccion: direccion.value,
      descripcion: descripcion.value,
      foto: foto.value
    }
    let usuarioActualizado = await fetchMeths.post(fetchMeths.urlBase + "/usuarios/perfil", usuarioModificado);
    if (usuarioActualizado) {
      varSesion.setUsuarioActual(usuarioActualizado);
      router.push("/inicio");
    }
  };
  
  const procesarImagen = async (e) => {
    foto.value = await commonMeths.encodeFileAsBase64URL(e.target.files[0]);
  };
  
  onMounted(async () => {
    await getPerfil();
  });
</script>


<template>
  <div class="m-4 p-4 bg-warning bg-opacity-25 rounded-3">
    <form class="position-relative" @submit.prevent="modificarUsuario">
      <div class="d-flex">
        <!-- Foto -->
        <div class="mx-4 img-cont">
          <img class="fit-img rounded-circle" :src="foto || '/user_default_img.png'" />
          <label class="form-label btn btn-green col-12 my-3">
            Cambiar foto
            <input type="file" accept="image/*" style="display:none" @change="procesarImagen($event)" />
          </label>
        </div>
        <!-- Datos -->
        <div class="row flex-grow-1 d-flex flex-column mx-5">
          <h3 class="col-12 my-3">{{ nombre }}</h3>
          <label class="form-label col-5">
            <span class="fw-bolder">Fecha de nacimiento</span>
            <input class="form-control" type="date" v-model="fechaNac" />
          </label>
          <label class="form-label col-12 my-2">
            <span class="fw-bolder">Dirección</span>
            <input class="form-control" type="text" v-model="direccion" />
          </label>
          <label class="form-label my-2">
            <span class="fw-bolder">Descripción</span>
            <textarea class="form-control" rows="5" v-model="descripcion"></textarea>
          </label>
        </div>
      </div>
      <!-- Botones -->
      <div class="d-flex flex-row justify-content-end buttons-up">
        <RouterLink to="/inicio" class="btn btn-red col-2 m-2 button-width">Cancelar</RouterLink>
        <button class="btn btn-green col-2 m-2 button-width" type="submit">Guardar</button>
      </div>
    </form>
  </div>
</template>


<style scoped>
  .img-cont {
    width: 400px;
  }
  .fit-img {
    height: 400px;
    width: 400px;
    object-fit: cover;
  }
  .buttons-up {
    position: absolute;
    bottom: 0;
    right: 0;
  }
  .button-width {
    width: 120px;
  }
</style>
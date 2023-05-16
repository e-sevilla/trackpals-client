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

  // PROPS
  const props = defineProps({
    id: {
      type: String,
      required: true
    }
  });

  const perfil = ref();

  const getPerfil = async () => {
    perfil.value = await fetchMeths.get(fetchMeths.urlBase + "/usuarios/perfil/" + props.id);
  };
  
  const seguirAmigo = async () => {
    let amigos = await fetchMeths.get(fetchMeths.urlBase + "/usuarios/seguir-amigo/" + usuarioActual.id + "/" + props.id);
    if (amigos) {
      usuarioActual.idsAmigos = amigos;
      varSesion.setUsuarioActual(usuarioActual);
      router.go();
    }
  };

  const quitarAmigo = async () => {
    let amigos = await fetchMeths.get(fetchMeths.urlBase + "/usuarios/quitar-amigo/" + usuarioActual.id + "/" + props.id);
    if (amigos) {
      usuarioActual.idsAmigos = amigos;
      varSesion.setUsuarioActual(usuarioActual);
      router.go();
    }
  };
  
  onMounted(async () => {
    await getPerfil();
  });
</script>


<template>
  <div v-if="perfil" class="m-4 p-4 bg-success bg-opacity-25 rounded-3">
    <div>
      <div class="d-flex position-relative">
        <!-- Foto -->
        <div class="mx-4 img-cont">
          <img class="fit-img rounded-circle" :src="perfil.foto || '../../src/assets/user_default_img.png'" />
        </div>
        <!-- Datos -->
        <div class="row flex-grow-1 d-flex flex-column mx-5">
          <h3 class="my-3 mx-2 p-0">{{ perfil.nombre }}</h3>
          <div class="fw-bolder mx-2 p-0">Fecha de nacimiento</div>
          <div class=" mx-2 p-0">{{ (perfil.fechaNac) ? commonMeths.millisToDatestring(perfil.fechaNac) : "No hay fecha de nacimiento" }}</div>
          <div class="fw-bolder mt-2 mx-2 p-0">Dirección</div>
          <div class=" mx-2 p-0">{{ perfil.direccion }}</div>
          <div class="fw-bolder mt-2 mx-2 p-0">Descripción:</div>
          <textarea class="form-control-plaintext mx-2 p-0" rows="8" readonly>{{ perfil.descripcion || "No hay descripción" }}</textarea>
        </div>
        <!-- Botones -->
        <template v-if="id != usuarioActual.id">
          <button v-if="usuarioActual.idsAmigos.includes(id)"
            @click="quitarAmigo" class="col-2 btn btn-red buttons-up">Dejar de seguir</button>
          <button v-else
            @click="seguirAmigo" class="col-2 btn btn-green buttons-up">Seguir</button>
        </template>
      </div>
    </div>
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
    width: 180px;
    position: absolute;
    top: 70px;
    right: 0;
  }
</style>
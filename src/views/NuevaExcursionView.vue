<script setup>
  import { ref, onMounted } from "vue";
  import { useRouter } from 'vue-router'
  const router = useRouter()

  import { alertMessage, alertShow } from "../fetchMethods.js";
  import fetchMethods from "../fetchMethods.js";
  const fetchMeths = fetchMethods();

  import variableSesion from "../variablesSesion.js";
  const varSesion = variableSesion();

  import commonMethods from "../commonMethods.js";
  const commonMeths = commonMethods();

  const nombre = ref(null);
  const fecha = ref(null);
  const hora = ref(null);
  const privada = ref(false);
  const latitud = ref(null);
  const longitud = ref(null);
  const puntoEncuentro = ref(null);
  const descripcion = ref(null);
  const foto = ref(null);
  const rutaNombre = ref(null);
  const rutaGpx = ref(null);

  const listaRutas = ref([]);
  const opcionRuta = ref(-2);
  let map;

  const crearExcursion = async () => {
    let excursion = {
      nombre: nombre.value,
      fecha: commonMeths.datetimeToMillis(fecha.value, hora.value),
      privada: privada.value,
      latitud: latitud.value,
      longitud: longitud.value,
      puntoEncuentro: puntoEncuentro.value,
      descripcion: descripcion.value,
      foto: foto.value,
      ruta: null,
      creador: {id: varSesion.getUsuarioActual().id}
    }
    if (excursion.fecha <= Date.parse(new Date())) {
      alertMessage.value = "La fecha no puede ser anterior a la fecha actual";
      alertShow.value = true;
    }
    else {
      if (opcionRuta.value == -1) {
        excursion.ruta = {
          id: null,
          nombre: rutaNombre.value,
          gpx: rutaGpx.value
        }
      }
      else if (opcionRuta.value != -2) {
        excursion.ruta = { id: listaRutas.value[opcionRuta.value].id }
      }
      let excursionesApuntado = await fetchMeths.post(fetchMeths.urlBase + "/excursiones", excursion);
      if (excursionesApuntado) {
        let usuarioActual = varSesion.getUsuarioActual();
        usuarioActual.idsExcursionesApuntado = excursionesApuntado;
        varSesion.setUsuarioActual(usuarioActual);
        router.push("/inicio");
      }
    }
  };

  const getRutas = async () => {
    listaRutas.value = await fetchMeths.get(fetchMeths.urlBase + "/excursiones/rutas")
  };

  const procesarImagen = async (e) => {
    foto.value = await commonMeths.encodeFileAsBase64URL(e.target.files[0]);
  };

  const procesarGpx = async (e) => {
    rutaNombre.value = e.target.files[0].name.slice(0, -4);
    rutaGpx.value = await commonMeths.encodeFileAsBase64URL(e.target.files[0]);
    mostrarGpx(rutaGpx.value);
  };

  const mostrarGpx = (gpx) => {
    new L.GPX(gpx, {
        async: true,
        marker_options: {
          startIconUrl: '/pin-icon-start.png',
          endIconUrl: '/pin-icon-end.png',
          shadowUrl: '/pin-shadow.png',
          wptIconUrls: '/pin-icon-wpt.png'
        }
      }).on('loaded', function(e) {
                map.fitBounds(e.target.getBounds());
            }).addTo(map);
  };

  const crearMapa = () => {
    map = L.map('map').setView([40.416693, -3.703745], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
  };

  const crearBusquedaMapa = () => {
    function searchEventHandler(result) {
      puntoEncuentro.value = commonMeths.htmlToDirBBDD(result.geocode.html);
      latitud.value = result.geocode.center.lat;
      longitud.value = result.geocode.center.lng;
    }
    L.Control.geocoder().on('markgeocode', searchEventHandler).addTo(map);
  };

  const limpiarMapa = () => {
    map.eachLayer(function (layer) {map.removeLayer(layer);});
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    map.setView([40.416693, -3.703745], 13);
    puntoEncuentro.value = null;
    latitud.value = null;
    longitud.value = null;
    opcionRuta.value = -2;
    rutaNombre.value = null;
    rutaGpx.value = null;
  }

  const obtenerRutaSelect = async () => {
    if (opcionRuta.value >= 0) {
      const ruta = await fetchMeths.get(fetchMeths.urlBase + "/excursiones/rutas/" + listaRutas.value[opcionRuta.value].id);
      mostrarGpx(ruta.gpx);
    };
  };

  onMounted(async () => {
    await getRutas();
    crearMapa();
    crearBusquedaMapa();
  });
</script>


<template>
  <div class="m-4 p-4 bg-warning bg-opacity-25 rounded-3">
    <form class="position-relative" @submit.prevent="crearExcursion">
      <div class="row">
        <!-- Foto -->
        <div class="col-4">
          <img class="fit-img" :src="foto || '/excursion_default_img.png'" />
          <label class="form-label btn btn-green col-12 my-2">
            Cambiar foto
            <input type="file" accept="image/*" style="display:none" @change="procesarImagen($event)" />
          </label>
        </div>
        <!-- Formulario -->
        <div class="col-8">
          <div class="row">
            <label class="form-label col-12">
              <span class="fw-bolder">Nombre</span> <span class="mandatory">(obligatorio)</span>
              <input class="form-control" type="text" v-model="nombre" required />
            </label>
            <div class="col-2">
              <div class="form-check form-switch form-control-lg my-3 mx-3">
                <label class="form-check-label">
                  <input class="form-check-input" type="checkbox" v-model="privada" />
                  <span class="fw-bolder">Privada</span>
                </label>
              </div>
            </div>
            <label class="form-label col-5">
              <span class="fw-bolder">Fecha</span> <span class="mandatory">(obligatorio)</span>
              <input class="form-control" type="date" v-model="fecha" required />
            </label>
            <label class="form-label col-5">
              <span class="fw-bolder">Hora</span> <span class="mandatory">(obligatorio)</span>
              <input class="form-control" type="time" v-model="hora" required />
            </label>
            <label class="form-label">
              <span class="fw-bolder">Descripción</span>
              <textarea class="form-control" rows="5" v-model="descripcion"></textarea>
            </label>
            <!-- Direccion y ruta -->
            <div class="row">
              <p class="col-12"> </p>
              <div class="col-12 mx-3">Selecciona un punto de encuentro utilizando el buscador del mapa (botón de la lupa).</div>
              <div class="col-12 mx-3">También puedes introducir en el buscador una coordenada en formato "latitud,longitud".</div>
              <div class="col-4 mx-4 my-2">
                <div class="row">
                  <div class="col-12 z-0" id="map"></div> <!-- Mapa -->
                  <button class="btn btn-green my-2" type="button" @click="limpiarMapa">Limpiar mapa</button>
                </div>
              </div>
              <div class="col-7">
                <br/>
                <label class="form-label col-12">
                  <span class="fw-bolder">Punto de encuentro</span> <span class="mandatory">(obligatorio)</span>
                  <textarea class="form-control" rows="3" :value="commonMeths.dirBBDDToDir(puntoEncuentro)"
                    onkeydown="return false;" style="caret-color: transparent !important;" required></textarea>
                </label>
                <label class="form-label col-12">
                  <span class="fw-bolder">Ruta</span>
                  <select class="form-select" v-model="opcionRuta" @change="obtenerRutaSelect">
                    <option value="-2">Sin ruta</option>
                    <option value="-1">Nueva ruta</option>
                    <option v-for="(ruta, index) in listaRutas" :value="index">{{ ruta.nombre }}</option>
                  </select>
                </label>
                <div v-if="opcionRuta == -1">
                  <div class="row m-2">
                    <label for="gpx" class="col-form-label col-3">Ruta GPX</label>
                    <div class="col-9">
                      <input type="file" id="gpx" accept=".gpx" class="form-control" @change="procesarGpx($event)" required />
                    </div>
                  </div>
                  <div class="row m-2">
                    <label for="nombre-ruta" class="col-form-label col-3">Nombre</label>
                    <div class="col-9">
                      <input type="text" id="nombre-ruta" class="form-control" v-model="rutaNombre" required />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Botones -->
      <div class="buttons-up">
        <RouterLink to="/inicio" class="btn btn-red col-2 m-2 button-width">Cancelar</RouterLink>
        <button class="btn btn-green col-2 m-2 button-width" type="submit">Crear</button>
      </div>
    </form>
  </div>
</template>


<style scoped>
  .mandatory {
    font-style: italic;
    font-size: smaller;
    color: rgb(228, 17, 17);
  }
  .fit-img {
    height: 500px;
    width: 100%;
    object-fit: cover;
  }
  #map {
    height: 380px;
    width: 100%;
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
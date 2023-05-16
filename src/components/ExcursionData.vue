<script setup>
  import { onMounted } from "vue";
  import commonMethods from "../commonMethods.js";
  const commonMeths = commonMethods();

  // PROPS
  const props = defineProps({
    latitud: {
      type: Number,
      required: true
    },
    longitud: {
      type: Number,
      required: true
    },
    puntoEncuentro: {
      type: String,
      required: true
    },
    descripcion: {
      type: String
    },
    ruta: {
      type: Object
    }
  });

  let map;

  const crearMapa = () => {
    map = L.map('map').setView([props.latitud, props.longitud], 13);
    L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 19,
        attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>'
    }).addTo(map);
    let marker = L.marker([props.latitud, props.longitud]).addTo(map);
    let popup = L.popup({offset: [0, -30]})
    .setLatLng([props.latitud, props.longitud])
    .setContent(commonMeths.dirBBDDToDirMap(props.puntoEncuentro))
    .openOn(map);
  };

  const mostrarGpx = (gpx) => {
    new L.GPX(gpx, {
        async: true,
        marker_options: {
          startIconUrl: '../../src/assets/pin-icon-start.png',
          endIconUrl: '../../src/assets/pin-icon-end.png',
          shadowUrl: '../../src/assets/pin-shadow.png',
          wptIconUrls: '../../src/assets/pin-icon-wpt.png'
        }
      }).addTo(map);
  };

  onMounted(() => {
    crearMapa();
    if (props.ruta) {
      mostrarGpx(props.ruta.gpx);
    };
  });
</script>


<template>
  <div class="row my-2">
    <div class="col-4">
      <div id="map" class="map z-0"></div>
    </div>
    <div class="col-8">
      <div class="fw-bolder">Descripción:</div>
      <textarea class="form-control-plaintext" rows="14" readonly>{{ descripcion || "No hay descripción" }}</textarea>
    </div>
  </div>
</template>


<style scoped>
  #map {
    width: 100%;
    height: 380px;
  }
  .pp {
    width: 100%;
    background-color: transparent;
    border: solid transparent;
    border-width: 0;
  }
</style>
import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegistroView from '../views/RegistroView.vue'
import InicioView from '../views/InicioView.vue'
import ExcursionView from '../views/ExcursionView.vue'
import PerfilView from '../views/PerfilView.vue'
import NuevaExcursionView from '../views/NuevaExcursionView.vue'
import MisExcursionesView from '../views/MisExcursionesView.vue'
import MisAmigosView from '../views/MisAmigosView.vue'
import BuscarUsuariosView from '../views/BuscarUsuariosView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: "/login",
      name: "login",
      component: LoginView
    },
    {
      path: "/registro",
      name: "registro",
      component: RegistroView
    },
    {
      path: "/inicio",
      name: "inicio",
      component: InicioView
    },
    {
      path: "/excursion/:id",
      name: "excursion",
      component: ExcursionView,
      props: true
    },
    {
      path: "/perfil/:id",
      name: "perfil",
      component: PerfilView,
      props: true
    },
    {
      path: "/excursion/nueva",
      name: "nueva-excursion",
      component: NuevaExcursionView
    },
    {
      path: "/mis-excursiones",
      name: "mis-excursiones",
      component: MisExcursionesView
    },
    {
      path: "/mis-amigos",
      name: "mis-amigos",
      component: MisAmigosView
    },
    {
      path: "/buscar-usuarios",
      name: "buscar-usuarios",
      component: BuscarUsuariosView
    },
  ]
})

// Impedir navegacion si no estas logeado
import variableSesion from "../variablesSesion.js";
const varSesion = variableSesion();

router.beforeEach(async (to, from) => {
  if ( varSesion.getUsuarioActual() == null && to.path !== "/" && to.path !== "/login" && to.path !== "/registro") {
    return "/";
  }
})


export default router

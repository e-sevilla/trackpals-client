import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import LoginView from '../views/LoginView.vue'
import RegistroView from '../views/RegistroView.vue'
import InicioView from '../views/InicioView.vue'
import ExcursionView from '../views/ExcursionView.vue'
import PerfilView from '../views/PerfilView.vue'
import NuevaExcursionView from '../views/NuevaExcursionView.vue'

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

    // {
    //   path: '/about',
    //   name: 'about',
    //   // route level code-splitting
    //   // this generates a separate chunk (About.[hash].js) for this route
    //   // which is lazy-loaded when the route is visited.
    //   component: () => import('../views/AboutView.vue')
    // }
  ]
})

// Impedir navegacion sin estar logeado
import variableSesion from "../variablesSesion.js";
const varSesion = variableSesion();

router.beforeEach(async (to, from) => {
  if ( varSesion.getUsuarioActual() == null && to.path !== "/" && to.path !== "/login" && to.path !== "/registro") {
    return "/";
  }
})

export default router

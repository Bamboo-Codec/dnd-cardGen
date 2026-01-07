import { createRouter, createWebHistory } from "vue-router";
import Inicio from "../components/inicio.vue";
import Generador from "../components/generador.vue";
import Detalles from "../components/detalles.vue";

const router = createRouter(
    {
        history: createWebHistory(), //Creo historial
        routes: [
            {
                path:"/",
                redirect: "/inicio"
            },
            { //Inicio
                path: "/inicio",
                name: 'inicio',
                component: Inicio
            },
            {
                path: "/generador",
                name: "generador",
                component: Generador
            },
            {
                path:"/detalles",
                name: "detalles",
                component: Detalles
            }
        ]
    }
)

export default router
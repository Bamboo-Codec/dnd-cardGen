import { createRouter, createWebHistory } from "vue-router";
import Inicio from "../components/inicio.vue";
import Generador from "../components/generador.vue";

const router = createRouter(
    {
        history: createWebHistory(import.meta.env.BASE_URL), //Creo historial
        routes: [
            { //Inicio
                path: "/",
                name: 'inicio',
                component: Inicio
            },
            {
                path: "/generador",
                name: "generador",
                component: Generador
            }
        ]
    }
)

export default router
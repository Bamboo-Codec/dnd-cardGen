import { createRouter, createWebHistory } from "vue-router";
import Inicio from "../components/inicio.vue";
import Generador from "../components/generador.vue";
import Detalles from "../components/detalles.vue";
import Test from "../components/test.vue";

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
                component: Inicio,
                meta: {title: "D&D CardGen | Inicio"}
            },
            {
                path: "/generador",
                name: "generador",
                component: Generador,
                meta: {title: "D&D CardGen | Generador"}

            },
            {
                path:"/detalles",
                name: "detalles",
                component: Detalles,
                meta: {title: "D&D CardGen | Detalles"}
            },
            {
                path: "/test",
                name: "/test",
                component:Test,
                meta: {title: "Test"}
            },
        ]
    }
)

router.afterEach((to) => {
    document.title = to.meta.title || "D&D CardGen"
})

export default router
import { createRouter, createWebHistory } from "vue-router";
import Inicio from "../components/inicio.vue";
import Generador from "../components/generador.vue";
import Detalles from "../components/detalles.vue";
import Layout1 from "../components/Layouts/layout1.vue";
import Conjuros from "../components/Modulos/Conjuros.vue";

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
                component: Layout1,
                meta: {title: "D&D CardGen | Inicio"},
                props: {Modulo: Conjuros}
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
        ]
    }
)

router.afterEach((to) => {
    document.title = to.meta.title || "D&D CardGen"
})

export default router
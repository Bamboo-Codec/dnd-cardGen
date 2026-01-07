<template>

    <h1>D&D CardGen</h1>

    <p>
        <strong>D&D CardGen</strong> es una herramienta en desarrollo cuyo objetivo es facilitar la
        generación de cartas imprimibles para conjuros de <em>Dungeons & Dragons 5ª edición</em>.
    </p>

    <p>
        El proyecto utiliza como base el repositorio de datos
        <a target="_blank" rel="noopener noreferrer"
           href="https://github.com/Magical20-ai/5e-database-spanish">
            5e-database-spanish
        </a>
        desarrollado por <strong>Magical20-ai</strong>, el cual provee la información de conjuros en español.
    </p>

    <p>
        Actualmente, la aplicación se encuentra en una <strong>fase temprana de desarrollo</strong>.
        Si bien la funcionalidad principal —la generación de cartas— ya está disponible,
        el diseño visual y el tratamiento del contenido aún se encuentran en proceso de mejora.
    </p>

    <p>
        Es posible que algunas cartas presenten problemas de formato, cortes de texto incorrectos
        o dificultades al representar descripciones complejas (como tablas o estructuras extensas).
        Estas limitaciones son conocidas y serán abordadas progresivamente en futuras versiones.
    </p>

    <p>
        El objetivo a mediano plazo es ofrecer un sistema más robusto, con cartas visualmente
        consistentes, optimizadas para impresión y con una mejor adaptación del contenido original.
    </p>

    <p>
        Si desea contribuir al desarrollo del proyecto, reportar errores o proponer mejoras,
        puede hacerlo a través del repositorio oficial en GitHub:
        <a target="_blank" rel="noopener noreferrer"
           href="https://github.com/Bamboo-Codec/dnd-cardGen">
            D&D CardGen
        </a>.
    </p>

    <p>
        Agradecemos su interés y comprensión durante esta etapa de desarrollo.
    </p>

    <p class="by">
        — BambooCodec
    </p>

    <button class="no-print" @click="volver()">
        Volver
    </button>

</template>


<style>
.by{
    font-style: italic;
    font-weight: bolder;
}
</style>

<script setup>
import { useRouter } from 'vue-router';


    const router = useRouter()
    const volver = () => {
    router.push({ name: 'inicio' })
}
</script>
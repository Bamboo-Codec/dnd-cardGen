<template>
    <header class="header no-print">
        <button style="margin-left: 2%;" class="no-print" @click="volver()">Volver</button>
        <button style="margin-right: 2%;" class="no-print" @click="imprimir()">Imprimir</button>
    </header>
    <div class="print-container">
        <div class="wrap sheet">
            <Carta v-for="carta in cartasFinales" :key="carta.id" v-bind="carta"/>
        </div>
    </div>


</template>

<style scoped>

    .wrap{
        margin-top:60px;
        display: flex;
        flex-wrap: wrap;
        gap: 5mm;
    }
    .header{
    display: flex;
    justify-content: space-between;
    align-items: center;
    position: fixed; /* Lo fija en la ventana */
    top: 0; /* Lo pega a la parte superior */
    left: 0; /* Lo pega al borde izquierdo */
    width: 100%; /* Ocupa todo el ancho */
    background-color: #333;
    color: white;
    padding: 10px 0;
    text-align: center;
    z-index: 1000; /* Asegura que esté por encima de otros elementos */
}
</style>

<script setup>
import Carta from './carta.vue'
import { useRouter } from 'vue-router';
import { useConjurosStore } from '../stores/conjuros';
import { onMounted, ref } from 'vue';

const conjuros = ref([])
const useConjuros = useConjurosStore()
const MAX_CARACTERES = 661
const cartasFinales = ref([])

const imprimir = () => {
  window.print()
}

onMounted(() => {
    const originales = useConjuros.getConjuros()

    cartasFinales.value = originales.flatMap(conjuro =>
        procesarConjuro(conjuro)
    )
})
const router = useRouter()
const volver = () => {
    router.push({ name: 'inicio' })
}

const fragmentarTexto = (texto, max) => {
    const partes = []
    let actual = ''

    texto.split(' ').forEach(palabra => {
        if ((actual + palabra).length > max) {
            partes.push(actual.trim())
            actual = palabra + ' '
        } else {
            actual += palabra + ' '
        }
    })

    if (actual.trim()) {
        partes.push(actual.trim())
    }

    return partes
}


const mapearComponentes = (carta) => {
    const componentes = {
        r: carta.ritual ?? false,
        c: carta.concentration ?? false,
        v: false,
        s: false,
        m: false
    }

    carta.components?.forEach(c => {
        if (c === 'V') componentes.v = true
        if (c === 'S') componentes.s = true
        if (c === 'M') componentes.m = true
    })

    return componentes
}

const procesarConjuro = (carta) => {
    const textoCompleto = [
        ...carta.desc,
        ...(carta.higher_level ?? [])
    ].join('\n\n')

    const fragmentos = fragmentarTexto(textoCompleto, MAX_CARACTERES)
    const total = fragmentos.length

    return fragmentos.map((fragmento, i) => ({
        id: `${carta.index}-${i}`,

        clase: carta.classes[0]?.name ?? '',
        nombre: carta.name,
        nivel: carta.level,
        escuela: carta.school.name,

        componentes: mapearComponentes(carta),

        tiempo: carta.casting_time,
        duracion: carta.duration,
        alcance: carta.range,

        parte: total > 1 ? `Parte ${i + 1}/${total}` : '',
        descripcion: fragmento
    }))
}

</script>
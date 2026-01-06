<template>
    <header>
        <button @click="volver()">Volver</button>
    </header>

    <Carta v-for="carta in cartasFinales" :key="carta.id" v-bind="carta"/>


</template>

<script setup>
import Carta from './carta.vue'
import { useRouter } from 'vue-router';
import { useConjurosStore } from '../stores/conjuros';
import { onMounted, ref } from 'vue';

const conjuros = ref([])
const useConjuros = useConjurosStore()
const MAX_CARACTERES = 661
const cartasFinales = ref([])

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
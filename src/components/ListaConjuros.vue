<template>
    <h2 class="font-skranji-reg">CONJUROS SELECCIONADOS</h2>
    <ol>
        <li v-for="carta in cartas" class="font-medieval">{{ carta.name }}</li>
    </ol>
</template>

<style scoped>
    .contenedor{
        display: flex;
        justify-content: start;
        align-items: center;
        flex-direction: column;
        width: 100%;
        height: 100%;
    }

    h2{
        text-align: center;
    }
</style>

<script setup>
import { onMounted, ref } from 'vue';
import { useConjurosStore } from '../stores/conjuros';

    const conjurosStore = useConjurosStore()
    const cartas = ref([])

    onMounted(()=>{
        cartas.value = conjurosStore.getConjuros()
    })
</script>
<template>

        <h3 class="font-skranji-reg">CONJUROS SELECCIONADOS</h3>
        <ol>
            <li @click="emitIrAConjuro(carta.index)" v-for="carta in cartas" class="font-medieval">
                {{ carta.name }}
            </li>
        </ol>
</template>

<style scoped>
    h3{
        text-align: center;
        padding: 0 15px 0 15px;
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

    const emit = defineEmits(['ir-a-conjuro'])

    const emitIrAConjuro = (id) => {
        console.log("emitiendo conjuro ", id)
        emit('ir-a-conjuro',id)
    }
</script>
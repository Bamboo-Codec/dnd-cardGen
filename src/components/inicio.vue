<template>

<header>
    <button @click="generarCartas()">Generar cartas</button>
</header>

    <div class="contenedor">
        <ul class="lista">
            <li>
                <div v-if="cartas.length > 1" class="fila elemento">
                    <div><span>flecha</span></div>
                    <div><span>check</span></div>
                    <div><span>Nombre</span></div>
                    <div><span>Nivel</span></div>
                    <div><span>Escuela</span></div>
                    <div><span>Componentes</span></div>
                    <div><span>Tiempo</span></div>
                    <div><span>Duración</span></div>
                    <div><span>Alcance</span></div>
                </div>
            </li>
            <li v-for="(carta, index) in cartas" :key="index" class="elemento">
                <div class="columna">
                    <div class="fila elemento">
                        <div>
                            <button @click="toggle(index)">
                                {{ abiertas.has(index) ? '▼' : '▶' }}
                            </button>
                        </div>
                        <div><input
                            type="checkbox"
                            :checked="conjurosStore.estaSeleccionado(carta.index)"
                            @change="conjurosStore.toggleConjuro(carta)">
                        </div>
                        <div><span>{{ carta.name }}</span></div>
                        <div><span class="celdaNivel">{{ carta.level }}</span></div>
                        <div><span>{{ carta.school?.name ?? '-' }}</span></div>
                        <div><span>{{ getComponentes(carta).join(' . ') }}</span></div>
                        <div><span>{{ carta.casting_time }}</span></div>
                        <div><span>{{ carta.duration }}</span></div>
                        <div><span>{{ carta.range }}</span></div>
                    </div>

                    <!-- DESCRIPCIÓN DESPLEGABLE -->
                    <div class="detalle" :class="{ abierta: abiertas.has(index) }">
                        <p v-for="(p, i) in carta.desc" :key="i">
                            {{ p }}
                        </p>

                        <p v-if="carta.higher_level">
                            <strong>A niveles superiores:</strong>
                            {{ carta.higher_level[0] }}
                        </p>
                    </div>

                </div>
            </li>
        </ul>
    </div>

</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useConjurosStore } from '../stores/conjuros'
import { useRouter } from 'vue-router'

const router = useRouter()
const conjurosStore = useConjurosStore()
const cartas = ref([])

onMounted(async () => {
    const res = await fetch('./spells.json')
    cartas.value = await res.json()
})

const getComponentes = (carta) => {
    const componentes = [...(carta.components ?? [])]
    if (carta.ritual) {
        componentes.push("R")
    }
    if (carta.concentration) {
        componentes.push("C")
    }
    return componentes
}

const abiertas = ref(new Set())

const toggle = (index) => {
    if (abiertas.value.has(index)) {
        abiertas.value.delete(index)
    } else {
        abiertas.value.add(index)
    }
}

const generarCartas = () => {
    router.push({name: 'generador'})
}

</script>

<style scoped>

.lista{
    list-style-type: none;
}    
:global(body) {
    background-color: #f7f7f7;
}

.contenedor {
    display: flex;
    width: 80%;
}

.elemento {
    width: 100%;
    min-height: 50px;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
}

.elemento>div {
    width: 100%;
}

.detalle {
    overflow: hidden;
    max-height: 0;
    transition: max-height 0.35s ease, opacity 0.2s ease;
    opacity: 0;
    padding: 0 12px;
    background: #f0f0f0;
}

.detalle.abierta {
    max-height: 300px; /* ajustable */
    opacity: 1;
    padding: 12px;
}

.elemento>div{
    display: flex;
    justify-content: center;
}
</style>
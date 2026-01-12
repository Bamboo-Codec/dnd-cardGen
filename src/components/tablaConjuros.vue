<template>
    <table class="table">

        <colgroup>
            <!-- columnas especiales -->
            <col style="width: 40px"> <!-- flecha -->
            <col style="width: 40px"> <!-- checkbox -->
            <!-- columnas normales -->
            <col style="width: 30%"> <!-- nombre -->
            <col> <!-- nivel -->
            <col> <!-- escuela -->
            <col> <!-- componentes -->
            <col> <!-- tiempo -->
            <col> <!-- duracion -->
            <col> <!-- alcance -->
            <!-- favorito -->
            <col style="width: 40px;">
            <col style="width: 16px;"> <!-- scroll -->
        </colgroup>


        <thead>
            <tr>
                <th colspan=2></th>
                <th style="text-align: left;">Nombre</th>
                <th>Nivel</th>
                <th>Escuela</th>
                <th>Componentes</th>
                <th>Tiempo</th>
                <th>Duracion</th>
                <th>Alcance</th>
                <th></th>
                <th></th>
            </tr>
        </thead>

        <tbody>
            <template v-for="(carta, index) in cartas" :key="index">
                <!-- fila principal -->
                <tr>
                    <td @click="toggleAbiertas(index)"><img style="width: 10px; transition: transform 0.2s ease;" src="/flecha-conjuro.png" :class="{rotar: abiertas.has(index)}"></img></td>
                    <td>
                        <input @click="conjurosStore.toggleConjuro(carta)" :checked="conjurosStore.estaSeleccionado(carta.index)" class="checkbox-oculto" type="checkbox" :id="'check'+index">
                        <label  :for="'check'+index" class="check-custom"></label>
                    </td>
                    <td style="text-align: left;">{{ carta.name }}</td>
                    <td>{{ carta.level }}</td>
                    <td>{{ carta.school?.name ?? '-' }}</td>
                    <td>{{ getComponentes(carta).join(' . ') }}</td>
                    <td>{{ carta.casting_time }}</td>
                    <td>{{ carta.duration }}</td>
                    <td>{{ carta.range }}</td>
                    <td>F</td>
                    <td></td>
                </tr>

                <!-- fila detalle -->

                <tr class="detalle-row">
                    <td :colspan="2"></td>
                    <td :colspan="7" class="detalle">
                        <div class="filaContenido" :class="{'abierta': abiertas.has(index)}">

                            <p v-for="(p, i) in carta.desc" class="detalle" :key="i">
                                {{ p }}
                            </p>
                        </div>
                    </td>
                    <td :colspan="2"></td>
                </tr>
            </template>
        </tbody>
    </table>
</template>

<style scoped>

.rotar{
    transition: transform 0.5s ease;
    transform: rotate(90deg);
}


.detalle-row td {
    text-align: justify;
    padding: 0;
    background-color: #ffe065;
}

.filaContenido {
    overflow-y: auto;
    will-change: max-height, opacity;
    max-height: 0;
    opacity: 1;
    transition: max-height 0.35s cubic-bezier(.4,0,.2,1), opacity 0.2s ease, padding 0.2s ease;
}

.filaContenido.abierta {
    max-height: 300px;
    opacity: 1;
    padding: 12px;
}

.detalle {
    padding: 12px
}

.table {
    width: 100%;
    border-collapse: collapse;
}

/* encabezado fijo */
.table thead th {
    position: sticky;
    top: 0;
    background-color: #ffde59;
    z-index: 2;
}

/* celdas */
th,
td {
    padding: 6px;
    text-align: center;
    overflow: hidden;
    text-overflow: ellipsis;
}

tbody>tr {
    border-top: solid 2px #a83605;
}

th {
    font-family: 'Skranji', serif;
    color: #4a2a00;
    font-weight: 400;
}

td {
    font-family: 'MedievalSharp', cursive;
    color: #4a2a00;
    font-weight: 700;
}
</style>

<script setup>
import { onMounted, ref } from 'vue';
import { useConjurosStore } from '../stores/conjuros';

const conjurosStore = useConjurosStore()
const cartas = ref([])
const abiertas = ref(new Set()) //registro de cartas desplegadas y que no

onMounted(async () => {
    const res = await fetch('./spells.json') //cuando se monta el componente solicita los conjuros
    cartas.value = await res.json()
})

//Funcion para controlar el despliegue de la descripcion
const toggleAbiertas = (index) => {
    if (abiertas.value.has(index)) { //Si el registro tiene el valor de ese index  lo elimina. El .value es por ref()
        abiertas.value.delete(index)
    } else {
        abiertas.value.add(index) //Si no, lo agrega
    }
}

// Funcion para obtener componentes y secuenciarlos
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
</script>
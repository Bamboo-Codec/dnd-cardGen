<template>
        <div class="fila header">
            <img class="imageHeader" src="/App-logo.png">
        </div>
        <div class="fila tabs">
            <div class="tab font-skranji-bold">
                <span>Conjuros</span>
            </div>
        </div>
        <TabsManager :tabs="tabs"></TabsManager>

        <div class="container columna">
            <button class="button font-skranji-reg" @click="generarCartas()">Generar cartas</button>
            
            <div class="tablesContainer fila">
                <div class="tableContainer" ref="tableContainer"><TablaConjuros></TablaConjuros></div>
                <div class="listContainer"><ListaConjuros @ir-a-conjuro="scrollToConjuro"></ListaConjuros></div>
            </div>

            <router-link to="/detalles" class="version">version 0.2</router-link>
        </div>
</template>

<script setup>
import { ref } from 'vue';
import ListaConjuros from './ListaConjuros.vue';
import TablaConjuros from './tablaConjuros.vue';
import { useRouter } from 'vue-router';
import TabsManager from './tabsManager.vue';

const router = useRouter()
const tableContainer = ref(null)
const tabs = [
    {
        name:'Prueba',
        destiny:'',
        active:true
    },
    {
        name:'Prueba 2',
        destiny:'',
        active:true
    }
]

//función para hacer scroll hacia el conjuro (el id llega como parametro desde el hijo)
const scrollToConjuro = (id) => {
    console.log("ID recibido:", id)

    //obtiene la fila con el id
    const row = document.getElementById(`conjuro-${id}`)
    console.log('Fila encontrada:', row)

    //guarda la referencia al contenedor
    const container = tableContainer.value
    console.log('Contenedor:', container)

    //si no hay fila o contenedor termina la función
    if (!row || !container) return

    const rowTop = row.offsetTop
    const containerTop = container.offsetTop

    //acciona el scroll
    container.scrollTo({
        top: rowTop - containerTop,
        behavior: 'smooth'
    })

    row.classList.add('resaltado')
    setTimeout(() => { row.classList.remove('resaltado') }, 2000)
}


const generarCartas = () => {
    router.push({ name: 'generador' })
}
</script>

<style scoped>

.header {
    background-color: #fdff96;
    height: 70px;
}

.imageHeader {
    object-fit: contain;
    width: 270px;
}

.tabs {
    background-color: #fdff96;
    height: 30px;
    justify-content: flex-start;
    align-items: center;
    padding-top: 10px;
}

.tab {
    padding: 5px;
    border: 2px solid #a83605;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom: none;
    color: #a83605;
    background-color: #ffde59;
}

.button {
    background-color: #a83605;
    width: fit-content;
    height: fit-content;
    margin: 15px;
    padding: 10px;
    color: white;
    border-radius: 5px;
    font-size: small;
    cursor: pointer;
    border: none;
}

.container {
    display: flex;
    background-color: #ffde59;
    width: 100%;
    min-height: calc(100% - 70px - 40px); /* menos el header y los tabs */
}

.tablesContainer{
    flex-wrap: wrap;
    padding: 0 2% 0 2%;
    justify-content: space-between;
}

.tableContainer{
    max-height: 650px;
    min-width: min-content;
    max-width: 70%;

    border: 2px solid #a83605;

    overflow-y: auto;
}

.listContainer{
    min-width: min-content;
    max-height: 650px;
    border: 2px solid #a83605;
    overflow-y: auto;
}

.version {
    position: relative;
    bottom: 0;
    color:#a83605;
    align-self: flex-end;
    margin-right: 2%;
    margin-top:3%;
    padding-bottom: 15px;
}


@media screen and (max-width: 1152px) {

    .listContainer{
        margin-top: 20px;
        height: 400px;
    }

    .container {
        padding-bottom: 50px;
    }
}

@media screen and (max-width: 768px ) {
    .listContainer{
        margin-top: 20px;
    }

    .version{
        margin-top: 15px;
    }

    .container{
        overflow-x: auto;
        padding-bottom: 20px;
    }
}

</style>
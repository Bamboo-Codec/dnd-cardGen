<template>
    <div class="modulo">
        <div class="fila header">
            <img class="imageHeader" src="/App-logo.png">
        </div>
        <div class="fila tabs">
            <div class="tab font-skranji-bold">
                <span>Conjuros</span>
            </div>
        </div>



        <div class="container fila">

            <button class="button font-skranji-reg" @click="generarCartas()">Generar cartas</button>
            
            <div class=tablesContainer>
                <div class="tableContainer" ref="tableContainer">
                    <TablaConjuros></TablaConjuros>
                </div>
                <div class="listContainer">
                    <ListaConjuros @ir-a-conjuro="scrollToConjuro"></ListaConjuros>
                </div>
            </div>
        </div>
    </div>
</template>

<script setup>
import { ref } from 'vue';
import ListaConjuros from './ListaConjuros.vue';
import TablaConjuros from './tablaConjuros.vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const tableContainer = ref(null)

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
    setTimeout(() => {row.classList.remove('resaltado')}, 2000)
}  


const generarCartas = () => {
    router.push({name: 'generador'})
}
</script>

<style setup>
.modulo {
    overflow: hidden;
    height: 100vh;
}

.header {
    background-color: #fdff96;
    height: 70px;
}

.imageHeader {
    object-fit: contain;
    width: 270px;
}

.tabs{
    background-color: #fdff96;
    height: 30px;
    justify-content: flex-start;
    align-items: center;
    padding-top: 10px;
}

.tab{
    padding: 5px;
    border: 2px solid #a83605;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    border-bottom: none;
    color: #a83605;
    background-color: #ffde59;
}

.container{
    display: flex;
    flex-wrap: wrap;
    background-color: #ffde59;
    width: 100%;
    height: 100%;
}

.tablesContainer{
    display: flex;
    flex-wrap: wrap;
    background-color: #ffde59;
    width: 100%;
    height: 100%;
}

.tableContainer{
    margin-top: 40px;
    margin-left: 40px;
    border: 5px solid #a83605;
    width:80%;
    height: 70%;
    display: flex;
    justify-content: center;
    align-items: start;
    overflow-y: auto;
}

.listContainer{
    position: absolute;
    margin-top: 40px;
    margin-right: 40px;
    margin-left: 40px;
    right: 0;
    border: 5px solid #a83605;
    width: 13%;
    height: 70%;
    justify-content: center;
    align-items: start;
    overflow-y: auto;
}
.button{
    margin-left: 2%; 
    margin-top: 15px;
    padding: 10px;
    background-color: #a83605;
    color: white;
    border: none;
    border-radius: 5px;
    font-size: medium;
    cursor: pointer;
}
</style>
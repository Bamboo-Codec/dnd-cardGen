<template>

    <div class="container columna">
        <button class="button font-skranji-reg" @click="generarCartas()">Generar cartas</button>

        <div class="tablesContainer fila">
            <div class="tableContainer" ref="tableContainer">
                <TablaConjuros></TablaConjuros>
            </div>
            <div class="listContainer">
                <ListaConjuros @ir-a-conjuro="scrollToConjuro"></ListaConjuros>
            </div>
        </div>

        <router-link to="/detalles" class="version">version 0.2</router-link>
    </div>

</template>

<script setup>
import { useRouter } from 'vue-router';
import ListaConjuros from '../ListaConjuros.vue';
import TablaConjuros from '../tablaConjuros.vue';
import { ref } from 'vue';

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
    setTimeout(() => { row.classList.remove('resaltado') }, 2000)
}


const generarCartas = () => {
    router.push({ name: 'generador' })
}

</script>


<style scoped>

.button {
    background-color: #a83605;
    width: fit-content;
    height: fit-content;
    margin: 15px 0 15px 40px;
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
    max-width: 80%;

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


@media screen and (max-width: 1450px) {

    .listContainer{
        margin-top: 20px;
        min-height: 100px;
    }

    .container {
        padding-bottom: 50px;
    }
    .tableContainer{
        max-width: 100%;
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
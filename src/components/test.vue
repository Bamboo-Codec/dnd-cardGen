<template>
    <div class="modulo">
        <div class="fila header">
            <img class="imageHeader" src="/App-logo.png">
        </div>
        <div class="fila tabs">
            <div class="tab">
                <span>Conjuros</span>
            </div>
        </div>
        <div class="container fila">
            <div class="tableContainer">
                <TablaConjuros></TablaConjuros>
            </div>
            <div class="listContainer">
                <ListaConjuros></ListaConjuros>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import ListaConjuros from './ListaConjuros.vue';
import TablaConjuros from './tablaConjuros.vue';

</script>

<style setup>

.modulo {
    overflow: hidden;
    height: 100vh;
    display: flex;
    flex-direction: column;
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
    font-family: 'Skranji', cursive;
    font-weight: 400;
    color: #a83605;
}

.container{
    display: flex;
    flex:1;
    overflow: hidden;
    background-color: #ffde59;
    padding: 40px;
    gap: 40px;
    
}

.tableContainer{
    border: 5px solid #a83605;
    width:80%;
    height: 100%;
    overflow-y: auto;
}

.listContainer{
    border: 5px solid #a83605;
    width: 13%;
    overflow-y: auto;
    height: 100%;
}
</style>
<template>
    <div class="fila header">
        <img class="imageHeader" src="/App-logo.png">
    </div>
    <TabsManager :tabs="tabs"></TabsManager>
    <div class="container">
        <component :is="Modulo"></component>
    </div>
</template>

<script setup>
import TabsManager from '../tabsManager.vue';

const props = defineProps({
    Modulo:{
        type: Object,
        required: true
    }
})

const tabs = [
        {name: 'Conjuros', destiny:'inicio', active: true},
        {name: 'Favoritos', destiny:'', active: false},
    ]
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

</style>
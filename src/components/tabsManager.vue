<template>
    <div class="fila tabs">
        <div @click="selectTab(index)" v-for="(tab, index) in activeTabs" class="tab font-skranji-bold"
            :class="{ 'selected': tabSelected == index }">
            <span>{{ tab.name }}</span>
        </div>
    </div>
</template>

<style scoped>

.tabs {
    display: flex;
    background-color: #fdff96;
    height: 30px;
    padding-top: 10px;
    border-bottom: 2px solid #a83605;
    align-items: flex-end;
}

.tab {
    position: relative;
    min-width: fit-content;
    padding: 5px 10px;
    border: 2px solid #a83605;
    border-bottom: 1px solid #a83605;
    border-top-left-radius: 10px;
    border-top-right-radius: 10px;
    color: #a83605;
    background-color: #fdff96;

    display: flex;
    align-items: center;
}

.selected {
        border-bottom: none;

    padding-bottom: 7px;
    background-color: #ffde59;
    z-index: 1;
}
</style>

<script setup>
import { computed, ref, watch } from 'vue';
import { useRouter } from 'vue-router';

const router = useRouter()
const props = defineProps({
    tabs: {
        type: Array,
        required: true,
        validator: (value) => {
            //Verificar que todos los elementos sean objetos
            if (!value.every(tab => typeof tab === 'object' && tab !== null)) {
                console.warn('The prop "tabs" should be an object array')
                return false
            }

            //Verificar que cada objeto tiene las propiedades requeridas
            return value.every(tab => {
                if (typeof tab !== 'object' || tab === null) {
                    console.warn('Each tab must be an object')
                    return false
                }

                if (typeof tab.name !== 'string') {
                    console.warn('The property "name" should be type of STRING')
                    return false
                }

                if (typeof tab.destiny !== 'string') {
                    console.warn('The property "destiny" should be type of STRING')
                    return false
                }

                if (typeof tab.active !== 'boolean') {
                    console.warn('The property "active" should be type of BOOLEAN')
                    return false
                }

                return true
            })
        }
    }
})

const tabSelected = ref(0)
const activeTabs = computed(() => {
    return props.tabs.filter(tab => tab.active)
})

watch(
    activeTabs, (tabs) => {
        if (tabs.length) {
            return
        }
        if (!tabs[tabSelected.value]) {
            tabSelected.value = 0
        }
    },
    // { immediate: true }
)

const selectTab = (index) => {
    tabSelected.value = index
    console.log('Tab seleccionado:', index)
    try {
        router.push(activeTabs.value[index].destiny)
    } catch (error) {
        console.error(error)
    }
}
</script>
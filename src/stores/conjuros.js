import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useConjurosStore = defineStore('conjuros', () => {
    // estado
    const seleccionados = ref([])

    // acciones
    const toggleConjuro = (conjuro) => {
        const index = seleccionados.value.findIndex(
            c => c.index === conjuro.index
        )

        if (index !== -1) {
            seleccionados.value.splice(index, 1)
        } else {
            seleccionados.value.push(conjuro)
        }

        console.log(
            'Seleccionados:',
            seleccionados.value.map(c => c.name)
        )
    }

    //Retorna true si la lista contiene el indice
    const estaSeleccionado = (conjuroIndex) => {
        return seleccionados.value.some(c => c.index === conjuroIndex)
    }

    const getConjuros = () => {
        return seleccionados.value
    }

    const limpiar = () => {
        seleccionados.value = []
    }

    return {
        // estado
        seleccionados,
        toggleConjuro,
        estaSeleccionado,
        getConjuros,
        limpiar
    }
})

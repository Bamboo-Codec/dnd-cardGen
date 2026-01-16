<template>
    <div class="divCarta carta">
        <div class="divClase">
            <span class="textClase">{{ props.clase }}</span>
        </div>
        <div class="contenido">

            <!-- linea uno -->
            <div class="divNombre box">
                <span class="textNombre">{{ props.nombre }}</span>
            </div>

            <!-- linea dos -->
            <div class="fila">

                <div class="box divNivel columna">
                    <span>Nivel</span>
                    <span>{{ props.nivel }}</span>
                </div>

                <div class="box divEscuela">
                    <span>{{ props.escuela }}</span>
                </div>

                <div class="columna box divComponentes">
                    <div class="fila divInternoComponentes">
                        <div class="columna"><span>R</span><span
                                :class="{ 'circulo': true, 'activo': props.componentes.r }"></span></div>
                        <div class="columna"><span>C</span><span
                                :class="{ 'circulo': true, 'activo': props.componentes.c }"></span></div>
                        <div class="columna"><span>V</span><span
                                :class="{ 'circulo': true, 'activo': props.componentes.v }"></span></div>
                        <div class="columna"><span>S</span><span
                                :class="{ 'circulo': true, 'activo': props.componentes.s }"></span></div>
                        <div class="columna"><span>M</span><span
                                :class="{ 'circulo': true, 'activo': props.componentes.m }"></span></div>
                    </div>
                </div>
            </div>

            <!-- linea tres -->
            <div class="fila">

                <div class="box columna divTiempo">
                    <span>Tiempo</span>
                    <span>{{ props.tiempo }}</span>
                </div>

                <div class="box columna divDuracion">
                    <span>Duración</span>
                    <span>{{ props.duracion }}</span>
                </div>

                <div class="box columna divAlcance">
                    <span>Alcance</span>
                    <span>{{ props.alcance }}</span>
                </div>

            </div>

            <!--linea cuatro-->
            <div class="columna box divDescripción">
                <span v-if="props.parte" class="parteDesc">{{ props.parte }}</span>
                <span class="descConjuro">{{ props.descripcion }}</span>
            </div>

        </div>
    </div>

</template>

<script setup>
const props = defineProps({
    clase: {type: String,required: true},
    nombre: {type: String,required: true},
    nivel: {type: Number,required: true},
    escuela: {type: String,required: true},
    componentes: {
        type: Object,
        required: true,
        default: () => ({
            r: false,
            c: false,
            v: false,
            s: false,
            m: false
        })
    },
    tiempo: {type: String,required: true},
    duracion: {type: String,required: true,},
    alcance: {type: String,required: true},
    parte: {type: String,default:''},
    descripcion: {type: String,required: true}
})
</script>

<style scoped>
.box {
    border: 0.4mm solid black;
}

.divCarta {
    /**Establecer dimenciones de la carta */
    min-width: 90mm;
    width: 90mm;
    max-width: 90mm;

    min-height: 100mm;
    min-height: 100mm;
    max-height: 100mm;

    display: flex;
    flex-direction: column;
    align-items: flex-start;

    font-weight: bold;
    /**todos los textos internos serán bold */
    border: 1px solid black;
    padding: 5px !important;
    border-radius: 10px;
    margin: 0 !important;

}

.divClase {
    width: calc(100% - 4mm);
    min-height: 2mm;
    margin-left: 2mm;
    display: flex;
    align-items: self-start;
}

.textClase {
    line-height: 1.3;
    font-size: 5pt;
}

.contenido {
    /**establece limites de contenido */
    min-width: calc(100% - 4.5mm);
    max-width: calc(100% - 4.5mm);
    min-height: calc(100% - 4mm);
    max-height: calc(100% - 4mm);
    height: calc(100% - 4mm);

    display: flex;
    align-items: stretch;
    flex-direction: column;


    margin-left: 2mm;
}

.divNombre {
    display: flex;
    align-items: center;
    min-height: 15mm;

}

.textNombre {
    display: block;
    width: 100%;

    text-align: center;
    text-wrap: balance;
    line-height: 1.2;
}

.divNivel {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 15mm;
    min-width: 15mm;
    max-width: 15mm;
    border-top: 0;
}

.divEscuela {
    border-left: 0;
    border-top: 0;

    width: 44mm;
    min-width: 44mm;
    max-width: 44mm;

    display: flex;
    justify-content: center;
    align-items: center;
}

.divComponentes {
    display: flex;
    justify-content: center;

    border-left: 0;
    border-top: 0;
    width: 25.7mm;
}

.divInternoComponentes {
    display: flex;
    justify-content: space-evenly;
}

.circulo {
    width: 3mm;
    min-height: 3mm;
    border: 0.28mm solid black;
    border-radius: 50%;
}

.activo {
    background-color: black;
}

.divTiempo {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 26mm;
    min-height: 15mm;
    border-top: 0;
}

.divDuracion {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 35mm;
    min-height: 15mm;
    border-top: 0;
    border-left: 0;
}

.divAlcance {
    display: flex;
    justify-content: center;
    align-items: center;

    width: 23.7mm;
    min-height: 15mm;
    border-top: 0;
    border-left: 0;
}

.divDescripción {
    display: flex;
    flex-direction: column;
    justify-content: flex-start;
    align-items: center;

    border-top: 0;
    height: 100%;
    overflow: hidden;

    flex: 1; /* CAMBIO IMPORTANTE: ocupa todo el espacio restante */
    min-height: 0; /* Permite que el contenedor flex se reduzca */
}

.parteDesc {
    width: 100%;
    text-align: center;
}

.descConjuro {
    font-size: 8pt;
    width: 98%;
    flex: 1;
    min-height: 0;
    
    text-align: center;
    text-wrap: balance;
    overflow: hidden;
    line-height: 1.3;
    
    /* Para alinear el texto arriba pero mantener la caja expandida */
    display: flex;
    flex-direction: column;
    justify-content: flex-start; /* Empieza desde arriba */
}

</style>
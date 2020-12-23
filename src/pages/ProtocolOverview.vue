<template>
    <base-layout :pageTitle="protocol.name">
        
        
        <ion-grid>
            <ion-row v-for="factor in factors" v-bind:key="factor.name">
                <ion-col size="10">
                    {{ factor.name }}
                </ion-col>
                <ion-col>
                    <ion-checkbox color="primary" :checked="factor.done"></ion-checkbox>
                </ion-col>
            </ion-row>
        </ion-grid>


        <h2 style="text-align: center">Lista de Creencias</h2>
        

        <ion-item>
            <ion-label position="floating">Escribe tu nueva creencia..</ion-label>
            <ion-input></ion-input>
        </ion-item>
        
        <ion-button color="primary" expand="full">
            Añadir
        </ion-button>

        
        <ion-list>
            <ion-item v-for="belief in beliefs" v-bind:key="belief.id" lines="full">
                <ion-checkbox slot="start" />
                <ion-label class="ion-text-wrap">{{ belief.text }}</ion-label>
                <ion-button fill="clear">
                    <ion-icon src="/assets/trash.svg" />
                </ion-button>
            </ion-item>
        </ion-list>
        
        
        <ion-button color="light" slot="center">
            <ion-icon src="/assets/refresh.svg" />
            Regrabar creencias
        </ion-button>


    </base-layout>
</template>

<script>
import BaseLayout from "@/components/Layout/BaseLayout.vue"
import {
    IonButton,
    IonGrid,
    IonRow,
    IonCol,
    IonCheckbox,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
} from "@ionic/vue"

export default {
    components: {
        BaseLayout,


        IonButton,
        IonGrid,
        IonList,
        IonRow,
        IonCol,
        IonCheckbox,
        IonItem,
        IonLabel,
        IonInput,
    },

    data() {
        return {
            protocol: {
                name: "Mi protocolo 1"
            },
            factors: [
                {name: "Energías Negativas Externas+", done: true},
                {name: "Acuerdos Karmicos", done: false},
                {name: "Traumas", done: true},
                {name: "Lealtades", done: true},
                {name: "Bloqueos emocionales", done: true},
                {name: "Bloqueos espirituales", done: false},
            ],
            beliefs: [
                {id: 1, text: "Merezco ser increible", done: true},
                {id: 2, text: "Soy capaz de lograr todo lo que me propongo", done: false},
            ],
        }
    }
    
}
</script>
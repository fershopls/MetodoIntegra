<template>
    <base-layout pageTitle="Crear un Protocolo">
        
        
        <ion-item>
            <ion-label position="floating">Escribe el nombre del protocolo..</ion-label>
            <ion-input v-model="protocolName" @keyup.enter="createProtocol"></ion-input>
        </ion-item>
        
        
        <ion-button color="primary" expand="full" @click="createProtocol">
            Añadir
        </ion-button>


    </base-layout>
</template>

<script>
import BaseLayout from "@/components/Layout/BaseLayout.vue"

import {
    IonItem,
    IonButton,
    IonLabel,
    IonInput,
} from "@ionic/vue"

export default {
    components: {
        BaseLayout,


        IonItem,
        IonButton,
        IonLabel,
        IonInput,
    },
    data(){
        return {
            protocolName: "",
        }
    },
    methods: {
        createProtocol() {
            this.$storage.create(this.protocolName).then(() => {
                this.$router.replace('/');
            })
        },
    }
    
}
</script>
<template>

    <ion-page>
        <ion-toolbar>
            <ion-back-button slot="end" :icon="close" default-href="/"></ion-back-button>
        </ion-toolbar>

        <ion-content class="ion-padding">
            <ion-item>
                <!-- <ion-label position="floating">Escribe el nombre del protocolo..</ion-label> -->
                <ion-input v-model="protocolName" placeholder="Escribe el nombre del protocolo..." @keyup.enter="createProtocol"></ion-input>
            </ion-item>
            
            <br>
            
            <ion-button color="primary" expand="full" @click="createProtocol">
                Añadir Protocolo
            </ion-button>
        </ion-content>
    </ion-page>

</template>

<script>
import {
    IonContent,

    IonToolbar,
    IonBackButton,
    IonPage,

    IonItem,
    IonButton,
    // IonLabel,
    IonInput,
} from "@ionic/vue"


import {
    close
}
from "ionicons/icons"

export default {
    components: {

        IonContent,

        IonToolbar,
        IonBackButton,
        IonPage,

        IonItem,
        IonButton,
        // IonLabel,
        IonInput,
    },
    setup() {
        return {
            close,
        }
    },
    data(){
        return {
            protocolName: "",
        }
    },
    methods: {
        createProtocol() {
            if (this.protocolName == "") return;

            this.$storage.create(this.protocolName).then(() => {
                this.$router.replace('/');
            })
        },
    }
    
}
</script>
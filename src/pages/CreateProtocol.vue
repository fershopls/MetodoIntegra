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
import { Plugins } from "@capacitor/core";
const { Storage } = Plugins


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
            protocols: [],
        }
    },
    mounted(){
        this.getAllProtocols()
    },
    methods: {
        createProtocol() {
            if (this.protocolName == "") return;
            this.protocols.push(this.createProtocolObject(this.protocolName))
            
            Storage.set({
                key: "protocols",
                value: JSON.stringify(this.protocols)
            }).then(() => {
                this.$router.replace('/');
            })

        },
        createProtocolObject(protocolName) {
            return {
                id: new Date().getTime(),
                name: protocolName,
                beliefs: [],
            }
        },
        async getAllProtocols() {
            const {value} = await Storage.get({key: "protocols"})
            if (value != null) {
                this.protocols = JSON.parse(value)
            }
        }
    }
    
}
</script>
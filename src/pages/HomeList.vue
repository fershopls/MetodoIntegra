<template>
    <base-layout pageTitle="Mis Protocolos">
        
        
        <ion-list>
            <ion-item v-for="protocol in protocols" button :router-link="'/protocol/'+protocol.id" v-bind:key="protocol.id">
                <ion-label>{{ protocol.name }}</ion-label>
                <!-- <ion-note slot="end">{{ protocol.date }}</ion-note> -->
            </ion-item>
        </ion-list>

        
        <!-- fab placed to the (vertical) center and end -->
        <ion-fab vertical="bottom" horizontal="end" slot="fixed">
            <ion-fab-button router-link="/create">
                <ion-icon src="/assets/add.svg" />
            </ion-fab-button>
        </ion-fab>

    </base-layout>
</template>

<script>
import { Plugins } from "@capacitor/core";
const { Storage } = Plugins

import BaseLayout from "@/components/Layout/BaseLayout.vue"

import {
    IonList,
    IonItem,
    IonFab,
    IonFabButton,
    IonIcon,
    IonLabel,
    // IonNote,
} from "@ionic/vue"

export default {
    components: {
        BaseLayout,


        IonList,
        IonItem,
        IonFab,
        IonFabButton,
        IonIcon,
        IonLabel,
        // IonNote,
    },
    mounted(){
        this.getAllProtocols()
    },
    updated(){
        this.getAllProtocols()
    },
    methods: {
        async getAllProtocols() {
            const {value} = await Storage.get({key: "protocols"})
            if (value != null) {
                this.protocols = JSON.parse(value)
            }
        }
    },
    data() {
        return {
            protocols: [],
        }
    },
    
}
</script>
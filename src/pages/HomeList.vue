<template>
    <base-layout pageTitle="Mis Protocolos">
        
        
        <ion-list>
            <ion-item v-for="protocol in protocols.slice().reverse()" button :router-link="'/protocol/'+protocol.id" v-bind:key="protocol.id">
                <ion-label>{{ protocol.name }}</ion-label>
                <ion-note slot="end">{{ timeToDateText(protocol.id) }}</ion-note>
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
    IonNote,
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
        IonNote,
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
        },

        timeToDateText(time){
            let date = new Date(time)
            console.log({time})
            let months = [
                "Ene",
                "Feb",
                "Mar",
                "Abr",
                "May",
                "Jun",
                "Jul",
                "Ago",
                "Sep",
                "Oct",
                "Nov",
                "Dic",
            ]
            let day = date.getDay()
            day = day < 10? "0"+day:day
            let year = date.getFullYear()
            return months[date.getMonth() - 1] + " " + day + " " + year
        }
    },
    data() {
        return {
            protocols: [],
        }
    },
    
}
</script>
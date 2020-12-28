<template>
    <layout pageTitle="Mis Protocolos" ref="homeLayout">
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

    </layout>
</template>


<script>
const moment = require("moment");
import Layout from "./Layout.vue"


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
        Layout,


        IonList,
        IonItem,
        IonFab,
        IonFabButton,
        IonIcon,
        IonLabel,
        IonNote,


    },
    mounted(){
        this.retriveAllProtocols()
        this.$refs.homeLayout.showWelcomeScreen()
        setTimeout(() => {
            this.$refs.homeLayout.hideWelcomeScreen()
        }, 580)
    },
    updated(){
        this.retriveAllProtocols()
    },
    methods: {
        async retriveAllProtocols() {
            return this.$storage.getAllProtocols().then((result) => {
                this.protocols = result
            })
        },

        timeToDateText(time){
            return moment(time).format("MMM DD YYYY")
        },
    },
    data() {
        return {
            protocols: [],
        }
    },
    
}
</script>
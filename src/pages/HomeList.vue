<template>

    <home-layout pageTitle="Mis Protocolos" ref="homeLayout">
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

    </home-layout>
</template>


<script>

import HomeLayout from "@/components/Layout/HomeLayout.vue"


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
        HomeLayout,


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
            let date = new Date(time)
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
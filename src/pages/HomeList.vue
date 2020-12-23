<template>
    <base-layout pageTitle="Mis Protocolos">
        
        
        <ion-list>
            <ion-item v-for="protocol in list" button :router-link="'/protocol/'+protocol.id" v-bind:key="protocol.id">
                <ion-label>{{ protocol.name }}</ion-label>
                <ion-note slot="end">{{ protocol.date }}</ion-note>
            </ion-item>
        </ion-list>

        
        <!-- fab placed to the (vertical) center and end -->
        <ion-fab vertical="bottom" horizontal="end" slot="fixed">
            <ion-fab-button>
                <ion-icon src="/assets/add.svg" />
            </ion-fab-button>
        </ion-fab>

    </base-layout>
</template>

<script>
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
import add from "ionicons"

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
    computed: {
        protocol_list(){
            return this.$store.getters.protocol_list
        }
    }
    data(){
        return {
            list: [
                {id: 1, name: "Mi protocolo 1", date: "Dic 28"},
                {id: 2, name: "Mi proto 22222", date: "Dic 20"},
            ]
        }
    },
    setup(){
        return {
            add
        }
    }
    
}
</script>
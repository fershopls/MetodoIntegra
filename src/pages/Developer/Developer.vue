<template>
    <layout pageTitle="Opciones de Desarrollador">
        
        <div class="ion-padding">
            <ion-textarea :value="protocolsToText" auto-grow="true" />
        </div>


    </layout>
</template>


<script>
import Layout from "@/pages/Home/Layout"


import {
    // IonList,
    // IonItem,
    // IonFab,
    // IonFabButton,
    // IonIcon,
    // IonLabel,
    // IonNote,
    IonTextarea,

} from "@ionic/vue"


export default {
    components: {
        Layout,


        // IonList,
        // IonItem,
        // IonFab,
        // IonFabButton,
        // IonIcon,
        // IonLabel,
        // IonNote,
        IonTextarea,

    },
    
    
    mounted(){
        this.retriveAllProtocols()
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
    },


    data() {
        return {
            protocols: [],
        }
    },

    computed: {
        protocolsToText(){
            return JSON.stringify(this.protocols, null, "  ")
        }
    }
}
</script>
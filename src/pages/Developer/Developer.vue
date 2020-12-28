<template>
    <layout pageTitle="Opciones de Desarrollador">
        
        <div class="ion-padding">
            <ion-textarea :value="protocolsToText" auto-grow="true" />
        </div>

        <ion-content class="ion-padding">
            <ion-textarea ref="exportTextarea" class="exportedText" :value="protocolsToText" ></ion-textarea>
        </ion-content>
        
        <template v-slot:footer>
            <ion-footer>
                <ion-toolbar>
                    <ion-buttons>
                        <ion-button color="primary" @click="selectAllText" style="width: 100%" >
                            Guardar
                        </ion-button>
                    </ion-buttons>
                </ion-toolbar>
            </ion-footer>
        </template>

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
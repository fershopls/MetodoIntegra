<template>
    <layout pageTitle="Opciones de Desarrollador">

        <ion-content class="ion-padding">
            <ion-textarea v-model="textToJSON" class="exportedText" ></ion-textarea>
        </ion-content>
        
        <template v-slot:footer>
            <ion-footer>
                <ion-toolbar>
                    <ion-buttons>
                        <ion-button color="primary" @click="saveProtocols" style="width: 100%" >
                            Guardar
                        </ion-button>
                    </ion-buttons>
                </ion-toolbar>
            </ion-footer>
        </template>

    </layout>
</template>


<style lang="stylus">
.exportedText
    background-color #fafafa
    border solid 1px #f1f1f1
    &, *
        height 100%
</style>


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
    
    IonToolbar,
    IonFooter,
    IonButtons,
    IonButton,
    IonContent,


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
        
        IonToolbar,
        IonFooter,
        IonButtons,
        IonButton,
        IonContent,


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
                this.textToJSON = this.protocolsToText()
            })
        },


        async saveProtocols() {
            let jsonData = JSON.parse(this.textToJSON)
            console.log(jsonData)
        },

        
        protocolsToText(){
            return JSON.stringify(this.protocols, null, "  ")
        }
    },


    data() {
        return {
            protocols: [],
            textToJSON: "",
        }
    },

}
</script>
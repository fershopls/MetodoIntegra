<template>
    <layout pageTitle="Opciones de Desarrollador">
        
        
        <pre>
            {{ protocols }}
        </pre>


    </layout>
</template>


<script>
import Layout from "@/pages/Home/Layout"


// import {
    // IonList,
    // IonItem,
    // IonFab,
    // IonFabButton,
    // IonIcon,
    // IonLabel,
    // IonNote,

// } from "@ionic/vue"


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
    
}
</script>
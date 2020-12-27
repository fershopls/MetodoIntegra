<template>
    <ion-page>
        <ion-header>
            <ion-toolbar color="primary">
                <ion-title>Exportar</ion-title>
                
                <ion-buttons slot="end">
                    <ion-button @click="$emit('dimiss')">
                        <ion-icon :icon="close" slot="icon-only" />
                    </ion-button>
                    <slot name="toolbar-buttons-end"/>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
            <p>Puedes copiar tu protocolo aquí:</p>
            <ion-textarea ref="exportTextarea" @click="selectAllText" class="exportedText" :value="exportedString" rows="20"></ion-textarea>
        </ion-content>
    </ion-page>
</template>


<style lang="stylus">
.exportedText
    background-color #fafafa
    border solid 1px #f1f1f1
</style>


<script>
import { close } from "ionicons/icons";

import { 
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonTextarea,
    

    IonButtons,
    IonButton,
    IonIcon
} from "@ionic/vue";


export default {
    props: ["exportedString"],
    components: {
        IonPage,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        
        
        IonTextarea,
        IonButtons,
        IonButton,
        IonIcon,
    },

    setup() {
        return {
            close,
        }
    },

    methods: {
        async selectAllText() {
            let textarea = await this.$refs.exportTextarea.$el.getInputElement()
            textarea.focus()
            textarea.select()
        },
    },
}
</script>
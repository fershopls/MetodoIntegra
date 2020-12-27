<template>
    <ion-page>
        <ion-header>
            <ion-toolbar color="primary">
                <ion-title>Importar Creencias</ion-title>
                
                <ion-buttons slot="end">
                    <ion-button @click="dimiss()">
                        <ion-icon :icon="close" slot="icon-only" />
                    </ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>

        <ion-content class="ion-padding">
            <div id="step-1" v-if="step == 1">
                <h2>Pega aquí tus creencias:</h2>
                <ion-textarea :placeholder="textareaPlaceholder" rows="8" v-model="importedText" class="exportedText" />
                <ion-button @click="goStep2" color="primary" expand="full">Continuar</ion-button>
            </div>
            <div id="step-2" v-if="step == 2">
                <h2>Confirma la Importación</h2>
                <ion-list>
                    <ion-item v-for="(belief, index) in beliefs" v-bind:key="belief">
                        {{ index + 1}}. {{ belief }}
                    </ion-item>
                </ion-list>

                <ion-grid class="buttons">
                    <ion-row>
                        <ion-col>
                            <ion-button @click="step = 1" fill="outline">Volver</ion-button>
                        </ion-col>
                        <ion-col>
                            <ion-button @click="emitBeliefs">Continuar</ion-button>
                        </ion-col>
                    </ion-row>
                </ion-grid>
            </div>
        </ion-content>
    </ion-page>
</template>


<style lang="stylus">
.buttons ion-button
    width 100%
.exportedText
    background-color #fafafa
    border solid 1px #f1f1f1
    margin-bottom 8px
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

    IonItem,
    IonList,

    IonGrid,
    IonRow,
    IonCol,
    

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

        
        IonItem,
        IonList,

        IonGrid,
        IonRow,
        IonCol,
        
        
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

    data(){
        return {
            textareaPlaceholder: "1. Merezco...\n2. Confio..\n3. Etc..",
            step: 1,
            importedText: "",
            beliefs: [],
        }
    },

    methods: {
        async goStep2(){
            if (this.importedText == "") return;
            this.beliefs = await this.getBeliefsFromText(this.importedText)
            this.step = 2
        },

        async getBeliefsFromText(importedText){
            let beliefs = []
            importedText.split("\n").forEach((line) => {
                let emptyLineRegex = /^\s*$/;
                
                if (emptyLineRegex.test(line))
                    return;
                
                const regex = /^(\d+\.\s+)?(.+)/gm;
                let beliefString = regex.exec(line)
                beliefs.push(beliefString[2])
            })
            return beliefs
        },

        emitBeliefs(){
            this.$emit("imported", this.beliefs)
            this.dimiss()
        },

        dimiss() {
            this.$emit("dimiss")
        },

    },
}
</script>
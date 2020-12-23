<template>
    <base-layout :pageTitle="protocol.name">

        <ion-item>
            <ion-textarea placeholder="Describe tu objetivo aquí..."></ion-textarea>
        </ion-item>
        

        <h2 style="text-align: center">Elementos Energéticos</h2>
        
        <ion-list>
            <ion-item v-for="factor in factors" v-bind:key="factor.name" lines="full">
                <ion-label class="ion-text-wrap">{{ factor.name }}</ion-label>
                <ion-checkbox slot="end" v-model="factor.done"/>
            </ion-item>
        </ion-list>
        


        <h2 style="text-align: center">Lista de Creencias</h2>
        

        <ion-item>
            <ion-label position="floating">Escribe tu nueva creencia..</ion-label>
            <ion-input v-model="beliefText" @keyup.enter="addBelief"></ion-input>
        </ion-item>
        
        <ion-button color="primary" expand="full" @click="addBelief">
            Añadir
        </ion-button>

        
        <ion-list>
            <!-- .slice().reverse() -->
            <ion-item v-for="(belief, index) in protocol.beliefs" v-bind:key="belief" lines="full">
                <ion-checkbox slot="start" v-model="belief.done"/>
                <ion-label class="ion-text-wrap">{{ index + 1}}. {{ belief.text }}</ion-label>
                <ion-button fill="clear" @click="deleteBelief(belief)">
                    <ion-icon src="/assets/trash.svg" />
                </ion-button>
            </ion-item>
        </ion-list>
        

        <br>
        

        <ion-button color="light" expand="full" @click="undoneAllBeliefs">
            <ion-icon src="/assets/refresh.svg" />
            Regrabar creencias
        </ion-button>


    </base-layout>
</template>

<script>
import { Plugins } from "@capacitor/core";
const { Storage } = Plugins


import BaseLayout from "@/components/Layout/BaseLayout.vue"
import {
    IonButton,
    IonCheckbox,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
} from "@ionic/vue"

export default {
    components: {
        BaseLayout,


        IonButton,
        IonList,
        IonCheckbox,
        IonItem,
        IonLabel,
        IonInput,
        IonTextarea,
    },

    mounted() {
        this.loadProtocolById()
    },

    data() {
        return {
            protocolId: this.$route.params.id,
            beliefText: "",

            protocol: {},

            name: "Mi protocolo 1",
            beliefs: [
                {text: "Merezco ser increible", done: true},
                {text: "Soy capaz de lograr todo lo que me propongo", done: false},
            ],
            factors: [
                {name: "Energías Negativas Externas+", done: true},
                {name: "Acuerdos Karmicos", done: false},
                {name: "Traumas", done: true},
                {name: "Lealtades", done: true},
                {name: "Bloqueos emocionales", done: true},
                {name: "Bloqueos espirituales", done: false},
            ],
        }
    
    },


    computed: {
        loadedProtocol() {
            return this.$store.getters.getProtocolById(this.protocolId);
        },
    },

    methods: {
        async loadProtocolById(){
            console.log("hello")
            const {value} = await Storage.get({ key: "protocols" })
            if (value == null) return;
            let id = this.protocolId
            let protocols = JSON.parse(value)
            let protocol = protocols.find((protocol) => protocol.id == id)
            console.log({id, protocol})
            if (protocol) {
                this.protocol = protocol
            }
        },

        xd() {
            console.log(this.$store.getters.getProtocolById(this.protocolId))
        },

        addBelief() {
            if (this.beliefText == "") return;
            this.beliefs.push({
                text: this.beliefText,
                done: false,
            })
            this.beliefText = ""
        },
        deleteBelief(belief) {
            this.beliefs.splice(this.beliefs.indexOf(belief), 1)
        },
        undoneAllBeliefs() {
            this.beliefs.forEach((belief) => {
                belief.done = false
            })
        }
    }
    
}
</script>
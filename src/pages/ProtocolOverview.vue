<template>
    <base-layout :pageTitle="protocol.name">

        <ion-item>
            <ion-textarea placeholder="Describe tu objetivo aquí..." v-model="protocol.description" auto-grow="true" @ionBlur="saveProtocol"></ion-textarea>
        </ion-item>
        

        <h2 style="text-align: center">Elementos Energéticos</h2>
        
        <ion-list>
            <ion-item v-for="(factor, index) in factors" v-bind:key="factor" lines="full">
                <ion-label class="ion-text-wrap">{{ factor }}</ion-label>
                <ion-checkbox slot="end" @ionChange="onFactorChanged($event, index)" v-bind:checked="isFactorDone(index)"/>
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
            <ion-item v-for="(belief, index) in protocol.beliefs.slice().reverse()" v-bind:key="belief" lines="full">
                <ion-checkbox slot="start" v-model="belief.done"/>
                <ion-label class="ion-text-wrap">{{ index + 1}}. {{ belief.text }}</ion-label>
                <ion-button fill="clear" @click="deleteBelief(belief)">
                    <ion-icon src="/assets/trash.svg" />
                </ion-button>
            </ion-item>
        </ion-list>
        

        <br>
        <!-- <pre>{{ protocol }}</pre> -->


        <ion-button color="light" expand="full" @click="undoneAllBeliefs">
            <ion-icon src="/assets/refresh.svg" />
            Regrabar creencias
        </ion-button>
        <br>
        
        <ion-button color="warning" expand="full" @click="showExportAlert">
            Exportar Protocolo
        </ion-button>
        <br>
        
        <ion-button color="warning" expand="full" @click="showRenameAlert">
            Cambiar nombre
        </ion-button>
        <br>

        <ion-button color="danger" expand="full" @click="showDeleteAlert">
            Eliminar protocolo
        </ion-button>


        <!-- <ion-button color="success" expand="full" @click="saveProtocol">Save</ion-button> -->


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
    alertController,
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
        // this.interval = setInterval(this.saveProtocol, 1000)
    },

    unmounted() {
        this.saveProtocol()
    },

    data() {
        return {
            protocolId: this.$route.params.id,
            beliefText: "",

            protocol: {
                description: "",
                beliefs: [],
                factors: [],
            },

            factors: [
                "Portales Multidimensionales",
                "Espíritus",
                "Energías Negativas Externas",
                "Pactos Secretos",
                "Acuerdos Karmicos",
                "Traumas",
                "Lealtades",
                "Bloqueos emocionales",
                "Bloqueos espirituales",
                "Escudos de Protección",
            ],
        }
    
    },


    methods: {
        async loadProtocolById(){
            const {value} = await Storage.get({ key: "protocols" })
            
            if (value == null) return;
            let id = this.protocolId
            let protocols = JSON.parse(value)
            let protocol = protocols.find((protocol) => protocol.id == id)
            // console.log({id, protocol})
            if (protocol) {
                this.protocol = protocol
                this.elements = protocol.elements
            }
        },


        async showRenameAlert() {
            const alert = await alertController
                .create({
                    header: 'Cambiar nombre',
                    //message: 'Message <strong>text</strong>!!!',
                    inputs: [
                        {
                            name: "protocolName",
                            value: this.protocol.name,
                        },
                    ],
                    buttons: [
                        {
                            text: 'Cancelar',
                            role: 'cancel',
                            cssClass: 'secondary',
                        },
                        {
                            text: 'Ok',
                            handler: (alertData) => {
                                this.protocol.name = alertData.protocolName
                                this.saveProtocol()
                            },
                        },
                    ],
                });
            return alert.present();
        },


        async showDeleteAlert() {
            const alert = await alertController
                .create({
                    header: 'Estas seguro?',
                    message: 'Esta accion no se puede deshacer, por favor escribe <strong>CONFIRMAR</strong>, en el campo de abajo.',
                    inputs: [
                        {
                            name: "confirmField",
                            placeholder: "CONFIRMAR",
                        },
                    ],
                    buttons: [
                        {
                            text: 'Cancelar',
                            role: 'cancel',
                            cssClass: 'secondary',
                        },
                        {
                            text: 'Ok',
                            handler: (alertData) => {
                                if (alertData.confirmField.toLowerCase() == "confirmar") {
                                    this.deleteProtocol()
                                }
                            },
                        },
                    ],
                });
            return alert.present();
        },


        async showExportAlert() {
            let protocolExported = ""
            let protocol = this.protocol
            protocolExported += protocol.name + "\n\n"
            protocolExported += "=====\n"+protocol.description + "\n=====\n\n"
            protocol.beliefs.forEach((b, i) => {
                protocolExported += (i+1) + ". " +b.text+"\n"
            })

            const alert = await alertController
                .create({
                    header: 'Exportar protocolo',
                    inputs: [
                        {
                            name: "confirmField",
                            type: "textarea",
                            value: protocolExported,
                            rows: 10,
                        },
                    ],
                    buttons: [
                        {
                            text: 'Ok'
                        },
                    ],
                });
            return alert.present();
        },


        async deleteProtocol() {
            const {value} = await Storage.get({key: "protocols"})
            if (value == null) return
            
            
            let protocols = JSON.parse(value)
            
            let protocolItem = protocols.find((p) => p.id == this.protocolId)
            let protocolIndex = protocols.indexOf(protocolItem)
            
            if (protocolIndex != -1) {
                protocols.splice(protocolIndex, 1)
                Storage.set({ key: "protocols", value: JSON.stringify(protocols) })
                .then(() => {
                    this.$router.replace('/');
                })
            }
        },


        async saveProtocol() {
            const {value} = await Storage.get({key: "protocols"})
            if (value == null) return
            
            
            let protocols = JSON.parse(value)
            
            let protocolItem = protocols.find((p) => p.id == this.protocolId)
            let protocolIndex = protocols.indexOf(protocolItem)
            
            if (protocolIndex != -1) {
                protocols[protocolIndex] = this.protocol
                Storage.set({ key: "protocols", value: JSON.stringify(protocols) })
            }
        },

        isFactorDone(index) {
            return this.protocol.factors.indexOf(index) != -1
        },
        
        onFactorChanged(e, index) {
            // console.log({ e, index, check: e.target.checked })
            if (e.target.checked == true)
            {
                this.protocol.factors.push(index)
            } else {
                this.protocol.factors.splice(this.protocol.factors.indexOf(index), 1)
            }
            this.saveProtocol()
        },

        addBelief() {
            if (this.beliefText == "") return;
            this.protocol.beliefs.push({
                text: this.beliefText,
                done: false,
            })
            this.beliefText = ""
            
            this.saveProtocol()
        },

        deleteBelief(belief) {
            this.protocol.beliefs.splice(this.protocol.beliefs.indexOf(belief), 1)
            this.saveProtocol()
        },

        undoneAllBeliefs() {
            this.protocol.beliefs.forEach((belief) => {
                belief.done = false
            })
        }
    }
    
}
</script>
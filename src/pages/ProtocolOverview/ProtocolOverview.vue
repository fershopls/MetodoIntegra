<template>
    <layout :pageTitle="protocol.name">

        <template v-slot:toolbar-buttons-end>
            <ion-button @click="showPopover">
                <ion-icon slot="icon-only" :icon="ellipsisVertical" />
            </ion-button>
        </template>

        <ion-item>
            <ion-label position="floating">Objetivo:</ion-label>
            <ion-textarea placeholder="¿Cuál es el objetivo?" v-model="protocol.description" auto-grow="true" @ionBlur="save"></ion-textarea>
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


        <ion-button color="light" expand="full" @click="undoneAllBeliefs">
            <ion-icon src="/assets/refresh.svg" />
            Regrabar creencias
        </ion-button>
        

        <!-- Menu popover -->
        <ion-popover
            :is-open="isPopoverOpened"
            css-class="my-custom-class"
            :translucent="true"
            @onDidDismiss="isPopoverOpened = false"
            >
            <Popover v-on:item-clicked="onPopoverItemClicked"></Popover>
        </ion-popover>

        <!-- Export modal -->
        <ion-modal
            :is-open="isExportModalOpened"
            css-class="my-custom-class"
            @onDidDismiss="isExportModalOpened = false"
        >
            <ModalExportText v-on:dimiss="isExportModalOpened = false" :exported-string="exportedText" />
        </ion-modal>

        <!-- Import modal beliefs -->
        <ion-modal
            :is-open="isImportModalOpened"
            css-class="my-custom-class"
            @onDidDismiss="isImportModalOpened = false"
        >
            <ModalBeliefImports v-on:imported="importArrayOfBeliefs" v-on:dimiss="isImportModalOpened = false" />
        </ion-modal>


    </layout>
</template>

<script>
import Layout from "@/pages/ProtocolOverview/Layout.vue"
import Popover from "@/pages/ProtocolOverview/Popover"
import ModalExportText from "@/components/ExportTextModal/Modal"
import ModalBeliefImports from "./ModalBeliefImports/Modal"


import { ellipsisVertical } from "ionicons/icons"


import {
    IonButton,
    IonCheckbox,
    IonList,
    IonItem,
    IonLabel,
    IonInput,
    IonTextarea,
    alertController,
    IonIcon,

    IonModal,
    IonPopover,
} from "@ionic/vue"


export default {
    components: {
        Layout,
        Popover,
        ModalExportText,
        ModalBeliefImports,


        IonButton,
        IonList,
        IonCheckbox,
        IonItem,
        IonLabel,
        IonInput,
        IonTextarea,
        IonIcon,

        IonModal,
        IonPopover,
    },

    mounted() {
        this.$storage.getProtocolById(this.protocolId).then((result) => {
            if (result) {
                this.protocol = result
                if (this.protocol.factors.length > this.factors.length)
                {
                    this.protocol.factors = {}
                }
            }
        })
    },

    unmounted() {
        this.save()
    },

    data() {
        return {
            isPopoverOpened: false,
            
            isImportModalOpened: false,

            isExportModalOpened: false,
            exportedText: "",


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

        showPopover(visible = true) {
            this.isPopoverOpened = visible
        },

        onPopoverItemClicked(itemKey) {
            this.isPopoverOpened = false
            if (itemKey == "export")
                this.showExportModal();
            else if (itemKey == "import")
                this.showImportModal()
            else if (itemKey == "rename")
                this.showRenameAlert();
            else if (itemKey == "delete")
                this.showDeleteAlert();
            else if (itemKey == "developer")
                this.showDeveloperModal()
        },

        async showDeveloperModal() {
            this.exportedText = JSON.stringify(this.protocol, null, 4)
            this.isExportModalOpened = true
        },


        async showExportModal() {
            let protocol = this.protocol
            
            let string = ""
            // Add name
            string += protocol.name + "\n\n"
            // Add description
            if (protocol.description != "")
            {
                string += "=====\n"+protocol.description + "\n=====\n\n"
            }
            // Add beliefs
            protocol.beliefs.forEach((b, i) => {
                string += (i+1) + ". " +b.text+"\n"
            })

            this.exportedText = string
            this.isExportModalOpened = true
        },

        async showImportModal() {
            this.isImportModalOpened = true
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
                                this.save()
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
                                    this.$storage.deleteProtocol(this.protocolId).then(() => {
                                        this.$router.replace('/');
                                    })
                                }
                            },
                        },
                    ],
                });
            return alert.present();
        },

        isFactorDone(index) {
            return Object.prototype.hasOwnProperty.call(this.protocol.factors, index) && this.protocol.factors[index] == 1
        },
        
        onFactorChanged(e, index) {
            if (e.target.checked == true)
            {
                this.protocol.factors[index] = 1
            } else {
                this.protocol.factors[index] = 0
            }
            // console.log(this.protocol.factors)
            this.save()
        },

        async importArrayOfBeliefs(beliefs) {
            beliefs.forEach((belief) => {
                this.beliefText = belief
                this.addBelief()
            })
        },

        async addBeliefByString(beliefString) {
            if (beliefString == "") return;
            this.protocol.beliefs.push({
                text: beliefString,
                done: false,
            })
            this.save()
        },

        async addBelief() {
            if (this.beliefText == "") return;

            this.addBeliefByString(this.beliefText)
            
            this.beliefText = ""
        },

        deleteBelief(belief) {
            this.protocol.beliefs.splice(this.protocol.beliefs.indexOf(belief), 1)
            this.save()
        },

        undoneAllBeliefs() {
            this.protocol.beliefs.forEach((belief) => {
                belief.done = false
            })
        },

        save() {
            this.$storage.saveProtocolById(this.protocolId, this.protocol)
        },
    },


    setup(){
        return {
            ellipsisVertical
        }
    },

}
</script>
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
        
        <!-- Belief form -->
        <ion-item>
            <ion-label position="floating">Escribe tu nueva creencia..</ion-label>
            <ion-input v-model="beliefText" @keyup.enter="onAddBeliefButton"></ion-input>
        </ion-item>
        
        <ion-button color="primary" expand="full" @click="onAddBeliefButton">
            Añadir
        </ion-button>

        <!-- Belief list -->
        <ion-list>
            <ion-item v-for="(belief, index) in protocol.beliefs.slice().reverse()" v-bind:key="index" lines="full">
                <ion-checkbox slot="start" v-model="belief[1]"/>
                <ion-label class="ion-text-wrap">{{ index + 1}}. {{ belief[0] }}</ion-label>
                <!-- Manage button -->
                <ion-button fill="clear" @click="showBeliefPopover(true, $event, belief)">
                    <ion-icon :icon="ellipsisVerticalOutline" />
                </ion-button>
                
            </ion-item>
        </ion-list>
        

        <br>


        <div style="text-align: center;">
            <ion-button color="light" @click="confirmUncheckAllBeliefs">
                <ion-icon src="/assets/refresh.svg" />
                Regrabar creencias
            </ion-button>
        </div>

        <br>
        

        <!-- Belief popover -->
        <ion-popover
            :is-open="isBeliefPopoverOpened"
            :event="beliefPopoverEvent"
            :translucent="true"
            @onDidDismiss="isBeliefPopoverOpened = false"
            >
            <BeliefPopover v-on:item-clicked="onBeliefPopoverItemClicked"></BeliefPopover>
        </ion-popover>

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
import ConfirmAlert from "@/components/ConfirmAlert/ConfirmAlert.js"
import Layout from "@/pages/ProtocolOverview/Layout.vue"
import Popover from "@/pages/ProtocolOverview/Popover"
import BeliefPopover from "./BeliefPopover/BeliefPopover"
import ModalExportText from "@/components/ExportTextModal/Modal"
import ModalBeliefImports from "./ModalBeliefImports/Modal"



import {
    ellipsisVertical,
    ellipsisVerticalOutline,
    trashOutline,
    pencilOutline,
} from "ionicons/icons"


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
        BeliefPopover,


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

    setup(){
        return {
            ellipsisVertical,
            ellipsisVerticalOutline,
            trashOutline,
            pencilOutline,
        }
    },

    async mounted() {
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
            
            isBeliefPopoverOpened: false,
            beliefPopoverEvent: null,
            beliefPopoverSelectedBelief: null,
            
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

        showBeliefPopover(visible = true, event, selectedBelief) {
            this.isBeliefPopoverOpened = visible
            this.beliefPopoverEvent = event
            this.beliefPopoverSelectedBelief = selectedBelief
        },


        onBeliefPopoverItemClicked(itemKey) {
            this.isBeliefPopoverOpened = false
            if (itemKey == "edit")
                this.showEditBeliefAlert(this.beliefPopoverSelectedBelief)
            else if (itemKey == "delete")
                this.confirmDeleteBelief(this.beliefPopoverSelectedBelief)
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
                string += (i+1) + ". " +b[0]+"\n"
            })

            this.exportedText = string
            this.isExportModalOpened = true
        },


        async showImportModal() {
            this.isImportModalOpened = true
        },


        async confirmDeleteBelief(belief) {
            return ConfirmAlert.show({
                header: 'Eliminar creencia?',
                message: 'Esta acción no se puede deshacer.',
                confirmText: 'Eliminar',
                handler: () => this.deleteBelief(belief),
            })
        },

        
        async showEditBeliefAlert(belief) {
            const alert = await alertController.create({
                header: "Cambiar creencia",
                inputs: [
                    { name: "beliefString", value: belief[0] }
                ],
                buttons: [
                    { text: "Cancelar", role:"cancel", cssClass:"secondary" },
                    { text: "Guardar", handler: (alertData) => {
                        this.editBelief(belief, alertData.beliefString)
                    } },
                ]
            })
            return alert.present()
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
            this.save()
        },


        async importArrayOfBeliefs(beliefs) {
            beliefs.forEach((belief) => {
                this.addBeliefByString(belief)
            })
        },


        async addBeliefByString(beliefString) {
            if (beliefString == "") return;
            this.protocol.beliefs.push(
                [beliefString, false]
            )
            this.save()
        },


        async onAddBeliefButton() {
            if (this.beliefText == "") return;

            this.addBeliefByString(this.beliefText)
            
            this.beliefText = ""
        },


        editBelief(belief, newBeliefString) {
            let beliefs = this.protocol.beliefs
            let index = beliefs.indexOf(belief)
            beliefs[index][0] = newBeliefString
            // this.save()
        },


        deleteBelief(belief) {
            this.protocol.beliefs.splice(this.protocol.beliefs.indexOf(belief), 1)
            this.save()
        },


        confirmUncheckAllBeliefs() {
            return ConfirmAlert.show({
                header: 'Regrabar creencias?',
                message: 'Esta acción marcará todas las creencias como no-grabadas, útil a la hora de regrabar creencias.',
                confirmText: 'Proceder',
                handler: this.uncheckAllBeliefs,
            })
        },


        uncheckAllBeliefs() {
            this.protocol.beliefs.forEach((belief) => {
                belief[1] = false
            })
        },


        save() {
            this.$storage.saveProtocolById(this.protocolId, this.protocol)
        },
    },


}
</script>
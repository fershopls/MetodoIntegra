<template>
    <layout :pageTitle="protocol.name" :onSettingClicked="showPopover">

        <ion-item>
            <ion-textarea placeholder="Describe tu objetivo aquí..." v-model="protocol.description" auto-grow="true" @ionBlur="save"></ion-textarea>
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
<!--         
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
        </ion-button> -->


        <!-- <ion-button color="success" expand="full" @click="save">Save</ion-button> -->

        
        <ion-popover
            :is-open="isPopoverOpened"
            css-class="my-custom-class"
            :translucent="true"
            @onDidDismiss="isPopoverOpened = false"
            >
            <Popover v-on:item-clicked="onPopoverItemClicked"></Popover>
        </ion-popover>


    </layout>
</template>

<script>
import Layout from "@/pages/ProtocolOverview/Layout.vue"
import Popover from "@/pages/ProtocolOverview/Popover"

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

    IonPopover
} from "@ionic/vue"


export default {
    components: {
        Layout,
        Popover,


        IonButton,
        IonList,
        IonCheckbox,
        IonItem,
        IonLabel,
        IonInput,
        IonTextarea,
        IonIcon,

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

        onPopoverItemClicked(e, itemKey) {
            this.isPopoverOpened = false
            if (itemKey == "export")
                this.showExportAlert();
            else if (itemKey == "rename")
                this.showRenameAlert();
            else if (itemKey == "delete")
                this.showDeleteAlert();
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

        addBelief() {
            if (this.beliefText == "") return;
            this.protocol.beliefs.push({
                text: this.beliefText,
                done: false,
            })
            this.beliefText = ""
            
            this.save()
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

    
}
</script>
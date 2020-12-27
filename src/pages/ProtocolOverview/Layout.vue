<template>
    <ion-page>
        <ion-header>
            <ion-toolbar color="primary">
                <ion-back-button slot="start" default-href="/"></ion-back-button>
                <ion-title>{{ pageTitle }}</ion-title>
                <ion-buttons slot="end">
                    <ion-button @click="openPopover">
                        <ion-icon slot="icon-only" src="/assets/ellipsis-vertical.svg" />
                    </ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <slot />
        </ion-content>
    </ion-page>
</template>


<script>
import Popover from "./Popover"

import { 
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonBackButton,

    IonButtons,
    IonButton,
    IonIcon,
    popoverController
} from "@ionic/vue";


export default {
    props: ["pageTitle"],
    components: {
        IonPage,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonBackButton,
        

        IonButtons,
        IonButton,
        IonIcon,
    },

    methods: {
        async openPopover(ev) {
            const popover = await popoverController
                .create({
                component: Popover,
                cssClass: 'my-custom-class',
                event: ev,
                translucent: true
                })
            return popover.present();
        },
    }
}
</script>
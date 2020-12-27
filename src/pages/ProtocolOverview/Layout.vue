<template>
    <ion-page>
        <ion-header>
            <ion-toolbar color="primary">
                <ion-back-button slot="start" default-href="/"></ion-back-button>
                <ion-title>{{ pageTitle }}</ion-title>
                <ion-buttons slot="end">
                    <slot name="toolbar-buttons-end"/>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>

        <ion-content>
            <slot />
        </ion-content>
    </ion-page>
</template>


<script>
import { 
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonBackButton,

    IonButtons,
    //IonButton,
    //IonIcon
} from "@ionic/vue";


export default {
    props: ["pageTitle", "onSettingClicked"],
    components: {
        IonPage,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonBackButton,
        

        IonButtons,
        //IonButton,
        //IonIcon,
    },
}
</script>
<template>
    <ion-page>
        <welcome-screen />
        <ion-header>
            <ion-toolbar color="primary">
                <ion-title>{{ pageTitle }}</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content>
            <slot />
        </ion-content>
    </ion-page>
</template>


<script>
import WelcomeScreen from "@/components/WelcomeScreen.vue"

import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
} from "@ionic/vue";


export default {
    props: ["pageTitle"],
    components: {
        WelcomeScreen,


        IonPage,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
    }
}
</script>
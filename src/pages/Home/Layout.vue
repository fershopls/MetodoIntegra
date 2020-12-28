<template>
    <ion-page>
        <welcome-screen ref="welcomeScreen" />
        <Menu menu-id="main" content-id='content'></Menu>
        <ion-header>
            <ion-toolbar color="primary">
                <ion-buttons slot="start">
                    <ion-menu-button menu="main" auto-hide="false"/>
                </ion-buttons>
                <ion-title>{{ pageTitle }}</ion-title>
            </ion-toolbar>
        </ion-header>
        <ion-content id="content">
            <slot />
        </ion-content>
        <slot name="footer" />
    </ion-page>
</template>


<script>
import WelcomeScreen from "@/components/WelcomeScreen.vue"
import Menu from "./Menu"


import {
    IonPage,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonButtons,
    // IonButton,

    IonMenuButton,

} from "@ionic/vue";


export default {
    props: ["pageTitle"],
    components: {
        WelcomeScreen,
        Menu,


        IonPage,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonButtons,
        // IonButton,

        IonMenuButton,
    },

    setup(){
        return {
        }
    },

    methods: {

        showWelcomeScreen() {
            return this.$refs.welcomeScreen.show()
        },


        hideWelcomeScreen() {
            return this.$refs.welcomeScreen.hide()
        },
    },


}
</script>
<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-back-button slot="start" default-href="/"></ion-back-button>
                <ion-title>{{ pageTitle }}</ion-title>
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
    }
}
</script>
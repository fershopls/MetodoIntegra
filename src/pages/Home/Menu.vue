<template>
  <ion-menu side="start" :menu-id="menuId" :content-id="contentId">
    <ion-header>
      <ion-toolbar color="primary">
        <ion-title>Método Integra</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content>
      <ion-list>
        
        <ion-item button @click="$router.replace('/')">
            <ion-label>Mis Protocolos</ion-label>
            <ion-icon :icon="documentTextOutline" slot="end" />
        </ion-item>


        <ion-item button @click="$router.replace('/developer')">
            <ion-label>Opciones de Desarrollador</ion-label>
            <ion-icon :icon="codeOutline" slot="end" />
        </ion-item>

      </ion-list>
    </ion-content>
  </ion-menu>
</template>


<script>
import {
    IonMenu,
    IonHeader,
    IonToolbar,
    IonTitle,
    IonContent,
    IonList,
    IonItem,
    IonIcon,
    IonLabel,
} from "@ionic/vue"


import {
    documentTextOutline,
    codeOutline,
} from "ionicons/icons"


export default {
    components: {
        IonMenu,
        IonHeader,
        IonToolbar,
        IonTitle,
        IonContent,
        IonList,
        IonItem,
        IonIcon,
        IonLabel,

    },


    props: ['menuId', 'contentId'],


    setup() {
        return {
            documentTextOutline,
            codeOutline,
        }
    }
}
</script>
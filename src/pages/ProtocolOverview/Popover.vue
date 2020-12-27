<template>
    <ion-list>
        <ion-list-header>
            <strong>Opciones</strong>
        </ion-list-header>
        <ion-item button @click="$emit('item-clicked', $event, 'export')" >
            <ion-icon :icon="shareOutline" slot="end" />
            Exportar Protocolo</ion-item>
        <ion-item button @click="$emit('item-clicked', $event, 'rename')" >
            <ion-icon :icon="pencilOutline" slot="end" />
            Cambiar Nombre</ion-item>
        <ion-item lines="none" button @click="$emit('item-clicked', $event, 'delete')" >
            <ion-icon :icon="trashOutline" slot="end" />
            Eliminar Protocolo
            </ion-item>
        <!-- <ion-item lines="none" detail="false" button>Cerrar</ion-item> -->
    </ion-list>
</template>


<script>
import {
    IonItem,
    IonListHeader,
    IonList,
    IonIcon,
} from '@ionic/vue';

import {
    shareOutline,
    pencilOutline,
    trashOutline,
} from "ionicons/icons"

export default {
    components: {
        IonItem,
        IonListHeader,
        IonList,
        IonIcon,
    },
    setup(){
        return {
        shareOutline,
        pencilOutline,
        trashOutline,

        }
    },
};
</script>
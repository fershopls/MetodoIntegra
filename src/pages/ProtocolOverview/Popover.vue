<template>
    <ion-list>
        
        <ion-item button @click="$emit('item-clicked', 'export')" >
            <ion-icon :icon="shareOutline" slot="end" />
            Exportar Protocolo</ion-item>
        
        <ion-item button @click="$emit('item-clicked', 'import')" >
            <ion-icon :icon="enterOutline" slot="end" />
            Importar Creencias</ion-item>
        
        <ion-item button @click="$emit('item-clicked', 'rename')" >
            <ion-icon :icon="pencilOutline" slot="end" />
            Cambiar Nombre</ion-item>
        
        <ion-item button @click="$emit('item-clicked', 'developer')" >
            <ion-icon :icon="bugOutline" slot="end" />
            Modo desarrollador</ion-item>
        
        <ion-item lines="none" button @click="$emit('item-clicked', 'delete')" color="danger"    >
            <ion-icon :icon="trashOutline" slot="end" />
            Eliminar Protocolo</ion-item>

        <!-- <ion-item lines="none" detail="false" button>Cerrar</ion-item> -->
    </ion-list>
</template>


<script>
import {
    IonItem,
    // IonListHeader,
    IonList,
    IonIcon,
} from '@ionic/vue';

import {
    shareOutline,
    pencilOutline,
    trashOutline,
    bugOutline,
    enterOutline,
    exitOutline,
} from "ionicons/icons"

export default {
    components: {
        IonItem,
        // IonListHeader,
        IonList,
        IonIcon,
    },
    setup(){
        return {
            shareOutline,
            pencilOutline,
            trashOutline,
            bugOutline,
            enterOutline,
            exitOutline,
        }
    },
};
</script>
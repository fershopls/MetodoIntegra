<template>
    <ion-list>

        <ion-item button @click="$emit('item-clicked', 'edit')" >
            <ion-icon :icon="pencilOutline" slot="end" />
            Editar</ion-item>

        <ion-item button @click="$emit('item-clicked', 'delete')" lines="none">
            <ion-icon :icon="trashOutline" slot="end" />
            Eliminar</ion-item>
        
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
    trashOutline,
    pencilOutline,
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
            pencilOutline,
            trashOutline,
        }
    },
};
</script>
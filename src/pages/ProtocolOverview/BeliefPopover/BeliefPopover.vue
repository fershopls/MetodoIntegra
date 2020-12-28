<template>
    <ion-list>

        <ion-item button @click="$emit('item-clicked', 'export')" >
            <ion-icon :icon="pencilOutline" slot="end" />
            Editar</ion-item>

        <ion-item button @click="$emit('item-clicked', 'export')" lines="none">
            <ion-icon :icon="trashOutline" slot="end" />
            Eliminar</ion-item>
        
        <!-- showEditBeliefAlert(belief) -->
        <!-- confirmDeleteBelief(belief) -->
        
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
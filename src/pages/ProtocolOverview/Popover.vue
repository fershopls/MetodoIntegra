<template>
    <ion-list>
        <ion-list-header>
            <strong>Opciones</strong>
        </ion-list-header>
        <ion-item button>Exportar Protocolo</ion-item>
        <ion-item button>Cambiar Nombre</ion-item>
        <ion-item lines="none" button>Eliminar Protocolo</ion-item>
        <!-- <ion-item lines="none" detail="false" button>Cerrar</ion-item> -->
    </ion-list>
</template>


<script>
import {
    IonItem,
    IonListHeader,
    IonList,
} from '@ionic/vue';

export default {
  components: {
      IonItem,
      IonListHeader,
      IonList
  },
};
</script>
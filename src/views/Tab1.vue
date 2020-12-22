<template>
  <ion-page>
    <ion-header>
      <ion-toolbar>
        <ion-title>Habitaciones</ion-title>
      </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Habitaciones</ion-title>
        </ion-toolbar>
      </ion-header>

      <!-- Item as a Button -->
      <div v-for="room in rooms" v-bind:key="room.id">
      <ion-item button href="/room">
        <ion-label>
          {{ room.name }}
        </ion-label>
      </ion-item>
      </div>

    </ion-content>
  </ion-page>
</template>

<script lang="ts">
import { IonPage, IonHeader, IonToolbar, IonTitle, IonContent } from '@ionic/vue';
//import ExploreContainer from '@/components/ExploreContainer.vue';

export default  {
  name: 'Tab1',
  components: { IonHeader, IonToolbar, IonTitle, IonContent, IonPage },
  data() {
    return {
      buttonClick () {
        console.log("XD")
      },
      rooms : [
        {id:1, name: "Love Laguna"},
        {id:2, name: "Jardin"},
        {id:3, name: "Residencia"},
        {id:4, name: "Family Suite"},
      ]
    }
  }
}
</script>
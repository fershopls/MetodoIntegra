<template>
  <ion-page>
    <ion-header>
        <ion-toolbar>
            <ion-title>Ver habitación</ion-title>
        </ion-toolbar>
    </ion-header>
    <ion-content :fullscreen="true">
      <ion-header collapse="condense">
        <ion-toolbar>
          <ion-title size="large">Habitaciones</ion-title>
        </ion-toolbar>
      </ion-header>

        img

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
import { IonPage } from '@ionic/vue';

export default {
  name: 'Room',
  components: { IonPage },
}
</script>
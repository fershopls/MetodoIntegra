<template>
    
    <h2>data: {{ item }}</h2>

    {{ all_protocols }}

    <ion-input @keyup.enter="save" v-model="item" />

    <ion-button @click="save">Save</ion-button>
    <ion-button @click="load">Load</ion-button>
    <ion-button @click="remove" color="danger">delete</ion-button>


</template>


<script>
import { IonButton, IonInput } from "@ionic/vue"
import { Plugins } from "@capacitor/core";
const { Storage } = Plugins

export default {
    components: {
        IonButton,
        IonInput,
    },
    mounted(){
        this.getItem()
        
        this.$storage.getAllProtocols().then((protocols) => {
            console.log({protocols})
        })
    },
    data() {
        return {
            all_protocols: {},
            item: "",
        }
    },
    methods: {
        async getItem() {
            const { value } = await Storage.get({ key: 'item' });
            console.log('Got item: ', value);
            this.item = value
        },
        save(){
            if (this.item == "") return;
            Storage.set({ key: "item", value: this.item })
        },
        remove() {
            Storage.keys().then((result) => {
                result.keys.forEach(element => {
                    Storage.remove({ key: element })
                });
            })
        },
        load(){
            this.getItem();
        }
    }
}
</script>
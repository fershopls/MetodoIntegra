import {
    alertController
} from "@ionic/vue"


export default {
    
    async show(options) {
        const alert = await alertController
            .create({
                header: options.header,
                message: options.message,
                buttons: [
                    {
                        text: 'Cancelar',
                        role: 'cancel',
                        cssClass: 'secondary',
                    },
                    {
                        text: options.confirmText,
                        handler: options.handler,
                    },
                ],
            });
        return alert.present();
    },


}
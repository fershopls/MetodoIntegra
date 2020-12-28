import {
    alertController
} from "@ionic/vue"


export default {
    
    async show(options) {
        options = Object.assign({
            header: "Por Favor Confirma",
            message: "",
            cancelText: "Cancelar",
            confirmText: "Confirmar",
            handler: () => {},
        }, options)

        const alert = await alertController
            .create({
                header: options.header,
                message: options.message,
                buttons: [
                    {
                        text: options.cancelText,
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
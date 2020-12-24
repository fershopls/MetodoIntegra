import { Plugins } from "@capacitor/core";
const { Storage } = Plugins


export default {
    // eslint-disable-next-line no-unused-vars
    install(Vue, options) {
        Vue.config.globalProperties.$storage =  {
            
            
            async getAllProtocols() {
                const {value} = await Storage.get({key: "protocols"})
                if (value != null) {
                    return JSON.parse(value)
                } else {
                    return []
                }
            },

            
            async loadProtocolById(protocolId){
                const protocols = await this.getAllProtocols()
                
                let protocol = protocols.find((protocol) => protocol.id == protocolId)
                
                return protocol
            },
        }
    }
  };


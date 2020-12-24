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

            
            async getProtocolById(protocolId){
                const protocols = await this.getAllProtocols()
                
                let protocol = protocols.find((protocol) => protocol.id == protocolId)
                
                return protocol
            },


            async create(protocolName) {
                if (this.protocolName == "") return;

                
                let protocols = await this.getAllProtocols()
                protocols.push(this._createProtocolObject(protocolName))

                return this.saveProtocols(protocols)
            },

            saveProtocols(protocolsArray) {
                return Storage.set({
                    key: "protocols",
                    value: JSON.stringify(protocolsArray)
                })
            },
            
            _createProtocolObject(protocolName) {
                return {
                    id: new Date().getTime(),
                    name: protocolName,
                    beliefs: [],
                    description: "",
                    factors: {},
                }
            }
        }
    }
  };


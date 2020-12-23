import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            protocol_list: []
        }
    },
    getters: {
        allProtocols(state) {
            return state.protocol_list
        },
        
        protocolById(state){
            return (protocolId) => {
                return state.protocol_list.find((protocol) => protocol.id === protocolId);
            };
        },
    },
});


export default store;

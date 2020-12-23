import { createStore } from 'vuex';

const store = createStore({
    state() {
        return {
            protocol_list: []
        }
    },
    mutations: {
        createProtocol(state, data) {
        const newProtocol = {
          id: new Date().getTime(),//new Date().toISOString(),
          name: data.name,
          beliefs: [],
        };
  
        state.protocol_list.push(newProtocol);
      }
    },
    actions: {
      createProtocol(context, data) {
        context.commit('createProtocol', data);
      }
    },
    getters: {
        allProtocols(state) {
            return state.protocol_list
        },
        
        
        getProtocolById(state) {
            return (protocolId) => {
                return state.protocol_list.find((protocol) => protocol.id == protocolId);
            };
        },


    },
});


export default store;

import http from "../../http-common";

export default {
  namespaced: true,
  state: {
    loadedBikes: []
  },
  mutations: {
    INIT_BIKES: (state, bikes) => (state.loadedBikes = bikes),
    ADD_BIKE: (state, payload) => {
      state.loadedBikes.push(payload);
    },
    REMOVE_BIKE: (state, bikeId) =>
      (state.loadedBikes = state.loadedBikes.filter(
        bike => bike.bikeId !== bikeId
      ))
  },
  actions: {
    async fetchBikes({ commit }) {
      const response = await http.get("/bikes");
      commit("INIT_BIKES", response.data);
    },
    async createBike({ commit }, payload) {
      const bike = {
        bikeName: payload.bikeName,
        bikeDescription: payload.bikeDescription,
        bikeImageLink: payload.bikeImageLink
      };

      const response = await http.post("/bikes", bike);
      commit("ADD_BIKE", response.data);
    },
    async deleteBike({ commit }, bikeId) {
      await http.delete(`/bikes/${bikeId}`);
      commit("REMOVE_BIKE", bikeId);
    }
  },
  getters: {
    loadedBikes(state) {
      return state.loadedBikes;
    }
  }
};

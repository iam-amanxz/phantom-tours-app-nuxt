import http from "../../http-common";

export default {
  namespaced: true,
  state: {
    loadedRideouts: []
  },
  mutations: {
    INIT_RIDEOUTS: (state, rideouts) => (state.loadedRideouts = rideouts),
    ADD_RIDEOUT: (state, payload) => {
      state.loadedRideouts.push(payload);
    },
    UPDATE_RIDEOUT: (state, payload) => {
      const index = state.loadedRideouts.findIndex(
        rideout => rideout.rideoutId === payload.rideoutId
      );
      if (index !== -1) {
        state.loadedRideouts.splice(index, 1, payload);
      }
    },
    REMOVE_RIDEOUT: (state, rideoutId) =>
      (state.loadedRideouts = state.loadedRideouts.filter(
        rideout => rideout.rideoutId !== rideoutId
      ))
  },

  actions: {
    async fetchRideouts({ commit }) {
      const response = await http.get("/rideouts");
      commit("INIT_RIDEOUTS", response.data);
    },
    async createRideout({ commit }, payload) {
      const rideout = {
        rideoutTitle: payload.rideoutTitle,
        rideoutDescription: payload.rideoutDescription,
        rideoutLocationImageLink: payload.rideoutLocationImageLink,
        rideoutDate: payload.rideoutDate,
        rideoutStartingPoint: payload.rideoutStartingPoint,
        rideoutEndingPoint: payload.rideoutEndingPoint
      };
      const response = await http.post("/rideouts", rideout);
      commit("ADD_RIDEOUT", response.data);
    },
    async updateRideout({ commit }, { rideoutId, payload }) {
      await http.put(`/rideouts/${rideoutId}`, payload);
      commit("UPDATE_RIDEOUT", payload);
    },
    async deleteRideout({ commit }, rideoutId) {
      await http.delete(`/rideouts/${rideoutId}`);
      commit("REMOVE_RIDEOUT", rideoutId);
    }
  },
  getters: {
    loadedRideouts(state) {
      return state.loadedRideouts;
    },
    rideout: state => id => state.loadedRideouts.find(r => r.rideoutId === id)
  }
};

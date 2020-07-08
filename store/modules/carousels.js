import http from "@/http-common";

export default {
  namespaced: true,
  state: {
    loadedCarousels: []
  },
  mutations: {
    INIT_CAROUSELS: (state, carousels) => (state.loadedCarousels = carousels),
    ADD_CAROUSEL: (state, payload) => {
      state.loadedCarousels.push(payload);
    },
    REMOVE_CAROUSEL: (state, carouselId) =>
      (state.loadedCarousels = state.loadedCarousels.filter(
        carousel => carousel.carouselId !== carouselId
      ))
  },
  actions: {
    async fetchCarousels({ commit }) {
      const response = await http.get("carousels");
      commit("INIT_CAROUSELS", response.data);
    },
    async createCarousel({ commit }, payload) {
      const carousel = {
        carouselImageLink: payload.carouselImageLink
      };

      const response = await http.post("carousels", carousel);
      commit("ADD_CAROUSEL", response.data);
    },
    async deleteCarousel({ commit }, carouselId) {
      await http.delete(`carousels/${carouselId}`);
      commit("REMOVE_CAROUSEL", carouselId);
    }
  },
  getters: {
    loadedCarousels(state) {
      return state.loadedCarousels;
    }
  }
};

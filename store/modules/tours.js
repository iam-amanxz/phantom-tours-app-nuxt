import http from "../../http-common";

export default {
  namespaced: true,
  state: {
    loadedTours: []
  },
  mutations: {
    INIT_TOURS: (state, tours) => (state.loadedTours = tours),
    ADD_TOUR: (state, payload) => {
      state.loadedTours.push(payload);
    },
    UPDATE_TOUR: (state, payload) => {
      const index = state.loadedTours.findIndex(
        tour => tour.tourId === payload.tourId
      );
      if (index !== -1) {
        state.loadedTours.splice(index, 1, payload);
      }
    },
    REMOVE_TOUR: (state, tourId) =>
      (state.loadedTours = state.loadedTours.filter(
        tour => tour.tourId !== tourId
      ))
  },
  actions: {
    async fetchTours({ commit }) {
      const response = await http.get("/tours");
      commit("INIT_TOURS", response.data);
    },
    async createTour({ commit }, payload) {
      const tour = {
        tourTitle: payload.tourTitle,
        tourDescription: payload.tourDescription,
        tourLocationImageLink: payload.tourLocationImageLink,
        tourDays: payload.tourDays,
        tourDistance: payload.tourDistance,
        tourPrice: payload.tourPrice,
        tourGroupSize: payload.tourGroupSize,
        tourTerrain: payload.tourTerrain,
        tourStartingPoint: payload.tourStartingPoint,
        tourEndingPoint: payload.tourEndingPoint,
        tourAvailability: payload.tourAvailability,
        tourRouteMapLink: payload.tourRouteMapLink
      };
      const response = await http.post("/tours", tour);
      commit("ADD_TOUR", response.data);
    },
    async updateTour({ commit }, { tourId, payload }) {
      await http.put(`/tours/${tourId}`, payload);
      commit("UPDATE_TOUR", payload);
    },
    async deleteTour({ commit }, tourId) {
      await http.delete(`/tours/${tourId}`);
      commit("REMOVE_TOUR", tourId);
    }
  },
  getters: {
    loadedTours(state) {
      return state.loadedTours;
    },
    tour: state => id => state.loadedTours.find(t => t.tourId === id)
  }
};

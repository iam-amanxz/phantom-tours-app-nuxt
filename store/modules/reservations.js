import http from "../../http-common";

export default {
  namespaced: true,
  state: {
    loadedReservations: []
  },
  mutations: {
    INIT_RESERVATIONS: (state, reservations) =>
      (state.loadedReservations = reservations),
    ADD_RESERVATION: (state, payload) => {
      state.loadedReservations.push(payload);
    },
    REMOVE_RESERVATION: (state, reservationId) =>
      (state.loadedReservations = state.loadedReservations.filter(
        reservation => reservation.reservationId !== reservationId
      ))
  },
  actions: {
    async fetchReservations({ commit }) {
      const response = await http.get("reservations");
      commit("INIT_RESERVATIONS", response.data);
    },
    async createReservation({ commit }, payload) {
      const reservation = {
        reservationType: payload.reservationType,
        userFullName: payload.userFullName,
        userEmail: payload.userEmail,
        userPhone: payload.userPhone
      };
      if (payload.tourId) {
        const tourId = payload.tourId;
        const response = await http.post(
          `tours/${tourId}/reservations`,
          reservation
        );
        commit("ADD_RESERVATION", response.data);
      } else {
        const rideoutId = payload.rideoutId;
        const response = await http.post(
          `rideouts/${rideoutId}/reservations`,
          reservation
        );
        commit("ADD_RESERVATION", response.data);
      }
    },
    async deleteReservation({ commit }, reservationId) {
      await http.delete(`reservations/${reservationId}`);
      commit("REMOVE_RESERVATION", reservationId);
    }
  },
  getters: {
    loadedReservations(state) {
      return state.loadedReservations;
    }
  }
};

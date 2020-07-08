import http from "../../http-common";

export default {
  namespaced: true,
  state: {
    loadedFeedbacks: []
  },
  mutations: {
    INIT_FEEDBACKS: (state, feedbacks) => (state.loadedFeedbacks = feedbacks),
    ADD_FEEDBACK: (state, payload) => {
      state.loadedFeedbacks.push(payload);
    },
    REMOVE_FEEDBACK: (state, feedbackId) =>
      (state.loadedFeedbacks = state.loadedFeedbacks.filter(
        feedback => feedback.feedbackId !== feedbackId
      ))
  },
  actions: {
    async fetchFeedbacks({ commit }) {
      const response = await http.get("/feedbacks");
      commit("INIT_FEEDBACKS", response.data);
    },
    async createFeedback({ commit }, payload) {
      const tourId = payload.tourId;
      const feedback = {
        feedbackStars: payload.feedbackStars,
        feedbackBody: payload.feedbackBody,
        username: payload.username
      };
      const response = await http.post(`/tours/${tourId}/feedbacks`, feedback);
      commit("ADD_FEEDBACK", response.data);
    },
    async deleteFeedback({ commit }, feedbackId) {
      await http.delete(`/feedbacks/${feedbackId}`);
      commit("REMOVE_FEEDBACK", feedbackId);
    }
  },
  getters: {
    loadedFeedbacks(state) {
      return state.loadedFeedbacks;
    }
  }
};

import http from "../../http-common";

export default {
  namespaced: true,
  state: {
    loadedInquiries: []
  },
  mutations: {
    INIT_INQUIRIES: (state, inquiries) => (state.loadedInquiries = inquiries),
    ADD_INQUIRY: (state, payload) => {
      state.loadedInquiries.push(payload);
    },
    REMOVE_INQUIRY: (state, inquiryId) =>
      (state.loadedInquiries = state.loadedInquiries.filter(
        inquiry => inquiry.inquiryId !== inquiryId
      ))
  },
  actions: {
    async fetchInquiries({ commit }) {
      const response = await http.get("/inquiries");
      commit("INIT_INQUIRIES", response.data);
    },
    async createInquiry({ commit }, payload) {
      const inquiry = {
        inquiryTitle: payload.inquiryTitle,
        userFullName: payload.userFullName,
        userEmail: payload.userEmail,
        userPhone: payload.userPhone,
        inquiryBody: payload.inquiryBody
      };

      const response = await http.post("/inquiries", inquiry);
      commit("ADD_INQUIRY", response.data);
    },
    async deleteInquiry({ commit }, inquiryId) {
      await http.delete(`/inquiries/${inquiryId}`);
      commit("REMOVE_INQUIRY", inquiryId);
    }
  },
  getters: {
    loadedInquiries(state) {
      return state.loadedInquiries;
    }
  }
};

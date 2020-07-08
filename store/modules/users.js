import http from "../../http-common";

export default {
  namespaced: true,
  state: {
    loadedUsers: []
  },
  mutations: {
    INIT_USERS: (state, users) => (state.loadedUsers = users),
    ADD_USER: (state, payload) => {
      state.loadedUsers.push(payload);
    },
    UPDATE_USER: (state, payload) => {
      const index = state.loadedUsers.findIndex(
        user => user.userId === payload.userId
      );
      if (index !== -1) {
        state.loadedUsers.splice(index, 1, payload);
      }
    },
    REMOVE_USER: (state, userId) =>
      (state.loadedUsers = state.loadedUsers.filter(user => user.id !== userId))
  },
  actions: {
    async fetchUsers({ commit }) {
      const response = await http.get("/users");
      commit("INIT_USERS", response.data);
    },
    async createUser({ commit }, payload) {
      const user = {
        userName: payload.userName,
        userEmail: payload.userEmail,
        userPassword: payload.userPassword,
        userRole: payload.userRole
      };
      const response = await http.post("/users", user);
      commit("ADD_USER", response.data);
    },
    async updateUser({ commit }, { userId, payload }) {
      await http.put(`/users/${userId}`, payload);
      commit("UPDATE_USER", payload);
    },
    async deleteUser({ commit }, userId) {
      await http.delete(`/users/${userId}`);
      commit("REMOVE_USER", userId);
    }
  },
  getters: {
    loadedUsers(state) {
      return state.loadedUsers;
    }
  }
};

import http from "../../http-common";

export default {
  namespaced: true,
  state: {
    loadedGalleryItems: []
  },
  mutations: {
    INIT_GALLERY_ITEMS: (state, galleryItems) =>
      (state.loadedGalleryItems = galleryItems),
    ADD_GALLERY_ITEM: (state, payload) => {
      state.loadedGalleryItems.push(payload);
    },
    REMOVE_GALLERY_ITEM: (state, galleryItemId) =>
      (state.loadedGalleryItems = state.loadedGalleryItems.filter(
        galleryItem => galleryItem.galleryItemId !== galleryItemId
      ))
  },
  actions: {
    async fetchGalleryItems({ commit }) {
      const response = await http.get("/galleryItems");
      commit("INIT_GALLERY_ITEMS", response.data);
    },
    async createGalleryItem({ commit }, payload) {
      const galleryItem = {
        galleryImageLink: payload.galleryImageLink
      };

      const response = await http.post("/galleryItems", galleryItem);
      commit("ADD_GALLERY_ITEM", response.data);
    },
    async deleteGalleryItem({ commit }, galleryItemId) {
      await http.delete(`/galleryItems/${galleryItemId}`);
      commit("REMOVE_GALLERY_ITEM", galleryItemId);
    }
  },
  getters: {
    loadedGalleryItems(state) {
      return state.loadedGalleryItems;
    }
  }
};

<template>
  <v-app>
    <v-container>
      <div v-if="parsedobj.length > 0">
        <h2 class="display-1 my-2">Gallery</h2>
        <v-divider class="my-5"></v-divider>
        <v-row>
          <v-col
            cols="12"
            sm="6"
            md="4"
            lg="3"
            v-for="galleryItem in galleryItems"
            :key="galleryItem.galleryItemId"
          >
            <v-card outlined class="d-flex">
              <v-img :src="galleryItem.galleryImageLink" aspect-ratio="1" class="grey lighten-2"></v-img>
            </v-card>
          </v-col>
        </v-row>
      </div>
      <div v-else>
        <h2>No Gallery Records Found</h2>
      </div>
    </v-container>
  </v-app>
</template>

<script>
export default {
  asyncData({ store }) {
    store.dispatch("galleryItems/fetchGalleryItems");
  },
  layout: "deafult",
  computed: {
    galleryItems() {
      return this.$store.getters["galleryItems/loadedGalleryItems"];
    },
    parsedobj() {
      return JSON.parse(JSON.stringify(this.galleryItems));
    }
  }
};
</script>
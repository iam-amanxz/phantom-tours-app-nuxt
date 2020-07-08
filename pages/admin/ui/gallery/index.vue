<template>
  <v-container>
    <v-row align="end" class="my-2">
      <h1 class="display-1 font-weight-light">Manage Gallery</h1>
      <v-spacer></v-spacer>
      <v-btn text class="primary" @click="dialog = true">Add Picture</v-btn>
    </v-row>

    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="600px">
        <v-card>
          <v-card-text>
            <v-container>
              <ValidationObserver ref="observer" v-slot="{ invalid }">
                <v-form ref="form" @submit.prevent="onCreateGalleryItem">
                  <v-row>
                    <v-col cols="12" sm="12">
                      <ValidationProvider v-slot="{ errors }" name="Name" rules="required|max:250">
                        <v-text-field v-model="galleryImageLink" label="Image Link" required></v-text-field>
                        <span>
                          <v-alert
                            dismissible
                            :value="errors.length > 0"
                            dense
                            outlined
                            type="warning"
                          >{{ errors[0] }}</v-alert>
                        </span>
                      </ValidationProvider>
                    </v-col>
                    <v-img
                      :src="galleryImageLink"
                      height="150"
                      width="300"
                      alt="Image Preview"
                      v-show="galleryImageLink"
                    ></v-img>
                  </v-row>
                  <v-btn class="primary mt-3" :disabled="invalid" type="submit">Create</v-btn>
                </v-form>
              </ValidationObserver>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>

    <v-row v-if="parsedobj.length > 0">
      <v-col
        cols="12"
        sm="6"
        md="4"
        lg="3"
        v-for="galleryItem in galleryItems"
        :key="galleryItem.galleryItemId"
      >
        <v-hover>
          <template v-slot:default="{ hover }">
            <v-card class="mx-auto" max-width="344">
              <v-img aspect-ratio="1" :src="galleryItem.galleryImageLink"></v-img>
              <v-fade-transition>
                <v-overlay v-if="hover" absolute color="#036358">
                  <v-btn @click="deleteGalleryItem(galleryItem.galleryItemId)">Delete</v-btn>
                </v-overlay>
              </v-fade-transition>
            </v-card>
          </template>
        </v-hover>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";
export default {
  asyncData({ store }) {
    store.dispatch("galleryItems/fetchGalleryItems");
  },
  layout: "admin",
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data: () => ({
    overlay: false,
    dialog: false,
    galleryImageLink: ""
  }),
  methods: {
    onCreateGalleryItem() {
      const imageData = {
        galleryImageLink: this.galleryImageLink
      };
      this.$store.dispatch("galleryItems/createGalleryItem", imageData);
      this.$refs.form.reset();
      this.dialog = false;
    },
    deleteGalleryItem(id) {
      this.$store.dispatch("galleryItems/deleteGalleryItem", id);
    }
  },
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

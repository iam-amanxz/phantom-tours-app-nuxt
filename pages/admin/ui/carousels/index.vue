<template>
  <v-container>
    <v-row align="end" class="my-2">
      <h1 class="display-1 font-weight-light">Manage Carousels</h1>
      <v-spacer></v-spacer>
      <v-btn text class="primary" @click="dialog = true">Add Carousel</v-btn>
    </v-row>

    <v-row justify="center">
      <v-dialog v-model="dialog" max-width="600px">
        <v-card>
          <v-card-text>
            <v-container>
              <ValidationObserver ref="observer" v-slot="{ invalid }">
                <v-form ref="form" @submit.prevent="onCreateCarousel">
                  <v-row>
                    <v-col cols="12" sm="12">
                      <ValidationProvider v-slot="{ errors }" name="Name" rules="required|max:250">
                        <v-text-field v-model="carouselImageLink" label="Image Link" required></v-text-field>
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
                      :src="carouselImageLink"
                      height="150"
                      width="300"
                      alt="Image Preview"
                      v-show="carouselImageLink"
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

    <v-row class="px-5" v-if="parsedobj.length > 0">
      <v-col cols="12" class="px-5" v-for="carousel in carousels" :key="carousel.carouselId">
        <v-hover>
          <template v-slot:default="{ hover }">
            <v-card class="mx-auto">
              <v-img :src="carousel.carouselImageLink" max-height="220"></v-img>
              <v-fade-transition>
                <v-overlay v-if="hover" absolute color="#036358">
                  <v-btn @click="deleteCarousel(carousel.carouselId)">Delete</v-btn>
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
    store.dispatch("carousels/fetchCarousels");
  },
  layout: "admin",
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data: () => ({
    overlay: false,
    dialog: false,
    carouselImageLink: ""
  }),
  methods: {
    onCreateCarousel() {
      const imageData = {
        carouselImageLink: this.carouselImageLink
      };
      this.$store.dispatch("carousels/createCarousel", imageData);
      this.$router.push("/admin/ui/carousels");
      this.$refs.form.reset();
      this.dialog = false;
    },
    deleteCarousel(id) {
      this.$store.dispatch("carousels/deleteCarousel", id);
    }
  },
  computed: {
    carousels() {
      return this.$store.getters["carousels/loadedCarousels"];
    },
    parsedobj() {
      return JSON.parse(JSON.stringify(this.carousels));
    }
  }
};
</script>

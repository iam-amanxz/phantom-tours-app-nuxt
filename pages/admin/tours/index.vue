<template>
  <v-container>
    <v-row align="end" class="my-2">
      <h1 class="display-1 font-weight-light">Manage Tours</h1>
      <v-spacer></v-spacer>
      <v-btn text class="primary" @click="addDialog = true">Add Tour</v-btn>
    </v-row>

    <!-- CREATE TOUR DIALOG FORM -->
    <v-row justify="center">
      <v-dialog v-model="addDialog" persistent max-width="600px">
        <v-card>
          <v-card-title>Create a Tour</v-card-title>
          <v-card-text>
            <v-container>
              <ValidationObserver ref="observer" v-slot="{invalid, reset }">
                <v-form ref="form" @submit.prevent="onCreateTour">
                  <ValidationProvider v-slot="{ errors }" rules="required">
                    <v-text-field v-model="tourTitle" label="Title"></v-text-field>
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

                  <ValidationProvider v-slot="{ errors }" rules="required|max:2500">
                    <v-textarea
                      v-model="tourDescription"
                      name="tourDescription"
                      label="Description"
                      counter="2500"
                    ></v-textarea>
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

                  <ValidationProvider v-slot="{ errors }" rules="required">
                    <v-text-field
                      v-model="tourLocationImageLink"
                      label="Location Image Link"
                      counter="250"
                    ></v-text-field>
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

                  <ValidationProvider v-slot="{ errors }" rules="required">
                    <v-text-field v-model="tourDays" label="Days"></v-text-field>
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

                  <ValidationProvider v-slot="{ errors }" rules="required">
                    <v-text-field v-model="tourDistance" label="Distance"></v-text-field>
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

                  <ValidationProvider v-slot="{ errors }" rules="required|">
                    <v-text-field v-model="tourPrice" label="Price"></v-text-field>
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

                  <ValidationProvider v-slot="{ errors }" rules="required|between:1,12">
                    <v-text-field v-model="tourGroupSize" label="Group Size"></v-text-field>
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

                  <ValidationProvider v-slot="{ errors }" rules="required|alpha_spaces">
                    <v-text-field v-model="tourTerrain" label="Terrain"></v-text-field>
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

                  <ValidationProvider v-slot="{ errors }" rules="required|alpha_spaces">
                    <v-text-field v-model="tourStartingPoint" label="Starting Point"></v-text-field>
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

                  <ValidationProvider v-slot="{ errors }" rules="required|alpha_spaces">
                    <v-text-field v-model="tourEndingPoint" label="Ending Point"></v-text-field>
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

                  <v-switch v-model="tourAvailability" label="Availability" inset></v-switch>

                  <ValidationProvider v-slot="{ errors }" rules="required|max:250">
                    <v-text-field v-model="tourRouteMapLink" label="Route Map Link" counter="250"></v-text-field>
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

                  <v-btn
                    :loading="loading"
                    :disabled="invalid"
                    class="primary mt-3"
                    type="submit"
                  >Create</v-btn>
                  <v-btn class="red mt-3" dark @click="cancelForm">Cancel</v-btn>
                </v-form>
              </ValidationObserver>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>

    <div v-if="parsedobj.length > 0">
      <!-- DISPLAY TOURS -->
      <v-row>
        <v-col cols="12" sm="6" v-for="tour in tours" :key="tour.tourId">
          <v-card>
            <v-img class="white--text align-end" height="200px" :src="tour.tourLocationImageLink">
              <v-card-title>{{tour.tourTitle}}</v-card-title>
            </v-img>

            <v-card-subtitle
              style="height:100px; overflow:hidden;"
              class="pb-0"
            >{{tour.tourDescription}}</v-card-subtitle>

            <v-card-actions>
              <v-spacer></v-spacer>
              <!-- <v-btn color="primary" text @click="editDialog = true">Edit</v-btn> -->
              <v-btn color="primary" text @click="handleEditTourButton(tour)">Edit</v-btn>
              <v-btn color="red" text @click="onDeleteTour(tour.tourId)">Delete</v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <!-- EDIT TOUR FORM -->
      <v-row justify="center">
        <v-dialog v-model="editDialog" persistent max-width="600px">
          <v-card>
            <v-card-title>Edit tour</v-card-title>
            <v-card-text>
              <v-container>
                <ValidationObserver ref="observer" v-slot="{invalid, validate, reset }">
                  <v-form ref="form" @submit.prevent="onUpdateTour(editedTourId)">
                    <ValidationProvider v-slot="{ errors }" rules="required">
                      <v-text-field v-model="editedTourTitle" label="Title" required></v-text-field>
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

                    <ValidationProvider v-slot="{ errors }" rules="required|max:2500">
                      <v-textarea
                        v-model="editedTourDescription"
                        name="tourDescription"
                        label="Description"
                        counter="2500"
                      ></v-textarea>
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

                    <ValidationProvider v-slot="{ errors }" rules="required">
                      <v-text-field
                        v-model="editedTourLocationImageLink"
                        label="Location Image Link"
                        required
                        counter="250"
                      ></v-text-field>
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

                    <ValidationProvider v-slot="{ errors }" rules="required">
                      <v-text-field v-model="editedTourDays" label="Days" required></v-text-field>
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

                    <ValidationProvider v-slot="{ errors }" rules="required">
                      <v-text-field v-model="editedTourDistance" label="Distance" required></v-text-field>
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

                    <ValidationProvider v-slot="{ errors }" rules="required|">
                      <v-text-field v-model="editedTourPrice" label="Price" required></v-text-field>
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

                    <ValidationProvider v-slot="{ errors }" rules="required|between:1,12">
                      <v-text-field v-model="editedTourGroupSize" label="Group Size" required></v-text-field>
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

                    <ValidationProvider v-slot="{ errors }" rules="required|alpha_spaces">
                      <v-text-field v-model="editedTourTerrain" label="Terrain" required></v-text-field>
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

                    <ValidationProvider v-slot="{ errors }" rules="required|alpha_spaces">
                      <v-text-field
                        v-model="editedTourStartingPoint"
                        label="Starting Point"
                        required
                      ></v-text-field>
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

                    <ValidationProvider v-slot="{ errors }" rules="required|alpha_spaces">
                      <v-text-field v-model="editedTourEndingPoint" label="Ending Point" required></v-text-field>
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

                    <v-switch v-model="editedTourAvailability" label="Availability" inset></v-switch>

                    <ValidationProvider v-slot="{ errors }" rules="required|max:250">
                      <v-text-field
                        v-model="editedTourRouteMapLink"
                        label="Route Map Link"
                        required
                        counter="250"
                      ></v-text-field>
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

                    <v-btn
                      :loading="loading"
                      :disabled="invalid"
                      class="primary mt-3"
                      type="submit"
                    >Save</v-btn>
                    <v-btn class="red mt-3" dark @click="cancelForm">Cancel</v-btn>
                  </v-form>
                </ValidationObserver>
              </v-container>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-row>
    </div>
  </v-container>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";

export default {
  asyncData({ store }) {
    store.dispatch("tours/fetchTours");
  },
  name: "adminTour",
  layout: "admin",
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data: () => ({
    loading: false,
    overlay: false,
    addDialog: false,
    editDialog: false,

    tourTitle: "",
    tourDescription: "",
    tourLocationImageLink: "",
    tourDays: "",
    tourDistance: "",
    tourPrice: "",
    tourGroupSize: "",
    tourTerrain: "",
    tourStartingPoint: "",
    tourEndingPoint: "",
    tourAvailability: true,
    tourRouteMapLink: "",

    editedTourId: "",
    editedTourTitle: "",
    editedTourDescription: "",
    editedTourLocationImageLink: "",
    editedTourDays: "",
    editedTourDistance: "",
    editedTourPrice: "",
    editedTourGroupSize: "",
    editedTourTerrain: "",
    editedTourStartingPoint: "",
    editedTourEndingPoint: "",
    editedTourAvailability: "",
    editedTourRouteMapLink: ""
  }),
  methods: {
    cancelForm() {
      this.$refs.form.reset();
      this.$refs.observer.reset();
      this.addDialog = false;
      this.editDialog = false;
    },
    handleEditTourButton(tour) {
      this.editedTourId = tour.tourId;
      this.editedTourTitle = tour.tourTitle;
      this.editedTourDescription = tour.tourDescription;
      this.editedTourLocationImageLink = tour.tourLocationImageLink;
      this.editedTourDays = tour.tourDays;
      this.editedTourDistance = tour.tourDistance;
      this.editedTourPrice = tour.tourPrice;
      this.editedTourGroupSize = tour.tourGroupSize;
      this.editedTourTerrain = tour.tourTerrain;
      this.editedTourStartingPoint = tour.tourStartingPoint;
      this.editedTourEndingPoint = tour.tourEndingPoint;
      this.editedTourAvailability = tour.tourAvailability;
      this.editedTourRouteMapLink = tour.tourRouteMapLink;
      this.editDialog = true;
    },
    onCreateTour() {
      this.loading = true;
      const tourData = {
        tourId: this.tourId,
        tourTitle: this.tourTitle,
        tourDescription: this.tourDescription,
        tourLocationImageLink: this.tourLocationImageLink,
        tourDays: this.tourDays,
        tourDistance: this.tourDistance,
        tourPrice: this.tourPrice,
        tourGroupSize: this.tourGroupSize,
        tourTerrain: this.tourTerrain,
        tourStartingPoint: this.tourStartingPoint,
        tourEndingPoint: this.tourEndingPoint,
        tourAvailability: this.tourAvailability,
        tourRouteMapLink: this.tourRouteMapLink
      };

      this.$store.dispatch("tours/createTour", tourData).then(data => {
        this.$refs.form.reset();
        this.addDialog = false;
        this.loading = false;
      });
    },
    onUpdateTour(tourId) {
      this.loading = true;
      const payload = {
        tourId: this.editedTourId,
        tourTitle: this.editedTourTitle,
        tourDescription: this.editedTourDescription,
        tourLocationImageLink: this.editedTourLocationImageLink,
        tourDays: this.editedTourDays,
        tourDistance: this.editedTourDistance,
        tourPrice: this.editedTourPrice,
        tourGroupSize: this.editedTourGroupSize,
        tourTerrain: this.editedTourTerrain,
        tourStartingPoint: this.editedTourStartingPoint,
        tourEndingPoint: this.editedTourEndingPoint,
        tourAvailability: this.editedTourAvailability,
        tourRouteMapLink: this.editedTourRouteMapLink
      };

      const data = { tourId, payload };
      this.$store.dispatch("tours/updateTour", data).then(data => {
        this.$refs.form.reset();
        this.loading = false;
        this.editDialog = false;
      });
    },
    onDeleteTour(id) {
      this.$store.dispatch("tours/deleteTour", id);
    }
  },
  computed: {
    tours() {
      return this.$store.getters["tours/loadedTours"];
    },
    parsedobj() {
      return JSON.parse(JSON.stringify(this.tours));
    }
  }
};
</script>

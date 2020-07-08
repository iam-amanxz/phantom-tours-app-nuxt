<template>
  <v-app>
    <v-container>
      <h2 class="display-1 my-2">{{ tour.tourTitle }}</h2>
      <v-divider class="my-5"></v-divider>
      <v-row>
        <v-col cols="12" md="3">
          <v-list>
            <v-list-item class="pb-2">
              <div>
                <v-icon x-large color="indigo" class="pr-5">mdi-clock-time-five</v-icon>
              </div>
              <div class="pl-5">
                <v-list-item-title class="body-2">Duration</v-list-item-title>
                <v-list-item-subtitle class="subtitle-1 font-weight-bold">{{ tour.tourDays }} Day(s)</v-list-item-subtitle>
              </div>
            </v-list-item>
            <v-divider class="pb-2"></v-divider>
            <v-list-item class="pb-2">
              <div>
                <v-icon x-large color="indigo" class="pr-5">mdi-camera-timer</v-icon>
              </div>
              <div class="pl-5">
                <v-list-item-title class="body-2">Distance</v-list-item-title>
                <v-list-item-subtitle
                  class="subtitle-1 font-weight-bold"
                >{{ tour.tourDistance }} Kms</v-list-item-subtitle>
              </div>
            </v-list-item>
            <v-divider class="pb-2"></v-divider>
            <v-list-item class="pb-2">
              <div>
                <v-icon x-large color="indigo" class="pr-5">mdi-currency-usd</v-icon>
              </div>
              <div class="pl-5">
                <v-list-item-title class="body-2">Price</v-list-item-title>
                <v-list-item-subtitle class="subtitle-1 font-weight-bold">Rs {{ tour.tourPrice }}</v-list-item-subtitle>
              </div>
            </v-list-item>
            <v-divider class="pb-2"></v-divider>
            <v-list-item class="pb-2">
              <div>
                <v-icon x-large color="indigo" class="pr-5">mdi-account-group</v-icon>
              </div>
              <div class="pl-5">
                <v-list-item-title class="body-2">Group Size</v-list-item-title>
                <v-list-item-subtitle
                  class="subtitle-1 font-weight-bold"
                >{{ tour.tourGroupSize }} People</v-list-item-subtitle>
              </div>
            </v-list-item>
            <v-divider class="pb-2"></v-divider>
            <v-list-item class="pb-2">
              <div>
                <v-icon x-large color="indigo" class="pr-5">mdi-terrain</v-icon>
              </div>
              <div class="pl-5">
                <v-list-item-title class="body-2">Terrain</v-list-item-title>
                <v-list-item-subtitle class="subtitle-1 font-weight-bold">
                  {{
                  tour.tourTerrain
                  }}
                </v-list-item-subtitle>
              </div>
            </v-list-item>
            <v-divider class="pb-2"></v-divider>
            <v-list-item class="pb-2">
              <div>
                <v-icon x-large color="indigo" class="pr-5">mdi-ray-start-arrow</v-icon>
              </div>
              <div class="pl-5">
                <v-list-item-title class="body-2">Starting Point</v-list-item-title>
                <v-list-item-subtitle class="subtitle-1 font-weight-bold">
                  {{
                  tour.tourStartingPoint
                  }}
                </v-list-item-subtitle>
              </div>
            </v-list-item>
            <v-divider class="pb-2"></v-divider>
            <v-list-item class="pb-2">
              <div>
                <v-icon x-large color="indigo" class="pr-5">mdi-ray-end-arrow</v-icon>
              </div>
              <div class="pl-5">
                <v-list-item-title class="body-2">Ending Point</v-list-item-title>
                <v-list-item-subtitle class="subtitle-1 font-weight-bold">
                  {{
                  tour.tourEndingPoint
                  }}
                </v-list-item-subtitle>
              </div>
            </v-list-item>
            <v-divider class="pb-2"></v-divider>
            <v-list-item class="pb-2">
              <div>
                <v-icon x-large color="indigo" class="pr-5">mdi-chat-alert</v-icon>
              </div>
              <div class="pl-5">
                <v-list-item-title class="body-2">Availability</v-list-item-title>
                <v-list-item-subtitle class="subtitle-1 font-weight-bold">
                  {{
                  tour.tourAvailability
                  }}
                </v-list-item-subtitle>
              </div>
            </v-list-item>
          </v-list>
        </v-col>

        <v-col cols="12" md="9">
          <v-img height="350px" :src="tour.tourLocationImageLink"></v-img>
          <p class="pt-3">{{ tour.tourDescription }}</p>
          <v-btn class="primary" block text @click="onClickBook">Book This Tour</v-btn>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-img height="400px" :src="tour.tourRouteMapLink"></v-img>
        </v-col>
      </v-row>

      <!-- FEEDBACK FORM -->
      <div v-if="currentUser">
        <app-feedback-form :tour="tour"></app-feedback-form>
      </div>

      <!-- BOOK DIALOG -->
      <v-row justify="center">
        <v-dialog v-model="bookDialog" persistent max-width="600px">
          <v-card>
            <v-card-title>Book this tour</v-card-title>
            <v-card-text>
              <v-container>
                <v-form lazy-validation ref="form" @submit.prevent="onCreateReservation">
                  <v-text-field v-model="tour.tourTitle" disabled label="Reservation" required></v-text-field>

                  <v-text-field :rules="userFullNameRules" v-model="userFullName" label="Full Name"></v-text-field>

                  <v-text-field :rules="userEmailRules" v-model="userEmail" label="Email"></v-text-field>

                  <v-text-field v-model="userPhone" label="Phone" :rules="userPhoneRules"></v-text-field>

                  <v-btn :loading="loading" class="primary mt-3" type="submit">Submit</v-btn>
                  <v-btn class="red mt-3" dark @click="cancelForm">Cancel</v-btn>
                </v-form>
              </v-container>
            </v-card-text>
          </v-card>
        </v-dialog>
      </v-row>
    </v-container>
  </v-app>
</template>

<script>
import FeedbackForm from "@/components/FeedbackForm";

export default {
  components: {
    appFeedbackForm: FeedbackForm
  },
  data() {
    return {
      loading: false,
      valid: true,
      tourId: 0,
      bookDialog: false,
      reservationName: "",
      userFullName: "",
      userFullNameRules: [v => !!v || "Name is required"],
      userEmail: "",
      userEmailRules: [
        v => !!v || "E-mail is required",
        v => /.+@.+\..+/.test(v) || "E-mail must be valid"
      ],
      userPhone: "",
      userPhoneRules: [v => !!v || "Phone number is required"]
    };
  },
  methods: {
    cancelForm() {
      this.$refs.form.reset();
      this.bookDialog = false;
    },
    onClickBook() {
      if (this.currentUser) {
        this.bookDialog = true;
      } else {
        this.$router.push("/login");
      }
    },
    onCreateReservation() {
      this.loading = true;

      if (this.$refs.form.validate()) {
        const reservation = {
          tourId: this.tour.tourId,
          reservationType: "Tour",
          userFullName: this.userFullName,
          userEmail: this.userEmail,
          userPhone: this.userPhone
        };
        this.$store.dispatch("reservations/createReservation", reservation);
        this.$refs.form.reset();
        this.bookDialog = false;
        this.loading = false;
      } else {
        this.loading = false;
      }
    }
  },
  computed: {
    tour() {
      return this.$store.getters["tours/tour"](parseInt(this.$route.params.id));
    },
    currentUser() {
      return this.$store.state.auth.user;
    }
  }
};
</script>

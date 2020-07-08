<template>
  <v-app>
    <v-container>
      <!-- TOUR COMPONENT -->
      <div v-if="parsedobjTour.length > 0">
        <h2 class="display-1 my-2">Our Tours</h2>
        <p>
          Take a ride with us on some of the less-travelled roads in Southern
          Africa. You'll get to discover and experience some of the continent's
          breath-taking landscapes while challenging your skill and technique on
          different terrain. Our adventure tours cover a large area of Southern
          Africa, stretching from the Eastern Cape, to the border of Namibia.
          Whether you want to go on a shorter adventure tour that covers the
          outskirts of the mystical Garden Route, or a week-long excursion, our
          adventure tours cater for every type of rider and adventurer out there.
          All the adventure tours also offer a wide variety of terrain, making our
          offering as diverse as it is unique.
        </p>
        <v-row>
          <v-col cols="12" md="6" v-for="tour in tours" :key="tour.tourId">
            <v-card outlined>
              <v-img class="white--text align-end" height="200px" :src="tour.tourLocationImageLink"></v-img>
              <v-card-title>{{ tour.tourTitle }}</v-card-title>
              <v-card-subtitle
                style="height:110px; overflow:hidden;"
                class="pb-0"
              >{{ tour.tourDescription }}</v-card-subtitle>

              <v-card-actions>
                <v-chip class color="primary ma-2">{{ tour.tourDays }} Days</v-chip>
                <v-chip class color="primary ma-2">{{ tour.tourDistance }} Kms</v-chip>
                <v-chip class color="primary ma-2">{{ tour.tourPrice }} Rs</v-chip>
                <v-spacer></v-spacer>
                <v-btn color="red" text :to="`/tours/${tour.tourId}`" :tourData="tour">View More</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <v-divider class="my-5"></v-divider>
      </div>
      <div v-else>
        <h2>No Tour Records Found</h2>
        <v-divider class="my-5"></v-divider>
      </div>

      <!-- RIDEOUT COMPONENT -->
      <div v-if="parsedobjRideout.length > 0">
        <h2 class="display-1 my-2">Upcoming Rideouts</h2>
        <p>
          Take a ride with us on some of the less-travelled roads in Southern Africa. You'll get to discover and experience some of the continent's breath-taking landscapes while challenging your skill and technique on different terrain. Our adventure tours cover a large area of Southern Africa, stretching from the Eastern Cape, to the border of Namibia.
          Whether you want to go on a shorter adventure tour that covers the outskirts of the mystical Garden Route, or a week-long excursion, our adventure tours cater for every type of rider and adventurer out there. All the adventure tours also offer a wide variety of terrain, making our offering as diverse as it is unique.
        </p>
        <v-divider class="my-5"></v-divider>
        <v-row>
          <v-col xs="12" md="6" v-for="rideout in rideouts" :key="rideout.rideoutId">
            <v-card outlined height="445px">
              <v-img
                class="white--text align-end"
                height="200px"
                :src="rideout.rideoutLocationImageLink"
              ></v-img>
              <v-card-title>{{rideout.rideoutTitle}}</v-card-title>
              <v-card-subtitle class="pb-0 subtitle-1">
                From:
                <span class="font-weight-bold primary--text">{{rideout.rideoutStartingPoint}}</span> To:
                <span class="font-weight-bold primary--text">{{rideout.rideoutEndingPoint}}</span>
              </v-card-subtitle>
              <v-card-subtitle class="pt-0 subtitle-1">
                Date:
                <span
                  class="font-weight-bold primary--text"
                >{{rideout.rideoutDate.substr(0, 10)}}</span>
              </v-card-subtitle>
              <v-card-subtitle
                class="py-0"
                style="height:75px; overflow:hidden;"
              >{{rideout.rideoutDescription}}</v-card-subtitle>

              <v-card-actions>
                <v-spacer></v-spacer>

                <v-btn
                  color="primary"
                  text
                  @click="onClickBook(rideout.rideoutId)"
                >Book This Rideout</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </div>
      <div v-else>
        <h2>No Rideout Records Found</h2>
      </div>

      <!-- BOOK DIALOG -->
      <v-row justify="center" v-if="parsedobjRideout.length > 0">
        <v-dialog v-model="bookDialog" persistent max-width="600px">
          <v-card>
            <v-card-title>Book this Rideout</v-card-title>
            <v-card-text>
              <v-container>
                <v-form lazy-validation ref="form" @submit.prevent="onCreateReservation">
                  <v-text-field v-model="rideout.rideoutTitle" disabled label="Reservation"></v-text-field>
                  <v-text-field v-model="userFullName" label="Full Name" :rules="userFullNameRules"></v-text-field>
                  <v-text-field v-model="userEmail" label="Email" :rules="userEmailRules"></v-text-field>
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
export default {
  asyncData({ store }) {
    store.dispatch("rideouts/fetchRideouts");
    store.dispatch("tours/fetchTours");
  },
  layout: "deafult",
  data: () => ({
    loading: false,
    valid: true,
    id: 0,
    bookDialog: false,
    rideout: {},
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
  }),
  methods: {
    onClickBook(id) {
      this.rideout = this.$store.getters["rideouts/rideout"](parseInt(id));
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
          rideoutId: this.rideout.rideoutId,
          reservationType: "Rideout",
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
    },
    cancelForm() {
      this.$refs.form.reset();
      this.bookDialog = false;
    }
  },
  computed: {
    tours() {
      return this.$store.getters["tours/loadedTours"];
    },
    parsedobjTour() {
      return JSON.parse(JSON.stringify(this.tours));
    },
    rideouts() {
      return this.$store.getters["rideouts/loadedRideouts"];
    },
    parsedobjRideout() {
      return JSON.parse(JSON.stringify(this.rideouts));
    },
    currentUser() {
      return this.$store.state.auth.user;
    }
  }
};
</script>

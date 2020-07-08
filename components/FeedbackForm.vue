<template>
  <v-row justify="center">
    <v-card outlined width="98%" class="pa-3">
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="headline">Write a feedback</v-list-item-title>
          <ValidationObserver tag="form" name="obs1" ref="obs1" v-slot="{ invalid, reset }">
            <v-form ref="form" @submit.prevent="onCreateFeedback">
              <ValidationProvider rules="required|max:500" v-slot="{ errors }">
                <v-textarea v-model="feedbackBody" auto-grow label="Feedback" counter="500"></v-textarea>
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

              <v-row class="pa-3">
                <v-rating
                  v-model="rating"
                  empty-icon="mdi-heart-outline"
                  full-icon="mdi-heart"
                  hover
                  size="20"
                  dense
                  color="red lighten-3"
                  background-color="grey lighten-1"
                ></v-rating>
                <v-spacer></v-spacer>
                <v-btn
                  :loading="loading"
                  :disabled="invalid"
                  text
                  class="primary--text"
                  type="submit"
                >Submit</v-btn>
              </v-row>
              <v-alert
                class="mt-2"
                dismissible
                :value="successful"
                dense
                outlined
                type="success"
              >Thanx, Feedback Received!</v-alert>
            </v-form>
          </ValidationObserver>
        </v-list-item-content>
      </v-list-item>
    </v-card>
  </v-row>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
export default {
  name: "FeedbackComponent",
  components: {
    ValidationProvider,
    ValidationObserver
  },
  props: ["tour"],
  data: () => ({
    loading: false,
    successful: false,
    rating: 1,
    feedbackBody: ""
  }),
  methods: {
    onCreateFeedback() {
      this.loading = true;
      const feedback = {
        tourId: this.tour.tourId,
        feedbackStars: this.rating,
        feedbackBody: this.feedbackBody,
        username: this.currentUser.username
      };
      this.$store.dispatch("feedbacks/createFeedback", feedback).then(
        data => {
          this.loading = false;
          this.$refs.form.reset();
          this.$refs.form.resetValidation();
        },
        error => {
          this.$refs.form.reset();
          this.$refs.form.resetValidation();
          this.successful = true;
        }
      );
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  }
};
</script>

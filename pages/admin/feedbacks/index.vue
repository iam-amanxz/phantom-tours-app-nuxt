<template>
  <v-container>
    <v-row align="end" class="my-2">
      <h1 class="display-1 font-weight-light">User Feedbacks</h1>
    </v-row>

    <v-row class="px-5" v-if="parsedobj.length > 0">
      <v-col
        class="px-5"
        cols="12"
        sm="12"
        v-for="feedback in feedbacks"
        :key="feedback.feedbackId"
      >
        <v-card class="mx-auto" shaped dark>
          <p class="subtitle-2 pl-5 pt-5">@{{ feedback.username }} - {{ feedback.tour.tourTitle }}</p>
          <v-card-title class="pt-0">
            <v-icon left v-for="star in feedback.feedbackStars" :key="star">mdi-star</v-icon>
            <v-spacer></v-spacer>
            <v-btn icon @click="onDeleteFeedback(feedback.feedbackId)">
              <v-icon>mdi-trash-can</v-icon>
            </v-btn>
          </v-card-title>

          <v-icon class="pl-5" x-large left>mdi-format-quote-open</v-icon>
          <v-card-text class="subtitle-1 pl-5">
            {{
            feedback.feedbackBody
            }}
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  asyncData({ store }) {
    store.dispatch("feedbacks/fetchFeedbacks");
  },
  layout: "admin",

  methods: {
    onDeleteFeedback(id) {
      this.$store.dispatch("feedbacks/deleteFeedback", id);
    }
  },
  computed: {
    feedbacks() {
      return this.$store.getters["feedbacks/loadedFeedbacks"];
    },
    parsedobj() {
      return JSON.parse(JSON.stringify(this.feedbacks));
    }
  }
};
</script>

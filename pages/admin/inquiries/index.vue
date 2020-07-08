<template>
  <v-container>
    <v-row align="end" class="my-2">
      <h1 class="display-1 font-weight-light">User Inquiries</h1>
    </v-row>

    <v-row class="px-5" v-if="parsedobj.length > 0">
      <v-col class="px-5" cols="12" sm="12" v-for="inquiry in inquiries" :key="inquiry.inquiryId">
        <v-card class="mx-auto" outlined dark>
          <v-row class="px-3">
            <v-card-title>{{inquiry.inquiryTitle}}</v-card-title>
            <v-spacer></v-spacer>
            <v-btn icon @click="onDeleteInquiry(inquiry.inquiryId)">
              <v-icon>mdi-trash-can</v-icon>
            </v-btn>
          </v-row>

          <v-card-subtitle>{{inquiry.inquiryBody}}</v-card-subtitle>
          <v-divider></v-divider>
          <v-card-text>
            {{inquiry.userFullName}} |
            Email: {{inquiry.userEmail}} |
            Phone: {{inquiry.userPhone}}
          </v-card-text>
          <!-- <v-card-text class="subtitle-2 pl-5">{{feedback.tour.tourTitle}}</v-card-text>
            <v-icon class="pl-5" x-large left>mdi-format-quote-open</v-icon>
            <v-card-text class="subtitle-1 pl-5">{{feedback.feedbackBody}}</v-card-text>
          <v-card-text class="subtitle-2">{{feedback.userName}}</v-card-text>-->
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
export default {
  asyncData({ store }) {
    store.dispatch("inquiries/fetchInquiries");
  },
  layout: "admin",
  methods: {
    onDeleteInquiry(id) {
      this.$store.dispatch("inquiries/deleteInquiry", id);
    }
  },
  computed: {
    inquiries() {
      return this.$store.getters["inquiries/loadedInquiries"];
    },
    parsedobj() {
      return JSON.parse(JSON.stringify(this.inquiries));
    }
  }
};
</script>

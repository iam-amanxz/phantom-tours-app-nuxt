<template>
  <v-app>
    <v-container>
      <div v-if="parsedobj.length > 0">
        <h2 class="display-1 my-2">Our Bikes</h2>
        <p>
          At Phantom Tours, we strive to bypass tarmac as much as possible and pride ourselves on delivering to you the opportunity to discover remote and unspoiled locations and landscapes across South East Asia.
          Choosing just one bike from the wide range of capable motorcycles available today was no easy task. We talked at length. Each of us had their favourites and several very good reasons why they'd make the perfect adventure motorcycle.
        </p>
        <v-divider class="my-5"></v-divider>

        <v-row>
          <v-col cols="12" v-for="bike in bikes" :key="bike.bikeId">
            <v-card class="d-inline-block mx-auto" outlined width="100%">
              <v-container>
                <v-row justify="space-between">
                  <v-col cols="12" md="5" class="pl-5">
                    <v-img height="200px" width="300px" :src="bike.bikeImageLink"></v-img>
                  </v-col>

                  <v-col cols="12" md="7" class="text-left pl-0">
                    <v-card-title>{{bike.bikeName}}</v-card-title>
                    <v-card-subtitle
                      style="height:auto; overflow:hidden;"
                      class="pb-0"
                    >{{bike.bikeDescription}}</v-card-subtitle>
                  </v-col>
                </v-row>
              </v-container>
            </v-card>
          </v-col>
        </v-row>
      </div>
      <div v-else>
        <h2>No Bike Records Found</h2>
      </div>
    </v-container>
  </v-app>
</template>

<script>
export default {
  asyncData({ store }) {
    store.dispatch("bikes/fetchBikes");
  },
  layout: "deafult",
  computed: {
    bikes() {
      return this.$store.getters["bikes/loadedBikes"];
    },
    parsedobj() {
      return JSON.parse(JSON.stringify(this.bikes));
    }
  }
};
</script>
<template>
  <v-container>
    <v-row align="end" class="my-2">
      <h1 class="display-1 font-weight-light">Manage Bikes</h1>
      <v-spacer></v-spacer>
      <v-btn text class="primary" @click="createDialog=true">Add Bike</v-btn>
    </v-row>

    <!-- DISPLAY BIKES -->
    <v-row v-if="parsedobj.length > 0">
      <v-card class="mx-auto my-3" outlined v-for="bike in bikes" :key="bike.bikeId" width="700px">
        <v-row wrap>
          <v-col cols="12" md="5" class="pl-5">
            <v-list-item-avatar tile image height="200" width="300" color="grey">
              <v-img :src="bike.bikeImageLink"></v-img>
            </v-list-item-avatar>
          </v-col>

          <v-col cols="12" md="7">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="headline mb-4">{{bike.bikeName}}</v-list-item-title>
                <v-card-text
                  style="height:100px; overflow:hidden;"
                  class="grey--text"
                >{{bike.bikeDescription}}</v-card-text>
              </v-list-item-content>
            </v-list-item>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn text class="red--text" @click="deleteBike(bike.bikeId)">DELETE</v-btn>
            </v-card-actions>
          </v-col>
        </v-row>
      </v-card>
    </v-row>

    <!-- CREATE BIKE FORM -->
    <v-row justify="center">
      <v-dialog v-model="createDialog" persistent max-width="600px">
        <v-card>
          <v-card-title>Add Bike</v-card-title>
          <v-card-text>
            <v-container>
              <ValidationObserver ref="observer" v-slot="{ invalid }">
                <v-form ref="form" @submit.prevent="onCreateBike">
                  <ValidationProvider v-slot="{ errors }" name="Name" rules="required">
                    <v-text-field v-model="bikeName" label="Title"></v-text-field>
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

                  <ValidationProvider v-slot="{ errors }" name="Name" rules="required|max:1000">
                    <v-textarea v-model="bikeDescription" label="Description" counter="1000"></v-textarea>
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

                  <ValidationProvider v-slot="{ errors }" name="Name" rules="required|max:250">
                    <v-text-field v-model="bikeImageLink" label="Bike Image Link" counter="250"></v-text-field>
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
  </v-container>
</template>

<script>
import { ValidationObserver, ValidationProvider } from "vee-validate";

export default {
  asyncData({ store }) {
    store.dispatch("bikes/fetchBikes");
  },
  name: "adminBike",
  layout: "admin",
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data() {
    return {
      loading: false,
      createDialog: false,
      bikeName: "",
      bikeDescription: "",
      bikeImageLink: ""
    };
  },
  methods: {
    cancelForm() {
      this.$refs.form.reset();
      this.createDialog = false;
    },
    onCreateBike() {
      const bikeData = {
        bikeName: this.bikeName,
        bikeDescription: this.bikeDescription,
        bikeImageLink: this.bikeImageLink
      };
      this.$store.dispatch("bikes/createBike", bikeData).then(data => {
        this.$router.push("/admin/bikes");
        this.cancelForm();
      });
    },
    deleteBike(id) {
      this.$store.dispatch("bikes/deleteBike", id);
    }
  },
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

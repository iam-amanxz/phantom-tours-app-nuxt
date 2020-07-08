<template>
  <v-container>
    <v-row align="end" class="my-2">
      <h1 class="display-1 font-weight-light">Manage Rideouts</h1>
      <v-spacer></v-spacer>
      <v-btn text class="primary" @click="addDialog = true">Add Rideout</v-btn>
    </v-row>

    <!-- CREATE RIDEOUT DIALOG FORM -->
    <v-row justify="center">
      <v-dialog v-model="addDialog" persistent max-width="600px">
        <v-card>
          <v-card-title>Create a Rideout</v-card-title>
          <v-card-text>
            <v-container>
              <ValidationObserver ref="observer" v-slot="{ invalid }">
                <v-form ref="form" @submit.prevent="onCreateRideout">
                  <ValidationProvider v-slot="{ errors }" rules="required">
                    <v-text-field v-model="rideoutTitle" label="Title"></v-text-field>
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
                      v-model="rideoutDescription"
                      name="rideoutDescription"
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

                  <ValidationProvider v-slot="{ errors }" rules="required|max:250">
                    <v-text-field
                      v-model="rideoutLocationImageLink"
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

                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :return-value.sync="editedRideoutDate"
                    transition="scale-transition"
                    offset-y
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <ValidationProvider v-slot="{ errors }" rules="required">
                        <v-text-field
                          v-model="rideoutDate"
                          label="Rideout Date"
                          prepend-icon="mdi-calendar"
                          readonly
                          v-on="on"
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
                    </template>
                    <v-date-picker v-model="rideoutDate" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                      <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                    </v-date-picker>
                  </v-menu>

                  <ValidationProvider v-slot="{ errors }" rules="required|alpha_spaces">
                    <v-text-field v-model="rideoutStartingPoint" label="Starting Point" required></v-text-field>
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
                    <v-text-field v-model="rideoutEndingPoint" label="Ending Point" required></v-text-field>
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
      <!-- DISPLAY RIDEOUTS -->
      <v-row>
        <div v-if="rideouts.length > 0">
          <v-col cols="12" md="6" v-for="rideout in rideouts" :key="rideout.rideoutId">
            <v-card>
              <v-img
                class="white--text align-end"
                height="200px"
                :src="rideout.rideoutLocationImageLink"
              >
                <v-card-title>{{rideout.tourTitle}}</v-card-title>
              </v-img>

              <v-card-subtitle
                style="height:100px; overflow:hidden;"
                class="pb-0"
              >{{rideout.rideoutDescription}}</v-card-subtitle>

              <v-card-subtitle class="pb-0">{{rideout.rideoutDate.substr(0, 10)}}</v-card-subtitle>

              <v-card-actions>
                <v-spacer></v-spacer>
                <v-btn color="primary" text @click="handleEditRideoutButton(rideout)">Edit</v-btn>
                <v-btn color="red" text @click="onDeleteRideout(rideout.rideoutId)">Delete</v-btn>
              </v-card-actions>
            </v-card>
          </v-col>
        </div>
      </v-row>
      <!-- EDIT RIDEOUT FORM -->
      <v-row justify="center">
        <v-dialog v-model="editDialog" persistent max-width="600px">
          <v-card>
            <v-card-title>Edit Rideout</v-card-title>
            <v-card-text>
              <v-container>
                <ValidationObserver ref="observer" v-slot="{invalid, validate, reset }">
                  <v-form ref="form" @submit.prevent="onUpdateRideout(editedRideoutId)">
                    <ValidationProvider v-slot="{ errors }" rules="required">
                      <v-text-field v-model="editedRideoutTitle" label="Title" required></v-text-field>
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
                        v-model="editedRideoutDescription"
                        name="editedRideoutDescription"
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

                    <ValidationProvider v-slot="{ errors }" rules="required|max:250">
                      <v-text-field
                        v-model="editedRideoutLocationImageLink"
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

                    <v-menu
                      ref="menu"
                      v-model="menu"
                      :close-on-content-click="false"
                      :return-value.sync="editedRideoutDate"
                      transition="scale-transition"
                      offset-y
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <ValidationProvider v-slot="{ errors }" rules="required">
                          <v-text-field
                            v-model="editedRideoutDate"
                            label="Picker in menu"
                            prepend-icon="mdi-calendar"
                            readonly
                            v-on="on"
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
                      </template>
                      <v-date-picker v-model="editedRideoutDate" no-title scrollable>
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                        <v-btn text color="primary" @click="$refs.menu.save(date)">OK</v-btn>
                      </v-date-picker>
                    </v-menu>

                    <ValidationProvider v-slot="{ errors }" rules="required|alpha_spaces">
                      <v-text-field
                        v-model="editedRideoutStartingPoint"
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
                      <v-text-field
                        v-model="editedRideoutEndingPoint"
                        label="Ending Point"
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
    store.dispatch("rideouts/fetchRideouts");
  },
  layout: "admin",
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data: () => ({
    date: new Date().toISOString().substr(0, 10),
    loading: false,
    menu: false,
    overlay: false,
    addDialog: false,
    editDialog: false,
    menu: false,

    rideoutTitle: "",
    rideoutDescription: "",
    rideoutLocationImageLink: "",
    rideoutDate: "",
    rideoutStartingPoint: "",
    rideoutEndingPoint: "",

    editedRideoutId: "",
    editedRideoutTitle: "",
    editedRideoutDescription: "",
    editedRideoutLocationImageLink: "",
    editedRideoutDate: "",
    editedRideoutStartingPoint: "",
    editedRideoutEndingPoint: ""
  }),
  methods: {
    cancelForm() {
      this.$refs.form.reset();
      this.addDialog = false;
      this.editDialog = false;
    },
    handleEditRideoutButton(rideout) {
      this.editedRideoutId = rideout.rideoutId;
      this.editedRideoutTitle = rideout.rideoutTitle;
      this.editedRideoutDescription = rideout.rideoutDescription;
      this.editedRideoutLocationImageLink = rideout.rideoutLocationImageLink;
      this.editedRideoutDate = rideout.rideoutDate.substr(0, 10);
      this.editedRideoutStartingPoint = rideout.rideoutStartingPoint;
      this.editedRideoutEndingPoint = rideout.rideoutEndingPoint;
      this.editDialog = true;
    },
    onCreateRideout() {
      this.loading = true;
      const rideoutData = {
        rideoutId: this.rideoutId,
        rideoutTitle: this.rideoutTitle,
        rideoutDescription: this.rideoutDescription,
        rideoutLocationImageLink: this.rideoutLocationImageLink,
        rideoutDate: this.rideoutDate,
        rideoutStartingPoint: this.rideoutStartingPoint,
        rideoutEndingPoint: this.rideoutEndingPoint
      };

      this.$store.dispatch("rideouts/createRideout", rideoutData).then(data => {
        this.loading = false;
        this.$refs.form.reset();
        this.addDialog = false;
      });
    },
    onUpdateRideout(rideoutId) {
      this.loading = true;
      const payload = {
        rideoutId: this.editedRideoutId,
        rideoutTitle: this.editedRideoutTitle,
        rideoutDescription: this.editedRideoutDescription,
        rideoutLocationImageLink: this.editedRideoutLocationImageLink,
        rideoutDate: this.editedRideoutDate,
        rideoutStartingPoint: this.editedRideoutStartingPoint,
        rideoutEndingPoint: this.editedRideoutEndingPoint
      };

      const data = { rideoutId, payload };
      this.$store.dispatch("rideouts/updateRideout", data).then(data => {
        this.$refs.form.reset();
        this.editDialog = false;
        this.loading = false;
      });
    },
    onDeleteRideout(id) {
      this.$store.dispatch("rideouts/deleteRideout", id);
    }
  },
  computed: {
    rideouts() {
      return this.$store.getters["rideouts/loadedRideouts"];
    },
    parsedobj() {
      return JSON.parse(JSON.stringify(this.rideouts));
    }
  }
};
</script>

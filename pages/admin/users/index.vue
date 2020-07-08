<template>
  <v-container>
    <v-row align="end" class="my-2">
      <h1 class="display-1 font-weight-light">Manage Users</h1>
      <v-spacer></v-spacer>
      <v-btn text class="primary" @click="addDialog = true">Add Admin</v-btn>
    </v-row>

    <v-row justify="center">
      <v-dialog v-model="addDialog" max-width="350px">
        <v-card class="pa-5">
          <div class="text-center">
            <v-card-title class="pa-0 font-weight-bold">Add an Admin</v-card-title>
          </div>
          <v-card-text>
            <v-container>
              <ValidationObserver ref="observer" v-slot="{ invalid, reset }">
                <v-form ref="form" @submit.prevent="handleRegister">
                  <ValidationProvider rules="required|min:3|max:20" v-slot="{ errors }">
                    <v-text-field label="username" v-model="user.username"></v-text-field>
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

                  <ValidationProvider rules="required|email|max:50" v-slot="{ errors }">
                    <v-text-field label="email" v-model="user.email"></v-text-field>
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

                  <ValidationProvider rules="required|min:6|max:40" v-slot="{ errors }">
                    <v-text-field
                      label="password"
                      :type="showPassword ? 'text' : 'password'"
                      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                      @click:append="showPassword = !showPassword"
                      v-model="user.password"
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
                  <v-row>
                    <v-spacer></v-spacer>
                    <v-btn text class="red mr-3" dark @click="cancelForm">Cancel</v-btn>
                    <v-btn :loading="loading" :disabled="invalid" type="submit" class="primary">Save</v-btn>
                  </v-row>
                </v-form>
              </ValidationObserver>
              <v-alert
                class="mt-2"
                dismissible
                :value="success"
                dense
                outlined
                type="success"
              >Resgitstered Successfully</v-alert>
              <v-alert
                class="mt-2"
                dismissible
                :value="error"
                dense
                outlined
                type="error"
              >{{ message.message }}</v-alert>
            </v-container>
          </v-card-text>
        </v-card>
      </v-dialog>
    </v-row>
    <v-text-field
      v-model="search"
      append-icon="mdi-magnify"
      label="Search"
      single-line
      hide-details
      class="mb-2"
    ></v-text-field>
    <v-data-table
      v-if="parsedobj.length > 0"
      :headers="headers"
      :search="search"
      :sort-by="['username']"
      :sort-desc="[false, true]"
      :items="users"
      hide-default-footer
      class="elevation-1"
    >
      <template v-slot:item.username="{ item }">{{ item.username }}</template>
      <template v-slot:item.email="{ item }">{{ item.email }}</template>
      <!-- <template v-slot:item.role="{ item }">{{
          item.roles[0].name
      }}</template>-->
      <template v-slot:item.role="{ item }">
        <v-chip small label :color="getColor(item.roles[0].name)" dark>
          {{
          item.roles[0].name
          }}
        </v-chip>
      </template>
      <template v-slot:item.action="{ item }">
        <div v-if="item.roles[0].name === 'ROLE_ADMIN'">
          <v-btn class="pt-2" icon @click="onClickDelete(item.id)">
            <v-icon class="red--text">mdi-trash-can</v-icon>
          </v-btn>
        </div>
      </template>
    </v-data-table>
    <v-dialog persistent v-model="openConfirmation" max-width="250px">
      <v-card class="text-center py-7">
        <ValidationObserver ref="obs1" v-slot="{ invalid, reset }">
          <ValidationProvider rules="required|is:superadmin" v-slot="{ errors }">
            <v-text-field class="px-5" v-model="secret" label="Secret Key"></v-text-field>
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

          <v-card-text class="title">Are you sure?</v-card-text>
          <v-btn :disabled="invalid" text @click="onDeleteAdmin" class="red--text">YES</v-btn>
          <v-btn text @click="onSayNo" class="red--text">NO</v-btn>
        </ValidationObserver>
      </v-card>
    </v-dialog>
  </v-container>
</template>

<script>
import { ValidationProvider, ValidationObserver } from "vee-validate";
import User from "@/models/user";

export default {
  asyncData({ store }) {
    store.dispatch("users/fetchUsers");
  },
  layout: "admin",
  components: { ValidationProvider, ValidationObserver },
  data() {
    return {
      openConfirmation: false,
      showPassword: false,
      loading: false,
      user: new User("", "", "", "admin"),
      success: false,
      error: false,
      successful: false,
      message: "",
      addDialog: false,
      id: "",
      secret: "",

      search: "",

      headers: [
        {
          text: "Username",
          align: "start",
          value: "username"
        },
        { text: "Email", value: "email", sortable: false },
        { text: "Role", value: "role", sortable: false },
        { value: "action" }
      ]
    };
  },
  methods: {
    onSayNo() {
      this.openConfirmation = false;
      this.$refs.obs1.reset();
    },
    cancelForm() {
      this.addDialog = false;
      this.$refs.form.reset();
      this.$refs.observer.reset();
    },
    getColor(role) {
      if (role === "ROLE_ADMIN") return "orange";
      else return "grey darken-1";
    },
    handleRegister() {
      this.loading = true;

      this.$store.dispatch("auth/register", this.user).then(
        data => {
          this.loading = false;
          this.message = data.message;
          this.error = false;
          this.success = true;
          this.cancelForm();
        },
        error => {
          this.loading = false;
          this.message =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
          this.successful = false;
          this.success = false;
          this.error = true;
        }
      );
    },
    onClickDelete(id) {
      this.openConfirmation = true;
      this.id = id;
    },
    onDeleteAdmin() {
      this.$store.dispatch("users/deleteUser", parseInt(this.id));

      this.openConfirmation = false;

      if (this.currentUser.id == this.id) {
        this.$store.dispatch("auth/logout");
        this.$router.push("/login");
      }
    }
  },
  computed: {
    users() {
      return this.$store.getters["users/loadedUsers"];
    },
    parsedobj() {
      return JSON.parse(JSON.stringify(this.users));
    },
    currentUser() {
      return this.$store.state.auth.user;
    }
  }
};
</script>

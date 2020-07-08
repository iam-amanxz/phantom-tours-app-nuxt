<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="6" md="5">
        <v-card class="py-5 px-10 ma-10">
          <div class="text-center">
            <v-card-title class="pa-0 font-weight-bold">Sign In</v-card-title>
          </div>

          <v-img
            id="profile-img"
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            class="profile-img-card"
          />
          <!-- Form -->
          <ValidationObserver ref="observer" v-slot="{ invalid }">
            <v-form ref="form" @submit.prevent="handleLogin">
              <ValidationProvider rules="required" v-slot="{ errors }">
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

              <ValidationProvider rules="required" v-slot="{ errors }">
                <v-text-field
                  label="password"
                  v-model="user.password"
                  :type="showPassword ? 'text' : 'password'"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword = !showPassword"
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
                <v-btn
                  :loading="loading"
                  :disabled="invalid"
                  type="submit"
                  block
                  class="primary"
                >Login</v-btn>
              </ValidationProvider>

              <v-alert
                class="mt-2"
                dismissible
                :value="submitted"
                dense
                outlined
                type="error"
              >{{ message.message }}</v-alert>
              <v-card-text>
                Don't have and account?
                <span
                  style="cursor:pointer"
                  class="primary--text"
                  @click="$router.push('/register')"
                >Register</span>
              </v-card-text>
            </v-form>
          </ValidationObserver>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import User from "@/models/user";

import { ValidationObserver, ValidationProvider } from "vee-validate";

export default {
  name: "Login",
  asnycData({ router }) {
    if (this.loggedIn) {
      router.push("/");
    }
  },
  components: {
    ValidationObserver,
    ValidationProvider
  },
  data() {
    return {
      showPassword: false,
      submitted: false,
      loading: false,
      message: "",
      user: new User("", "")
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  methods: {
    handleLogin() {
      this.loading = true;
      if (this.user.username && this.user.password) {
        this.$store.dispatch("auth/login", this.user).then(
          () => {
            this.$router.push("/");
          },
          error => {
            this.loading = false;
            this.message =
              (error.response && error.response.data) ||
              error.message ||
              error.toString();
            this.submitted = true;
          }
        );
      }
    }
  }
};
</script>

<style scoped>
.profile-img-card {
  width: 96px;
  height: 96px;
  margin: 0 auto 10px;
  display: block;
  -moz-border-radius: 50%;
  -webkit-border-radius: 50%;
  border-radius: 50%;
}
</style>

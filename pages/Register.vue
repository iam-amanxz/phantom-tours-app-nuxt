<template>
  <v-container>
    <v-row justify="center">
      <v-col cols="12" sm="6" md="5">
        <v-card class="py-5 px-10 ma-10">
          <div class="text-center">
            <v-card-title class="pa-0 font-weight-bold">Sign Up</v-card-title>
          </div>

          <v-img
            id="profile-img"
            src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
            class="profile-img-card"
          />

          <ValidationObserver ref="observer" v-slot="{ invalid }">
            <v-form ref="form" @submit.prevent="handleRegister">
              <div v-if="!successful">
                <div>
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
                </div>

                <div>
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
                </div>

                <div>
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
                </div>
              </div>
              <v-btn
                :loading="loading"
                :disabled="invalid"
                type="submit"
                block
                class="primary"
              >Sign up</v-btn>
              <v-card-text>
                Already have an account?
                <span
                  style="cursor:pointer"
                  class="primary--text"
                  @click="$router.push('/login')"
                >Sign in</span>
              </v-card-text>
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
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import User from "../models/user";
import { ValidationProvider, ValidationObserver } from "vee-validate";

export default {
  name: "Register",
  mounted() {
    if (this.loggedIn) {
      this.$router.push("/profile");
    }
  },
  components: { ValidationProvider, ValidationObserver },
  data() {
    return {
      loading: false,
      showPassword: false,
      user: new User("", "", "", null),
      success: false,
      error: false,
      successful: false,
      message: ""
    };
  },
  computed: {
    loggedIn() {
      return this.$store.state.auth.status.loggedIn;
    }
  },
  methods: {
    handleRegister() {
      this.loading = true;

      this.$store.dispatch("auth/register", this.user).then(
        data => {
          this.loading = false;
          this.message = data.message;
          this.successful = true;
          this.error = false;
          this.success = true;
          this.$refs.form.reset();
          this.$refs.form.resetValidation();
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

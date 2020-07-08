<template>
  <v-app>
    <v-container>
      <h2 class="display-1 my-2">Contact Us</h2>
      <p>
        If you have a question or comment, or would like to book a custom tour
        or a training day, please call us or complete our contact form, below.
      </p>
      <v-divider class="my-5"></v-divider>

      <v-row>
        <!-- CONTACT FORM -->
        <v-col sm="12" md="6">
          <ValidationObserver ref="observer" v-slot="{ invalid, reset }">
            <v-form ref="form" @submit.prevent="onFormSubmit">
              <ValidationProvider rules="required|alpha_spaces" v-slot="{ errors }">
                <v-text-field v-model="userFullName" label="Full Name"></v-text-field>
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

              <ValidationProvider rules="required|email" v-slot="{ errors }">
                <v-text-field v-model="userEmail" label="Email"></v-text-field>
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

              <ValidationProvider rules="required|digits:10" v-slot="{ errors }">
                <v-text-field v-model="userPhone" label="Phone" required></v-text-field>
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

              <ValidationProvider rules="required|max:250" v-slot="{ errors }">
                <v-text-field v-model="inquiryTitle" label="Subject" counter="250" required></v-text-field>
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

              <ValidationProvider rules="required|max:1000" v-slot="{ errors }">
                <v-textarea counter="1000" v-model="inquiryBody" label="Message" required></v-textarea>
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
                :disabled="invalid"
                :loading="loading"
                text
                dark
                block
                class="primary mt-2"
                type="submit"
              >Submit</v-btn>
              <v-alert
                class="mt-2"
                dismissible
                :value="message.length > 0"
                dense
                outlined
                type="success"
              >{{ message }}</v-alert>
            </v-form>
          </ValidationObserver>
        </v-col>

        <!-- ADDRESS SECTION -->
        <v-col sm="12" md="6">
          <v-card class="mx-auto" max-width="400" outlined>
            <v-img
              class="white--text align-end"
              height="200px"
              src="https://i.imgur.com/A4Wlj5G.jpg"
            ></v-img>

            <v-card-text class="text--primary headline pb-0">
              Call us
              <div class="subtitle-2">
                <p>Husnul Aman: ☎ +94 (0)11 212 2121</p>
                <p>Jareer Zeenam: ☎ +94 (0)11 621 3214</p>
              </div>
            </v-card-text>

            <v-card-text class="text--primary headline pt-0">
              Physical address
              <div class="subtitle-2">Phantom Tours (Pvt) LTD, Phantom Avanue, Colombo 06, Sri Lanka</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
      <v-divider class="my-5"></v-divider>

      <!-- FAQ SECTION -->
      <h2 class="display-1 my-5">Frequently Asked Qustions</h2>
      <v-divider class="my-5"></v-divider>

      <v-expansion-panels>
        <v-expansion-panel v-for="faq in faqs" :key="faq.question">
          <v-expansion-panel-header>
            <h2 class="headline mb-2 red--text text--accent-3">{{ faq.question }}</h2>
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <p class="subtitle-2 pl-5">{{ faq.answer }}</p>
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </v-container>
  </v-app>
</template>

<script>
import { ValidationProvider } from "vee-validate";
import { ValidationObserver } from "vee-validate";

export default {
  layout: "deafult",
  components: {
    ValidationProvider,
    ValidationObserver
  },
  data: () => ({
    loading: false,
    message: "",
    userFullName: "",
    userEmail: "",
    userPhone: "",
    inquiryTitle: "",
    inquiryBody: "",

    faqs: [
      {
        question: "How to book tours?",
        answer:
          "You must register to our site first in order to book tours. Once you register, select a tour or rideout and hit the 'Book this Tour' button. Provide the required deatils and we will get back to you within 24 hours"
      },
      {
        question: "What are the legal requirements for tour participation?",
        answer:
          "You must have a valid driving license and must be over 18 years old. If you have any special medical conditions we need to be notified in prior "
      },
      {
        question: "Can I arrange a custom tour?",
        answer:
          "If you have more than 6 riders, shoot an inquiry with tour derails. If your tour location and preferences match our criteria we will get back to you"
      }
    ]
  }),
  methods: {
    onFormSubmit() {
      this.loading = true;

      const inquiry = {
        inquiryTitle: this.inquiryTitle,
        userFullName: this.userFullName,
        userEmail: this.userEmail,
        userPhone: this.userPhone,
        inquiryBody: this.inquiryBody
      };

      this.$store.dispatch("inquiries/createInquiry", inquiry).then(
        () => {
          this.loading = false;
          this.$refs.form.reset();
          this.$refs.form.resetValidation();
          this.message = "Success";
        },
        error => {
          this.loading = false;
          this.message =
            (error.response && error.response.data) ||
            error.message ||
            error.toString();
        }
      );
    }
  }
};
</script>

<template>
  <v-app id="admin">
    <!-- SIDE NAV -->
    <v-navigation-drawer
      class="grey lighten-3"
      v-model="drawer"
      :clipped="$vuetify.breakpoint.lgAndUp"
      app
    >
      <v-list dense>
        <template v-for="item in items">
          <v-row v-if="item.heading" :key="item.heading" align="left"></v-row>

          <!-- MANAGE UI ITEMS -->
          <v-list-group
            v-else-if="item.children"
            :key="item.text"
            v-model="item.model"
            :prepend-icon="item.model ? item.icon : item['icon-alt']"
            append-icon
            class="black--text"
          >
            <template v-slot:activator>
              <v-list-item-content>
                <v-list-item-title>{{ item.text }}</v-list-item-title>
              </v-list-item-content>
            </template>
            <v-list-item v-for="(child, i) in item.children" :key="i" link :to="child.to" router>
              <v-list-item-action v-if="child.icon">
                <v-icon>{{ child.icon }}</v-icon>
              </v-list-item-action>
              <v-list-item-content>
                <v-list-item-title>{{ child.text }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list-group>
          <!-- ABOVE ITEMS -->
          <v-list-item v-else :key="item.text" link :to="item.to" router>
            <v-list-item-action>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-action>
            <v-list-item-content>
              <v-list-item-title>{{ item.text }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </template>
      </v-list>
    </v-navigation-drawer>

    <!-- NAV BAR -->
    <v-app-bar :clipped-left="$vuetify.breakpoint.lgAndUp" app color="grey darken-4 px-10" dark>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title style="width: 300px" class="ml-0 pl-4">
        <span class="hidden-sm-and-down">Admin Dashboard</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <div class="font-weight-regualar grey--text">
        Logged in as
        <span class="font-weight-bold white--text">{{ currentUser.username }}</span>
      </div>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" @click.prevent="logOut">
            <v-icon>mdi-logout-variant</v-icon>
          </v-btn>
        </template>
        <span>Logout</span>
      </v-tooltip>
      <v-tooltip bottom>
        <template v-slot:activator="{ on }">
          <v-btn icon v-on="on" @click="$router.push('/')">
            <v-icon>mdi-home</v-icon>
          </v-btn>
        </template>
        <span>Home</span>
      </v-tooltip>
    </v-app-bar>

    <!-- PAGE CONTENTS -->
    <v-content>
      <v-container class="px-10">
        <nuxt class="px-10" />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  props: {
    source: String
  },
  data: () => ({
    drawer: null,
    items: [
      { icon: "mdi-account-group", text: "Users", to: "/admin/users" },
      { icon: "mdi-airport", text: "Tours", to: "/admin/tours" },
      { icon: "mdi-airport", text: "Rideouts", to: "/admin/rideouts" },
      { icon: "mdi-motorbike", text: "Bikes", to: "/admin/bikes" },
      {
        icon: "mdi-laptop-chromebook",
        text: "Reservations",
        to: "/admin/reservations"
      },
      {
        icon: "mdi-cloud-question",
        text: "Inquiries",
        to: "/admin/inquiries"
      },
      { icon: "mdi-comment-quote", text: "Feedbacks", to: "/admin/feedbacks" },
      {
        icon: "mdi-chevron-up",
        "icon-alt": "mdi-chevron-down",
        text: "Manage UI",
        model: true,
        children: [
          {
            icon: "mdi-image",
            text: "Manage Gallery",
            to: "/admin/ui/gallery"
          },
          {
            icon: "mdi-folder-multiple-image",
            text: "Manage Carousel",
            to: "/admin/ui/carousels"
          }
        ]
      }
    ]
  }),
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    }
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    }
  }
};
</script>

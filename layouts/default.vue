<template>
  <v-app dark>
    <v-navigation-drawer v-model="drawer" fixed app temporary>
      <v-list>
        <v-list-item v-for="(item, i) in items" :key="i" :to="item.to" router exact>
          <v-list-item-action>
            <v-icon>{{ item.icon }}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title v-text="item.title" />
          </v-list-item-content>
        </v-list-item>
        <v-list-item>
          <v-list-item-action>
            <v-icon>mdi-account-tie</v-icon>
          </v-list-item-action>

          <v-list-item-content>
            <router-link style="cursor:pointer" to="/admin/users">Administrator</router-link>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      :clipped-left="clipped"
      fixed
      height="90"
      app
      flat
      dark
      hide-on-scroll
      class="pink accent-3 px-10"
    >
      <div></div>
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" class="hidden-sm-and-up" />

      <router-link to="/" tag="span" exact style="cursor:pointer">
        <v-toolbar-title
          class="font-weight-regular title white--text hidden-xs-only"
          link
          to="/"
          router
          style="cursor:pointer"
        >
          PHANTOM
          <span class="font-weight-bold title white--text">TOURS</span>
        </v-toolbar-title>
      </router-link>

      <v-spacer />

      <v-list class="transparent" dense flat dark>
        <v-list-item>
          <v-spacer></v-spacer>
          <v-icon left>mdi-phone-classic</v-icon>
          <span class="body-2">+94 (76) 797 1071</span>
          <div v-if="!currentUser" class="navbar-nav ml-auto">
            <v-btn small text to="/register" router exact>Sign Up</v-btn>
            <v-btn small text to="/login" router exact>Login</v-btn>
          </div>

          <div v-if="currentUser">
            <div>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on" @click="openProfile = true">
                    <v-icon>mdi-account-settings</v-icon>
                  </v-btn>
                </template>
                <span>Profile</span>
              </v-tooltip>
              <v-tooltip bottom>
                <template v-slot:activator="{ on }">
                  <v-btn icon v-on="on" to="/register">
                    <v-icon @click.prevent="logOut">mdi-logout</v-icon>
                  </v-btn>
                </template>
                <span>Logout</span>
              </v-tooltip>
            </div>
          </div>
        </v-list-item>

        <v-list-item class="hidden-xs-only">
          <v-btn
            text
            v-for="(item, i) in items"
            :key="i"
            :to="item.to"
            router
            exact
          >{{ item.title }}</v-btn>
          <div v-if="showAdminBoard">
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn icon v-on="on" to="/admin/users">
                  <v-icon>mdi-account-tie</v-icon>
                </v-btn>
              </template>
              <span>Administrator</span>
            </v-tooltip>
          </div>
        </v-list-item>
      </v-list>
    </v-app-bar>

    <v-row justify="center">
      <v-dialog v-if="currentUser" v-model="openProfile" max-width="350px">
        <v-card class="text-center py-7">
          <v-card-text class="title">Hi, {{ currentUser.username }}</v-card-text>
          <v-card-text>{{ currentUser.email }}</v-card-text>
          <v-btn text @click="openConfirmation = true" class="red--text">DELETE ACCOUNT</v-btn>
        </v-card>
      </v-dialog>
    </v-row>

    <v-row justify="center">
      <v-dialog v-model="openConfirmation" max-width="250px">
        <v-card class="text-center py-7">
          <v-card-text class="title">Are you sure?</v-card-text>
          <v-btn text @click="onDeleteUser(currentUser.id)" class="red--text">YES</v-btn>
          <v-btn text @click="onSayNo" class="red--text">NO</v-btn>
        </v-card>
      </v-dialog>
    </v-row>

    <v-content>
      <v-container>
        <nuxt />
      </v-container>
    </v-content>
    <v-footer dark padless class="blue darken-2">
      <v-row justify="center">
        <v-card flat tile class="blue darken-2 white--text text-center">
          <v-card-text>
            <v-btn v-for="icon in icons" :key="icon" class="mx-4 white--text" icon>
              <v-icon size="24px">{{ icon }}</v-icon>
            </v-btn>
          </v-card-text>
          <v-divider></v-divider>
          <v-card-text class="white--text">
            {{ new Date().getFullYear() }} —
            <strong>SSDGROUPC</strong>
          </v-card-text>
        </v-card>
      </v-row>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      openConfirmation: false,
      openProfile: false,
      clipped: false,
      drawer: false,
      items: [
        {
          title: "Home",
          to: "/"
        },
        {
          title: "Tours",
          to: "/tours"
        },
        {
          title: "Bikes",
          to: "/bikes"
        },
        {
          title: "Gallery",
          to: "/gallery"
        },
        {
          title: "About",
          to: "/aboutUs"
        },
        {
          title: "Contact Us",
          to: "/contactUs"
        }
      ],
      icons: ["mdi-facebook", "mdi-twitter", "mdi-linkedin", "mdi-instagram"],
      miniVariant: false,
      right: true,
      rightDrawer: false
    };
  },
  computed: {
    currentUser() {
      return this.$store.state.auth.user;
    },
    showAdminBoard() {
      if (this.currentUser && this.currentUser.roles) {
        return this.currentUser.roles.includes("ROLE_ADMIN");
      }
      return false;
    }
  },
  methods: {
    logOut() {
      this.$store.dispatch("auth/logout");
      this.$router.push("/login");
    },
    onDeleteUser(id) {
      this.$store.dispatch("users/deleteUser", id);
      openProfile = false;
      this.openConfirmation = false;
      this.logOut();
    },
    onSayNo() {
      this.openConfirmation = false;
      this.openProfile = false;
    }
  }
};
</script>

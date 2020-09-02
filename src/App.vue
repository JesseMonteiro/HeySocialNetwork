<template>
  <div id="app">
    <v-app>
      <v-main>
        <v-app-bar fixed>
          <div class="welcome">
            <router-link to="/welcome">
              <v-btn label="welcome">
                <v-icon>mdi-home-variant-outline </v-icon>
              </v-btn>
            </router-link>
          </div>
          <div class="feed">
            <div v-if="getUserLog">
            <router-link to="/feed">
           
              <v-btn label="feed">
                <v-icon>mdi-chart-timeline</v-icon>
              </v-btn>
            </router-link>
             </div>
          </div>

          <div class="acount">
             <div v-if="getUserLog">
            <router-link to="/profile">
              <v-btn label="profile">
                <v-icon>mdi-account</v-icon>
              </v-btn>
            </router-link>
            </div>
          </div>

          <div class="enterAcount">
             <div v-if="!getUserLog">
            <router-link to="/login">
              <v-btn label="loguin">
                <v-icon>mdi-account-key</v-icon>
              </v-btn>
            </router-link>
            </div>
            <div v-else>
              <router-link to="/login">
              <v-btn label="logout" @click="logout()">
                <v-icon>mdi-logout-variant</v-icon>
              </v-btn>
            </router-link>
            </div>
          </div>

          <div class="btn-dark">
            <v-btn label="DarkMode" @click="toggleDarkTheme()">
              <v-icon>mdi-brightness-6</v-icon>
            </v-btn>
          </div>
          <div class="clean-page">
            <ClearPage @clearAll="clearPage($event)" />
          </div>
        </v-app-bar>
        <router-view />
      </v-main>
    </v-app>
  </div>
</template>

<script>
import ClearPage from "./components/ClearPage.vue";
import { mapGetters } from "vuex";

// import Feed from "./Feed.vue";
export default {
  name: "App",
  created() {
    console.log(this.$firebase);
  },
  components: {
    ClearPage,
  },
  data: () => ({}),
  methods: {
    toggleDarkTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem("dark_theme", this.$vuetify.theme.dark.toString());
    },
    clearPage() {
      this.$store.dispatch("posts/clearPosts");
    },
    openFeed() {
      this.$router.push("/feed").catch((err) => {
        throw new Error(`Problem handling something: ${err}.`);
      });
    },
    logout(){
       this.$store.dispatch("users/logout")
    }
  },
  mounted() {
    const theme = localStorage.getItem("dark_theme");
    if (theme) {
      if (theme == "true") {
        this.$vuetify.theme.dark = true;
      } else {
        this.$vuetify.theme.dark = false;
      }
    }
  },
  computed: {
    ...mapGetters("users", ["getUserLog"]),
  },
};
</script>

<style scoped>
.avatar {
  vertical-align: middle;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}
.icon-post {
  position: absolute;
  right: 20px;
  top: 2px;
}
.clean-page {
  position: absolute;
  right: 20px;
  top: 2px;
}
.acount {
  position: absolute;
  left: 300px;
  top: 15px;
}

.enterAcount {
  position: absolute;
  right: 160px;
  top: 12px;
}

.btn-dark {
  position: absolute;
  right: 80px;
  top: 12px;
}
.welcome {
  position: absolute;
  left: 100px;
  top: 15px;
}
.feed {
  position: absolute;
  left: 200px;
  top: 15px;
}

.actionButton {
  position: absolute;
  right: 80px;
  top: 500px;
}
</style>

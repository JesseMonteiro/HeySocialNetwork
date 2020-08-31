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
            <router-link to="/feed">
              <v-btn label="feed">
                <v-icon>mdi-chart-timeline</v-icon>
              </v-btn>
            </router-link>
          </div>

          <div class="acount">
            <router-link to="/profile">
              <v-btn label="profile">
                <v-icon>mdi-account</v-icon>
              </v-btn>
            </router-link>
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
// import Feed from "./Feed.vue";
export default {
  name: "App",
  created() {
    console.log(this.$firebase);
  },
  components: {
    ClearPage,
  },
  data: () => ({
    
  }),
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

.btn-dark {
  position: absolute;
  right: 80px;
  top: 10px;
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

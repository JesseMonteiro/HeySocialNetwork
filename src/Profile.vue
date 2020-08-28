<template>
  <v-app>
    <v-main>
      <v-app-bar fixed>
        <img
          src="https://avatars3.githubusercontent.com/u/8730443?s=400&u=219d957390dc25ee03418f7f9be0a677017a67be&v=4"
          alt="Avatar"
          class="avatar"
        />
        <div class="profileName">
          <a href="https://github.com/JesseMonteiro">{{
            user.name
          }}</a>
        </div>
        <div class="btn-dark">
          <v-switch label="DarkMode" @change="toggleDarkTheme()"></v-switch>
        </div>
      </v-app-bar>
    </v-main> 
  </v-app>
</template>

<script>
import { mapState } from 'vuex'
export default {
    computed: {
        ...mapState('users', ['users'])
    }
};
</script>

<style></style>

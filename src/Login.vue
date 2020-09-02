<template>
  <div id="login">
    <v-img src="./hey.png" alt="Hey" />
    <h1></h1>
    <input type="text" name="username" v-model="email" placeholder="email" />
    <input
      type="password"
      name="password"
      v-model="password"
      placeholder="Password"
    />
    <v-btn icon v-on:click="login()">
      <v-icon x-large>mdi-login</v-icon>
    </v-btn>
    <div class="createAccount">
      <router-link to="/register">
        <v-btn color="primary"> Criar Conta</v-btn>
      </router-link>
      <v-btn icon v-on:click="loginGoogle()">
        <v-icon x-large>mdi-google</v-icon>
      </v-btn>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";

export default {
  name: "Login",
  data() {
    return {
      dialog: false,
      createAccDialog: false,
      email: "",
      password: "",
    };
  },
  methods: {
    //eslint-disable-next-line
    async login() {
      console.log(this.password);
      const error = await this.$store.dispatch("users/login", {
        email: this.email,
        password: this.password,
      });
      console.log(error);
      if (error != null) {
        alert("Credenciais inválidas");
      }
      this.password = "";
      this.email = "";
    },
    loginGoogle() {
      this.$store.dispatch("users/loginGoogle");
    },
  },
  computed: {
    ...mapGetters("users", ["getLogError"]),
  },
};
</script>

<style scoped>
#login {
  width: 700px;
  margin: auto;
  margin-top: 200px;
  padding: 20px;
}
/* .createAccount {
  padding: 1px;
  margin: 1px;
  width: 1px;
} */
</style>

<template>
  <div id="login">
    <v-img src="./hey.png" alt="Hey" />
    <h1></h1>
    <input type="text" name="name" v-model="name" placeholder="Nome" />
    <input type="text" name="username" v-model="email" placeholder="Email" />
    <input
      type="password"
      name="password"
      v-model="password"
      placeholder="Password"
    />
    <v-btn color="primary" @click="createAccount()"> Criar</v-btn>
  </div>
</template>

<script>
// import firebase from "firebase";

export default {
  name: "Login",
  data() {
    return {
      createAccDialog: false,
      name: "",
      email: "",
      password: "",
    };
  },
  methods: {
    //eslint-disable-next-line
    createAccount() {
        console.log(this.email)
      this.$store.dispatch("users/createAccount", {
        name: this.name,
        email: this.email,
        password: this.password,
      });
        this.password = ""
        this.email = ""
    }
  },
}
</script>

<style scoped>
#login {
  width: 1000px;
  margin: auto;
  margin-top: 200px;
  padding: 100px;
}
</style>

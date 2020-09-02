import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import VueRouter from "vue-router";
import Feed from "./Feed.vue";
import Welcome from "./Welcome.vue";
import Profile from "./Profile.vue";
import Users from "./Users.vue";
import Login from "./Login.vue";
import Register from "./Register.vue";
import Firebase, { auth } from "./firebase";
import firebase from "firebase/app";


Vue.config.productionTip = false;

Vue.use(Firebase);
Vue.use(Vuex);
Vue.use(VueRouter);

const vuexPersist = new VuexPersistence({
  key: `HeyStorage`,
  storage: window.localStorage,
  modules: ["posts"],
});

const users = {
  namespaced: true,
  state: {
    users: [
      {
        name: "Jesse Montero",
        email: "jesse@jesse.com",
        senha: "123456",
      },
    ],
    userLog: null,
    logError: null,
  },
  getters: {
    getName: (state) => {
      return state.users;
    },
    getUserLog: (state) => {
      return state.userLog;
    },
    getUserLoged() {
      console.log(auth.currentUser);
      return auth.currentUser.displayName;
    },
    getLogError(state){
      return state.logError

      
    }
  },

  actions: {
    //eslint-disable-next-line
    async createAccount({ commit }, payload) {
      const { name, email, password } = payload;
      console.log("entrou current account", auth.currentUser);
      auth
        .createUserWithEmailAndPassword(email, password)
        .then(async (res) => {
          console.log("CHEGOU NO COMMIT");
          commit("setUserLog", res.user),
            await auth.currentUser
              .updateProfile({
                displayName: name,
              })
              .then(() => {
                console.log("success");
                console.log(auth.currentUser);
              });
          console.log(auth.currentUser);
          console.log(res);
          router.push("/feed");
        })
        .catch((err) => {
          console.log("CHEGOU NO ERRO");
          commit("setLogError", err);
          console.log(err);
        });
    },
    //eslint-disable-next-line
    async login({ commit }, payload) {
      const { email, password } = payload;
      console.log(payload);
      var error = null
      auth
        .signInWithEmailAndPassword(email, password)
        .then((res) => {
          commit("setUserLog", res.user);
          router.push("/feed");
          console.log(res);
        })
        .catch( function (err) {
          commit("setLogError", err);
          error = err
          console.log(this)
          alert("Credenciais invalidas" + err)
          console.log("tá chegando no erro");
          console.log(err);
        });
        return error
    },
    loginGoogle({ commit }) {
      var provider = new firebase.auth.GoogleAuthProvider();
      auth
        .signInWithPopup(provider)
        .then(function(result) {
          //eslint-disable-next-line
          commit("setUserLog", result.user);
          router.push("/feed");
          console.log(result);
        })
        .catch(function(error) {
          console.log(error);
        });
    },

    //eslint-disable-next-line
    logout({ commit }) {
      // router.push("/login");
      commit("logoutUser");
    },
  },
  mutations: {
    setUserLog(state, user) {
      state.userLog = user;
    },
    setLogError(state, error) {
      state.logError = error;
    },
    logoutUser(state) {
      firebase.auth().signOut().then(function() {
        // Sign-out successful.
        console.log("usuario deslogado")
      }).catch(function(error) {
        // An error happened.
        console.log(error)
      });
      state.userLog = null;
    },
    addLocalUser(state, user) {
      state.push(user);
    },
  },
};

const posts = {
  namespaced: true,
  state: {
    posts: [
      {
        user: "Jesse Monteiro",
        text: "Hellow, nobre padawan",
        comments: [],
        like: 0,
        foto: null,
      },
      {
        user: "Maria Jose",
        text: "Help Me, Obi-Wan Kenobi. You're My Only Hope",
        comments: [],
        like: 0,
        foto: null,
      },
      {
        user: "Lucas Marlon",
        text: "WUUAHAHHHAAAAAAAAAA.",
        comments: [],
        like: 0,
        foto: null,
      },
    ],
  },
  getters: {
    getPost: (state) => {
      return state.posts;
    },
    getDarkMode: (state) => {
      return state.darkMode;
    },
  },
  actions: {
    savePost({ commit }, post) {
      commit("addPost", post);
    },
    saveComment({ commit }, { comment, index }) {
      commit("addComment", { comment, index });
    },
    saveLikes({ commit }, index) {
      commit("saveLike", index);
    },
    editComment({ commit }, { comment, index }) {
      commit("editComment", { comment, index });
    },
    deletePost({ commit }, index) {
      commit("deletePost", index);
    },
    clearPosts({ commit }) {
      commit("clearPage");
    },
  },
  mutations: {
    addPost(state, post) {
      state.posts.push(post);
    },
    addComment(state, { comment, index }) {
      state.posts[index].comments.push(comment);
    },
    saveLike(state, index) {
      state.posts[index].like++;
    },
    editComment(state, { comment, index }) {
      state.posts[index].text = comment;
    },
    clearPage(state) {
      state.posts.splice(0);
    },
    deletePost(state, index) {
      state.posts.splice(index, 1);
    },
  },
};

const store = new Vuex.Store({
  modules: {
    users: users,
    posts: posts,
  },
  plugins: [vuexPersist.plugin],
});

const routes = [
  {
    path: "/",
    name: "",
    component: Welcome,
  },
  {
    path: "/welcome",
    name: "welcome",
    component: Welcome,
  },
  {
    path: "/feed",
    name: "feed",
    component: Feed,
  },
  {
    path: "/profile",
    name: "profile",
    component: Profile,
  },
  {
    path: "/user",
    name: "user",
    component: Users,
  },
  {
    path: "/login",
    name: "login",
    component: Login,
  },
  {
    path: "/register",
    name: "register",
    component: Register,
  },
];

const router = new VueRouter({
  routes,
});

new Vue({
  router,
  store,
  vuetify,
  render: (h) => h(App),
}).$mount("#app");

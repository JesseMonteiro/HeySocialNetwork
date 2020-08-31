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
import Login from "./Login.vue"
import Firebase from './firebase'
// import { component } from "vue/types/umd";

Vue.config.productionTip = false;

Vue.use(Firebase)
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
      },
      {
        name: "Maria Jose",
      },
      {
        name: "Lucas Marlon",
      },
      {
        name: "Chewbacca",
      },
      {
        name: "Maria Jose",
      },
    ],
  },
  getters: {
    getName: (state) => {
      return state.users;
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
  }
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

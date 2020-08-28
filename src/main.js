import Vue from "vue";
import App from "./App.vue";
import vuetify from "./plugins/vuetify";
import Vuex from "vuex";
import VuexPersistence from "vuex-persist";
import VueRouter from "vue-router";
import Profile from "./Profile.vue";

Vue.config.productionTip = false;

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
    Users: [
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
    ],
  },
  getters: {
    getPost: (state) => {
      return state.name;
    }
  }
}

const posts = {
  namespaced: true,
  state: {
    posts: [
      {
        user: "Lucas Marlon",
        text: "Hellow, nobre padawan",
        comments: [],
        like: 0,
      },
      {
        user: "Maria Jose",
        text: "Help Me, Obi-Wan Kenobi. You're My Only Hope",
        comments: [],
        like: 0,
      },
      {
        user: "Chewbacca",
        text: "WUUAHAHHHAAAAAAAAAA.",
        comments: [],
        like: 0,
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
    componente: App,
  },
  {
    path: "/profile",
    componente: Profile,
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

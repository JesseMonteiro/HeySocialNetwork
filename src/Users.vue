<template>
  <v-main>
    <div class="posts-container">
      <div v-for="(post, i) in posts" :key="i">
        <h1>{{ $route.params.username }}</h1>
        <div v-if="post.user == $route.params.userName">
          <PostCard
            @upComment="saveComment($event, i)"
            @sendEdit="editPost($event, i)"
            @editedPost="editPost($event, i)"
            @sendLike="receiveLike(i)"
            @deletePost="deletePost(i)"
            :nameProp="post.user"
            :postProp="post"
            :indexProp="i"
            :idsProp="ids"
          />
        </div>
      </div>
    </div>
  </v-main>
</template>

<script>
import { mapState } from "vuex";
import { mapGetters } from "vuex";
import PostCard from "./components/PostCard.vue";
import { firestore } from "./firebase";
import firebase from "firebase/app";

export default {
  data() {
    // this.$vuetify.theme.dark = !localStorage.getItem("dark_theme");
    return {
      name: "Jessé",
      lasname: "Monteiro Ferreira",
      field: "",
      comments: [],
      hide: false,
      picture: null,
      url: null,
      selectedFile: null,
      posts: [],
      fileMode: false,
      file: null,
      ids: [],
    };
  },
  components: {
    PostCard,
  },
  computed: {
    ...mapGetters("posts", ["getPost"]),
    ...mapState("users", ["getUserLog"]),
  },

  methods: {
    sendPost() {
      let posts = {
        user: firebase.auth().currentUser.displayName,
        text: this.field,
        comments: [],
        like: 0,
        foto: this.file,
      };

      this.$store.dispatch("posts/savePost", posts);
      this.field = "";
    },
    currentUser(){
      return firebase.auth().currentUser.displayName
    },
    post() {
      this.hide = !this.hide;
    },
    picturePopup() {
      this.fileMode = !this.fileMode;
      this.picture = !this.picture;
    },
    onFileSelected(event) {
      const file = event.target.files[0];
      this.url = URL.createObjectURL(file);
      console.log(event);
    },
    saveComment(comment, index) {
      this.$store.dispatch("posts/saveComment", {
        comment,
        index,
      });
    },
    editPost(post, index) {
      this.posts[index].text = post;
    },
    receiveLike(index) {
      this.$store.dispatch("posts/saveLikes", index);
    },
    deletePost(index) {
      this.$store.dispatch("posts/deletePost", index);
    },
    clearPage() {
      this.$store.dispatch("posts/clearPosts");
    },
    // toggleDarkTheme() {
    //   this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
    //   localStorage.setItem("dark_theme", this.$vuetify.theme.dark.toString());
    // },

    openProfile() {
      this.$router.push("Profile");
    },
    // },
    //   saveComment(comment, index) {
    //     this.$store.dispatch("posts/saveComment", {
    //       comment,
    //       index,
    //     });
    //   },
    //   editPost(post, index) {
    //     this.posts[index].text = post;
    //   },
    //   receiveLike(index) {
    //     this.$store.dispatch("posts/saveLikes", index);
    //   },
    //   deletePost(index) {
    //     this.$store.dispatch("posts/deletePost", index);
    //   },
    //   consoleImprime(nome) {
    //     console.log(nome);
    //     return nome;
    // },
  },
  created() {
    firestore
      .collection("posts")
      .orderBy("created_at", "asc")
      .onSnapshot((querySnapshot) => {
        this.posts = [];
        this.ids = [];
        querySnapshot.forEach((doc) => {
          this.posts.push(doc.data());
          console.log(doc.id);
          this.ids.push(doc.id);
        });
      });
  },
};
</script>

<style scoped>
.posts-container {
  width: 100%;
  padding-top: 64px;
  padding-top: 56px;
}
</style>










$route.params.userName
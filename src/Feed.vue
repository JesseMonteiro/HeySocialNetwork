<template>
  <div>
    <div class="posts-container">
      <div v-for="(post, i) in getPost" :key="i">
        <PostCard
          @upComment="saveComment($event, i)"
          @sendEdit="editPost($event, i)"
          @editedPost="editPost($event, i)"
          @sendLike="receiveLike(i)"
          @deletePost="deletePost(i)"
          :nameProp="post.user"
          :postProp="post"
          :indexProp="i"
        />
      </div>
    </div>

    <v-app-bar v-if="hide" color="#424242" fixed bottom>
      <v-text-field
        @keyup.enter="sendPost()"
        v-model="field"
        label="Escrever Publicação"
        solo
        hide-details
      ></v-text-field>

      <div classe="uploadPhoto">
        <v-btn @click="picturePopup()" x-large icon color="blue">
          <v-icon>mdi-camera-plus</v-icon>
        </v-btn>
        <input v-if="picture" type="file" @change="onFileSelected" />
        <v-card outlined></v-card>
      </div>

      <v-btn @click="sendPost()" x-large icon color="blue">
        <v-icon>mdi-send</v-icon>
      </v-btn>
    </v-app-bar>

    <div class="plusFloatingBtn">
      <v-card>
        <v-card-text style="height: 300px;"></v-card-text>
        <v-card-text style="position: fixed; bottom: 80px">
          <v-btn @click="post()" absolute dark fab top right color="pink">
            <v-icon>mdi-plus</v-icon>
          </v-btn>
        </v-card-text>
      </v-card>
    </div>
  </div>
</template>

<script>
import { mapGetters } from "vuex";
import PostCard from "./components/PostCard.vue";
export default {
  components: {
    PostCard,
  },
  data() {
    this.$vuetify.theme.dark = !localStorage.getItem("dark_theme");
    return {
      name: "Jessé",
      lasname: "Monteiro Ferreira",
      field: "",
      comments: [],
      hide: false,
      picture: null,
      url: null,
      selectedFile: null,
    };
  },

  methods: {
    sendPost() {
      let posts = {
        user: "Jesse Monteiro",
        text: this.field,
        comments: [],
        like: 0,
        foto: null,
      };
      if (this.url != null) {
        posts.foto = this.url;
        console.log(this.foto);
        this.url = null;
      }
      this.$store.dispatch("posts/savePost", posts);
      this.field = "";
    },
    post() {
      this.hide = !this.hide;
    },
    picturePopup() {
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
    toggleDarkTheme() {
      this.$vuetify.theme.dark = !this.$vuetify.theme.dark;
      localStorage.setItem("dark_theme", this.$vuetify.theme.dark.toString());
    },

    openProfile() {
      this.$router.push("Profile");
    },
  },
  computed: {
    ...mapGetters("posts", ["getPost"]),
    ...mapGetters("users", ["getName"]),
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
.posts-container {
  width: 100%;
  padding-top: 64px;
  padding-top: 56px;
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
.profileName {
  position: absolute;
  left: 100px;
  top: 20px;
}
.avatar {
  vertical-align: middle;
  width: 50px;
  height: 50px;
  border-radius: 50%;
}

.btn-dark {
  position: absolute;
  right: 80px;
  top: 10px;
}
</style>

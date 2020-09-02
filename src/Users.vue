<template>
  <v-main>

    <div class="posts-container">
      <div v-for="(post, i) in getPost" :key="i">
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
export default {
  components: {
    PostCard,
  },
  computed: {
    ...mapGetters("posts", ["getPost"]),
    ...mapState("users", ["getUserLog"]),
  },

  methods: {
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
    consoleImprime(nome) {
      console.log(nome);
      return nome;
    },
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

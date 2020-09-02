<template>
  <v-card
    outlined
    class="ma-3"
    :class="{
      blue: postProp.user != 'me',
      blue: postProp.user == 'me',
    }"
  >
    <div v-if="nameProp == findName(nameProp)">
      <v-btn @click="editPostStatus()" icon class="editButton">
        <v-icon>mdi-circle-edit-outline</v-icon>
      </v-btn>
    </div>
    <div v-if="nameProp == findName(nameProp)">
      <v-btn @click="deletePost()" icon class="deleteButton">
        <v-icon>mdi-delete-empty</v-icon>
      </v-btn>
    </div>

    <v-btn @click="sendLike()" icon class="likeButton">
      <v-icon>mdi-thumb-up</v-icon>
      <v-icon>{{ postProp.like }}</v-icon>
    </v-btn>

    <v-card-subtitle
      class="font-weight-bold"
      @click="openProfile(postProp.user)"
      >{{ postProp.user }}
    </v-card-subtitle>
    <div class="picture" v-if="postProp.foto != null">
      <v-img
        :src="postProp.foto"
        lazy-src="https://picsum.photos/id/11/100/60"
        aspect-ratio="1"
        class="grey lighten-2"
        max-width="500"
        max-height="300"
      ></v-img>
    </div>

    <v-card-text>{{ postProp.text }}</v-card-text>
    <div v-if="postProp.comments && postProp.comments.length > 0">
      <v-card-text><h4>Comentários</h4></v-card-text>
      <v-card-subtitle class="font-weight-bold"
        >{{ postProp.comments }}
      </v-card-subtitle>
    </div>

    <div v-if="statusEdit == false">
      <v-text-field
        @keyup.enter="sendField(field)"
        v-model="field"
        label="Escrever comentário..."
        solo
        hide-details
      ></v-text-field>
    </div>
    <div v-if="statusEdit == true">
      <div v-if="postProp.user == getUserLoged">
        <v-text-field
          @keyup.enter="sendField(field), editPostStatus()"
          v-model="postProp.text"
          label="Digite o novo conteúdo"
          solo
          hide-details
        ></v-text-field>
      </div>
    </div>
  </v-card>
</template>

<script>
import { mapGetters } from "vuex";
import firebase from "firebase/app";

export default {
  props: ["nameProp", "postProp", "indexProp"],

  data() {
    return {
      field: "",
      statusEdit: false,
    };
  },

  methods: {
    sendField(field) {
      this.$emit("upComment", field);
      this.field = "";
    },
    sendEdit() {
      this.$emit("sendPost", true);
      this.editPostStatus();
    },
    editPostStatus() {
      this.statusEdit = !this.statusEdit;
      console.log(this.statusEdit);
    },
    editPost() {
      this.$emit("editedPost", this.field);
    },
    sendLike() {
      this.$emit("sendLike", true);
    },
    deletePost() {
      this.$emit("deletePost", true);
    },
    openProfile(userName) {
      console.log(userName);
      this.$router.push({ name: "user", params: { userName } });
    },
    findName(name) {
    //eslint-disable-next-line
      console.log(name)
      console.log(firebase.auth().currentUser.displayName)
      return firebase.auth().currentUser.displayName;
    },
  },
  computed: {
    ...mapGetters("posts", ["getPost"]),
    ...mapGetters("users", ["getName"]),
    ...mapGetters("users", ["getUserLoged"]),
  },
};
</script>

<style scoped>
.editButton {
  position: absolute;
  right: 30px;
  top: 2px;
}

.likeButton {
  position: absolute;
  right: 18px;
  bottom: 60px;
}
.deleteButton {
  position: absolute;
  right: 6px;
  top: 2px;
}
</style>

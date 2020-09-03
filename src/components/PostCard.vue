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
    <div class="picture" v-if="src">
      <v-img
        :src="src"
        lazy-src="https://picsum.photos/id/11/100/60"
        aspect-ratio="1"
        class="grey lighten-2"
        max-width="500"
        max-height="300"
      ></v-img>
    </div>

    <v-card-text>{{ postProp.text }}</v-card-text>
    <div v-if="comments && comments.length > 0">
      <v-card-text><h4>Comentários</h4></v-card-text>
      <v-card-subtitle class="font-weight-bold"
        >{{ comments }}
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
          @keyup.enter="editPost(field), editPostStatus()"
          v-model="field"
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
import { storage } from "../firebase";
import { firestore } from "../firebase";

export default {
  props: ["nameProp", "postProp", "indexProp", "idsProp"],

  data() {
    return {
      field: "",
      statusEdit: false,
      src: null,
      comments: [],
    };
  },

  methods: {
    async sendField(field) {
      var commentAdd = {
        name: firebase.auth().currentUser.displayName,
        comment: field,
        created_at: +new Date(),
      };

      try {
        console.log(this.idsProp[this.indexProp]);
        console.log(firestore);
        await firestore
          .collection("posts")
          .doc(this.idsProp[this.indexProp])
          .collection("comments")
          .add(commentAdd);
      } catch (err) {
        console.log(err);
      }
    },
    sendEdit() {
      this.$emit("sendPost", true);
      this.editPostStatus();
    },
    editPostStatus() {
      this.statusEdit = !this.statusEdit;
      console.log(this.statusEdit);
    },
    editPost(field) {
      firestore
        .collection("posts")
        .doc(this.idsProp[this.indexProp])
        .update({
          text: field,
        })
        .then(function() {
          console.log("Document successfully altered!");
        })
        .catch(function(error) {
          console.error("Error altered document: ", error);
        });
      this.$emit("editedPost", this.field);
    },
    sendLike() {
      firestore
        .collection("posts")
        .doc(this.idsProp[this.indexProp])
        .update({
          like: this.postProp.like++,
        })
        .then(function() {
          console.log("Document successfully altered!");
        })
        .catch(function(error) {
          console.error("Error altered document: ", error);
        });
      this.$emit("sendLike", true);
    },
    deletePost() {
      firestore
        .collection("posts")
        .doc(this.idsProp[this.indexProp])
        .delete()
        .then(function() {
          console.log("Document successfully deleted!");
        })
        .catch(function(error) {
          console.error("Error removing document: ", error);
        });
      this.$emit("deletePost", true);
    },
    openProfile(userName) {
      console.log(userName);
      this.$router.push({ name: "user", params: { userName } });
    },
    findName(name) {
      //eslint-disable-next-line
      console.log(name);
      console.log(firebase.auth().currentUser.displayName);
      return firebase.auth().currentUser.displayName;
    },
  },
  computed: {
    ...mapGetters("posts", ["getPost"]),
    ...mapGetters("users", ["getName"]),
    ...mapGetters("users", ["getUserLoged"]),
  },
  async created() {
    if (this.postProp.file) {
      const url = await storage
        .ref()
        .child(`${this.postProp.user}/img/${this.postProp.created_at}`)
        .getDownloadURL();
      console.log(url);
      this.src = url;
    }
    firestore
      .collection("posts")
      .doc(this.idsProp[this.indexProp])
      .collection("comments")
      .orderBy("created_at", "asc")
      .onSnapshot((querySnapshot) => {
        this.comments = [];
        querySnapshot.forEach((doc) => {
          var com = {
            name: doc.data().name,
            comment: doc.data().comment,
          };
          this.comments.push(com);
        });
      });
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

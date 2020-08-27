<template>
  <v-card
    outlined
    class="ma-3"
    :class="{
      'teal accent-4': postProp.user != 'me',
      'grey lighten-2': postProp.user == 'me',
    }"
  >
    <v-btn @click="editPostStatus()" icon class="editButton">
      <v-icon>mdi-circle-edit-outline</v-icon>
    </v-btn>
    <v-btn @click="deletePost()" icon class="deleteButton">
      <v-icon>mdi-delete-empty</v-icon>
    </v-btn>
    <v-btn @click="sendLike()" icon class="likeButton">
      <v-icon>mdi-thumb-up</v-icon>
      <v-icon>{{ postProp.like }}</v-icon>
    </v-btn>

    <v-card-subtitle class="font-weight-bold"
      >{{ postProp.user != "me" ? postProp.user : "Eu" }}
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
    <div v-if="postProp.comments != ''">
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
      <v-text-field
        @keyup.enter="sendField(field), editPostStatus()"
        v-model="postProp.text"
        label="Digite o novo conteúdo"
        solo
        hide-details
      ></v-text-field>
    </div>
  </v-card>
</template>

<script>
export default {
  props: ["nameProp", "postProp", "imgProp"],

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

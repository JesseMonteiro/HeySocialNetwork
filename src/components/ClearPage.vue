<template>
  <v-btn @click="sendClearPage()" icon>
    <v-icon>mdi-delete-sweep</v-icon>
  </v-btn>
</template>

<script>
export default {
  methods: {
    sendClearPage() {
      this.$emit("clearAll", true);
    },
  },
};
</script>
<style scoped></style>

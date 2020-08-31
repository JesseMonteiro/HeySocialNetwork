<template>
  <div class="welcome">
    <v-row align="center" justify="center">
      <v-img src="./hey.png" alt="Hey" />
    </v-row>
  </div>
</template>

<script>
export default {};
</script>

<style scoped>
.welcome {
        border-radius: 1em;
        padding: 1em;
        position: absolute;
        top: 50%;
        left: 50%;
        margin-right: -50%;
        transform: translate(-50%, -50%) 
}
</style>

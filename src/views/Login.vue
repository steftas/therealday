<template>
  <v-row no-gutters align="center" justify="center">
    <v-col sm="12" md="4">
      <div class="login-div">
        <img alt="Vue logo" src="../assets/images/logo.png" class="mb-5" />
        <LoginForm /></div
    ></v-col>
  </v-row>
</template>

<script>
import LoginForm from "@/components/LoginForm.vue";

export default {
  name: "Login",
  components: {
    LoginForm,
  },
};
</script>

<style scoped lang="scss">
.login-div {
  text-align: center;

  img {
    width: 100%;
    max-width: 512px;
  }
}
</style>

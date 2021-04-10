<template>
  <v-row no-gutters align="center" justify="center">
    <v-col sm="12" md="6">
      <v-card class="text-center" height="400" color="transparent" flat>
        <div class="display-3 my-5">Page not found.</div>
        <div class="grey--text lighten-5">
          The page you are trying to get to never existed in this reality, or
          has migrated to a parallel universe.
        </div>
        <div class="paragraph-text my-3">
          <br />
          <br />Try going back to home page.
        </div>

        <v-btn
          class="mr-4 bg-theme text-white"
          elevation="6"
          raised
          rounded
          x-large
          to="/jobs"
        >
          Home
        </v-btn>
      </v-card>
    </v-col>
  </v-row>
</template>

<script>
export default {
  name: "NotFound",
};
</script>

<style lang="scss" scoped>
.paragraph-text {
  font-size: 18px;
}
</style>
>

<template>
  <v-app>
    <Alert />

    <!-- Sizes your content based upon application components -->
    <v-main>
      <!-- Provides the application the proper gutter -->
      <v-container fill-height fluid>
        <!-- If using vue-router -->
        <router-view></router-view>
      </v-container>
    </v-main>

    <Footer />
  </v-app>
</template>

<script>
import Footer from "@/components/Footer.vue";
import Alert from "@/components/Alert.vue";

export default {
  components: {
    Footer,
    Alert,
  },
};
</script>

<style lang="scss"></style>

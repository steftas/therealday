<template>
  <v-app-bar class="bg-theme text-white" dense dark app>
    <v-toolbar-title>The realday</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-btn icon @click="logout">
      <v-icon>mdi-logout</v-icon>
    </v-btn>
  </v-app-bar>
</template>

<script>
export default {
  name: "Header",
  methods: {
    logout() {
      localStorage.clear();
      this.$router.push("/login");
    },
  },
};
</script>

<template>
  <v-app-bar class="bg-theme text-white" dense dark app>
    <v-toolbar-title>The realday</v-toolbar-title>

    <v-spacer></v-spacer>

    <v-toolbar-title>{{ user.email }}</v-toolbar-title>

    <v-tooltip bottom>
      <template v-slot:activator="{ on, attrs }">
        <v-btn icon @click="logout" v-bind="attrs" v-on="on">
          <v-icon>mdi-logout</v-icon>
        </v-btn>
      </template>
      <span>Logout</span>
    </v-tooltip>
  </v-app-bar>
</template>

<script>
export default {
  name: "Header",
  computed: {
    user() {
      return this.$store.getters.getUser || {};
    },
  },
  methods: {
    logout() {
      this.$store
        .dispatch("logout")
        .then(() => {})
        .catch((err) => console.log(err));
    },
  },
};
</script>

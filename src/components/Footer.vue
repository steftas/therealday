<template>
  <v-footer elevation="6" app>
    <v-col class="text-center" cols="12">
      {{ new Date().getFullYear() }} — <strong>&copy; Copyright</strong>
    </v-col>
  </v-footer>
</template>

<script>
export default {
  name: "Footer",
};
</script>

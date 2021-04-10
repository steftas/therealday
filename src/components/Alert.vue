<!-- Alert.vue -->
<template>
  <div>
    <v-alert
      elevation="7"
      class="text-center alert"
      :value="!!error"
      type="error"
      dismissible
      border="bottom"
      >{{ error }}</v-alert
    >
  </div>
</template>

<script>
export default {
  computed: {
    error() {
      return this.$store.getters.getError;
    },
  },
};
</script>

<style lang="scss" scoped>
.alert {
  position: fixed;
  bottom: 4rem;
  left: 50%;
  width: 50%;
  z-index: 1000;
  transform: translateX(-50%);
}
</style>

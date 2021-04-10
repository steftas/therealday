<template>
  <form>
    <v-text-field
      v-model="email"
      :error-messages="emailErrors"
      label="E-mail"
      required
      autocomplete="off"
      @input="$v.email.$touch()"
      @blur="$v.email.$touch()"
    ></v-text-field>

    <v-text-field
      v-model="password"
      :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
      :error-messages="passwordErrors"
      label="Password"
      :type="showPassword ? 'text' : 'password'"
      autocomplete="off"
      required
      @input="$v.password.$touch()"
      @blur="$v.password.$touch()"
      @click:append="showPassword = !showPassword"
    ></v-text-field>

    <div class="mt-5">
      <v-btn
        class="mr-4 bg-theme text-white"
        @click="submit"
        :loading="loading"
        elevation="6"
        raised
        rounded
        x-large
      >
        Login
      </v-btn>
    </div>
  </form>
</template>

<script>
import { validationMixin } from "vuelidate";
import { required, email } from "vuelidate/lib/validators";

export default {
  name: "LoginForm",
  mixins: [validationMixin],
  validations: {
    email: { required, email },
    password: { required },
  },
  data: () => ({
    password: "",
    email: "",
    showPassword: false,
    loading: false,
  }),
  computed: {
    passwordErrors() {
      const errors = [];
      if (!this.$v.password.$dirty) return errors;
      !this.$v.password.required && errors.push("Password is required.");
      return errors;
    },
    emailErrors() {
      const errors = [];
      if (!this.$v.email.$dirty) return errors;
      !this.$v.email.email && errors.push("Must be valid e-mail");
      !this.$v.email.required && errors.push("E-mail is required");
      return errors;
    },
  },
  methods: {
    submit() {
      this.$v.$touch();
      if (!this.$v.$invalid) {
        this.loading = true;

        const data = {
          email: this.email,
          password: this.password,
        };

        this.$store
          .dispatch("login", data)
          .then(() => {
            this.loading = false;
            this.$router.push("/jobs");
          })
          .catch((err) => {
            this.$store.dispatch("showError", err);
            this.loading = false;
          });
      }
    },
  },
};
</script>

<style scoped lang="scss"></style>

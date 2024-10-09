<template>
  <div class="flex items-center justify-center min-h-screen bg-gray-100">
    <div class="bg-white p-8 rounded shadow-md w-96">
      <h2 class="text-2xl font-bold mb-6 text-center">Sign Up</h2>
      <form @submit.prevent="signup">
        <div class="mb-4">
          <label class="block text-gray-700">Username</label
          ><input
            type="text"
            v-model="username"
            required
            class="border border-gray-300 p-2 w-full rounded"
          />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700">Password</label
          ><input
            type="password"
            v-model="password"
            required
            class="border border-gray-300 p-2 w-full rounded"
          />
        </div>
        <button
          type="submit"
          class="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600 w-full"
        >
          Daftar
        </button>
        <p class="mt-4 text-center">
          Sudah punya akun?
          <router-link to="/login" class="text-blue-500"
            >Masuk di sini</router-link
          >
        </p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      username: "",
      password: "",
    };
  },
  methods: {
    async signup() {
      try {
        await axios.post("http:/localhost:3000/api/signup", {
          username: this.username,
          password: this.password,
        });
        alert("User Created successfully. You can now log in.");
        this.$router.push("/login");
      } catch (error) {
        console.error(error);
        alert("Sign Up failed. Please try again");
      }
    },
  },
};
</script>

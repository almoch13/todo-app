<template>
  <div class="flex items-center justify-center h-screen bg-gray-100">
    <div class="max-w-sm mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 class="text-2xl font-bold mb-4 text-center">Login</h1>
      <input
        v-model="username"
        type="text"
        placeholder="Username"
        class="border p-2 w-full mb-4"
      />
      <input
        v-model="password"
        type="password"
        placeholder="Password"
        class="border p-2 w-full mb-4"
      />
      <button
        @click="login"
        class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 w-full"
      >
        Login
      </button>
      <p class="mt-4">
        Don't have an account?
        <router-link to="/signup" class="text-blue-500">Sign up</router-link>
      </p>
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
    async login() {
      try {
        const response = await axios.post("http://localhost:3000/api/login", {
          username: this.username,
          password: this.password,
        });
        localStorage.setItem("token", response.data.token);
        this.$router.push("/todolist");
      } catch (error) {
        console.error(error);
        alert("Login failed. Please check your credentials.");
      }
    },
  },
};
</script>

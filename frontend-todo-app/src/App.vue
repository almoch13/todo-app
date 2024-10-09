<template>
  <div class="bg-gray-100 min-h-screen">
    <div>
      <nav
        class="flex fixed top-0 left-0 w-full justify-between p-4 bg-transparent text-black"
      >
        <h1 class="text-xl font-bold">YourTodo</h1>
        <div>
          <router-link v-if="!isAuthenticated" to="/login" class="mr-4"
            >Login</router-link
          >
          <button
            v-if="isAuthenticated"
            @click="logout"
            class="bg-red-500 px-4 py-2 rounded hover:bg-red-600 text-white"
          >
            Logout
          </button>
        </div>
      </nav>
    </div>
    <div>
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      isAuthenticated: false,
    };
  },
  created() {
    this.checkAuthentication();
  },
  methods: {
    checkAuthentication() {
      this.isAuthenticated = !!localStorage.getItem("token");
    },
    logout() {
      localStorage.removeItem("token");
      this.checkAuthentication();
      this.$router.push("/login");
    },
  },
  watch: {
    $route(to, from) {
      this.checkAuthentication();
    },
  },
};
</script>

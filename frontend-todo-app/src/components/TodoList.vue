<template>
  <div class="min-h-screen pt-32">
    <div class="max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h1 class="text-4xl font-bold mb-6 text-center">Your Todo List</h1>

      <!-- addTodo Form -->
      <div class="flex mb-4">
        <input
          v-model="newTodoText"
          class="border rounded-l-lg p-2 w-full focus:outline-none focus:ring-2 focus:ring-green-500"
          placeholder="Add new Todo"
        />
        <select
          v-model="newTodoCategory"
          class="border-t border-b border-r rounded-r-lg p-2"
        >
          <option value="">Select Category</option>
          <option
            v-for="category in categories"
            :key="category"
            :value="category"
          >
            {{ category }}
          </option>
        </select>
        <button
          @click="addTodo"
          class="bg-green-500 text-white px-4 py-2 rounded ml-2 hover:bg-green-600 transition"
        >
          Add Todo
        </button>
      </div>

      <!-- Dropdown Category Filter -->
      <div class="mb-4">
        <label for="categoryFilter" class="mr-2">Filter by Category</label>
        <select
          v-model="categoryFilter"
          id="categoryFilter"
          class="border p-2 rounded focus:outline-none focus:ring-2 focus:ring-green-500"
        >
          <option value="">All</option>
          <option
            v-for="category in categories"
            :key="category"
            :value="category"
          >
            {{ category }}
          </option>
        </select>
      </div>

      <!-- Filtered Todo List -->
      <div class="space-y-4 mt-6">
        <todo-item
          v-for="todo in filteredTodos"
          :key="todo.id"
          :todo="todo"
          :categories="categories"
          @delete-todo="deleteTodo"
          @edit-todo="editTodo"
          @update-todo="updateTodoStatus"
          class="bg-gray-100 p-4 rounded shadow hover:shadow-lg transition"
        />
      </div>
    </div>
  </div>
</template>

<script>
import TodoItem from "./TodoItem.vue";
import {
  getTodos,
  addTodo,
  deleteTodo,
  updateTodo,
} from "../service/todoService";

export default {
  components: { TodoItem },
  data() {
    return {
      todos: [],
      newTodoText: "",
      newTodoCategory: "",
      categoryFilter: "",
      categories: ["Personal", "Work", "Urgent"],
    };
  },
  async created() {
    this.todo = await getTodos();
    this.extractCategories();
  },
  methods: {
    extractCategories() {
      const uniqueCategories = new Set(this.todos.map((todo) => todo.category));
      uniqueCategories.add("Personal");
      uniqueCategories.add("Work");
      uniqueCategories.add("Urgent");
      this.categories = Array.from(uniqueCategories);
    },
    async addTodo() {
      if (this.newTodoText.trim() === "" || this.newTodoCategory === "") return;
      const newTodo = await addTodo({
        text: this.newTodoText,
        completed: false,
        category: this.newTodoCategory,
      });
      this.todos.push(newTodo);
      this.newTodoText = "";
      this.newTodoCategory = "";
      this.extractCategories();
    },
    async deleteTodo(id) {
      await deleteTodo(id);
      this.todos = this.todos.filter((todo) => todo.id !== id);
    },
    async editTodo(updatedTodo) {
      const updatedData = await updateTodo(updatedTodo);
      const index = this.todos.findIndex((t) => t.id === updatedData.id);
      this.todos.splice(index, 1, updatedData);
      this.extractCategories();
    },
    async updateTodoStatus(todo) {
      const updatedTodo = await updateTodo(todo);
      const index = this.todos.findIndex((t) => t.id === updatedTodo.id);
      this.todos.splice(index, 1, updatedTodo);
    },
  },
  computed: {
    filteredTodos() {
      if (this.categoryFilter) {
        return this.todo.filter(
          (todo) => todo.category === this.categoryFilter
        );
      }
      return this.todos;
    },
  },
};
</script>

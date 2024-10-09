<template>
  <div
    class="flex justify-between items-center p-4 bg-gray-50 shadow-md mb-2 rounded"
  >
    <!-- Checklist Todo -->
    <div class="flex items-center">
      <input
        type="checkbox"
        v-model="todo.completed"
        @change="updateTodoStatus(todo)"
      />

      <!-- Displaying Text and Todo Category -->
      <div v-if="!isEditing">
        <span :class="{ 'line-through': todo.completed }">{{ todo.text }}</span>
        <span class="text-sm text-gray-500 ml-2">- {{ todo.category }}</span>
      </div>

      <!-- Form Edit Todo -->
      <div v-else class="ml-2">
        <input
          v-model="editText"
          class="border rounded p-1"
          placeholder="Edit todo"
        /><select v-model="editCategory" class="border rounded p-1 ml-2">
          <option
            v-for="category in categories"
            :key="category"
            :value="category"
          >
            {{ category }}
          </option>
        </select>
      </div>
    </div>

    <!-- Action Button -->
    <div>
      <button
        v-if="!isEditing"
        @click="startEditing"
        class="bg-blue-500 text-white px-4 py-1 rounded"
      >
        Edit
      </button>
      <button
        v-else
        @click="seveEdit"
        class="bg-green-500 text-white px-4 py-1 rounded"
      >
        Save
      </button>
      <button
        @click="deleteTodo(todo.id)"
        class="bg-red-500 text-white px-4 py-1 rounded ml-2"
      >
        Delete
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    todo: Object,
    categories: Array,
  },
  data() {
    return {
      isEditing: false,
      editText: this.editText,
      editCategory: this.todo.category,
    };
  },
  methods: {
    startEditing() {
      this.isEditing = true;
    },
    async saveEdit() {
      this.isEditing = false;
      this.$emit("edit-todo", {
        ...this.todo,
        text: this.editText,
        category: this.editCategory,
      });
    },
    deleteTodo(id) {
      this.$emit("delete-todo", id);
    },
    updateTodoStatus(todo) {
      this.$emit("update-todo", todo);
    },
  },
};
</script>

<template>
  <div class="container">
    <h1>Todo List</h1>

    <form @submit.prevent="addTodo">
      <input v-model="newTodo" placeholder="New todo..." />
      <button type="submit">Add</button>
    </form>

    <ul>
      <li v-for="todo in todos" :key="todo.id">
        <span :style="{ textDecoration: todo.done ? 'line-through' : 'none' }">
          {{ todo.text }}
        </span>

        <button @click="deleteTodo(todo.id)">Delete</button>
        <button @click="editTodo(todo)">Edit</button>
        <button @click="markDone(todo.id)" v-if="!todo.done">Mark done</button>
      </li>
    </ul>

    <!-- Edit modal (super simple) -->
    <div v-if="editing">
      <input v-model="editing.text" />
      <button @click="saveEdit">Save</button>
      <button @click="editing = null">Cancel</button>
    </div>
  </div>
</template>

<script>
import axios from "axios";

export default {
  data() {
    return {
      todos: [],
      newTodo: "",
      editing: null
    };
  },

  created() {
    this.fetchTodos();
  },

  methods: {
    async fetchTodos() {
      const res = await axios.get("http://localhost:3000/todos");
      this.todos = res.data;
    },

    async addTodo() {
      if (!this.newTodo.trim()) return;
      const res = await axios.post("http://localhost:3000/todos", {
        text: this.newTodo
      });
      this.todos.push(res.data);
      this.newTodo = "";
    },

    async deleteTodo(id) {
      await axios.delete(`http://localhost:3000/todos/${id}`);
      this.todos = this.todos.filter(t => t.id !== id);
    },

    editTodo(todo) {
      this.editing = { ...todo };
    },

    async saveEdit() {
      await axios.put(
        `http://localhost:3000/todos/${this.editing.id}`,
        { text: this.editing.text }
      );

      const index = this.todos.findIndex(t => t.id === this.editing.id);
      this.todos[index].text = this.editing.text;

      this.editing = null;
    },

    async markDone(id) {
      const res = await axios.patch(
        `http://localhost:3000/todos/${id}/done`
      );

      const index = this.todos.findIndex(t => t.id === id);
      this.todos[index].done = res.data.done;
    }
  }
};
</script>

<template>
  <MobileLayout>
    <div class="todo-container">
      <h1 class="title">
        📱 移动待办
      </h1>
      <div class="add-todo">
        <input v-model="newTodoContent" />
        <button @click="dealAddTodo()">添加</button>
      </div>
      <div class="todo-list">
        <ul>
          <li v-for="todoItem in todoList" :key="todoItem.id">
            {{ todoItem.content }}
          </li>
        </ul>
      </div>
    </div>
    <div class="bottom-menu">

    </div>
  </MobileLayout>
</template>

<script setup>
import { reactive, ref } from 'vue';
import MobileLayout from './MobileLayout.vue';

const newTodoContent = ref('');

const dealAddTodo = () => {
  todoList.push({
    id: Date.now(),
    content: newTodoContent.value,
  });
  newTodoContent.value = '';
}

const todoList = reactive([]);
</script>

<style lang="css" scoped>
.todo-container {
  height: 100%;
  overflow: hidden;
}

.title {
  text-align: center;
  padding: 20px;
  font-size: 20px;
  font-weight: bold;
}
</style>
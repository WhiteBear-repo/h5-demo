<!-- src/components/TodoApp.vue - 调试版 -->
<template>
  <div class="todo-container">
    <h1 style="color: #333; text-align: center; margin: 20px 0;">
      📱 移动待办测试版
    </h1>

    <!-- 输入区域 -->
    <div style="display: flex; gap: 10px; padding: 0 20px; margin-bottom: 20px;">
      <input v-model="newTodo" @keyup.enter="addTodo" placeholder="输入任务..."
        style="flex: 1; padding: 12px; border: 1px solid #ddd; border-radius: 8px;" />
      <button @click="addTodo"
        style="background: #4CAF50; color: white; border: none; padding: 0 20px; border-radius: 8px;">
        添加
      </button>
    </div>

    <!-- 任务列表 -->
    <div style="padding: 0 20px;">
      <div v-for="(todo, index) in todos" :key="todo.id"
        style="background: white; padding: 15px; margin-bottom: 10px; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1);">
        <div style="display: flex; align-items: center;">
          <input type="checkbox" :checked="todo.completed" @change="toggleTodo(index)" style="margin-right: 10px;" />
          <span
            :style="{ textDecoration: todo.completed ? 'line-through' : 'none', color: todo.completed ? '#999' : '#333' }">
            {{ todo.text }}
          </span>
          <button @click="removeTodo(index)"
            style="margin-left: auto; background: #ff4757; color: white; border: none; padding: 5px 10px; border-radius: 4px; font-size: 12px;">
            删除
          </button>
        </div>
      </div>

      <!-- 空状态 -->
      <div v-if="todos.length === 0" style="text-align: center; color: #999; padding: 40px 0;">
        暂无任务，添加一个吧！
      </div>
    </div>

    <!-- 统计 -->
    <div
      style="position: fixed; bottom: 0; left: 0; right: 0; background: white; padding: 15px; border-top: 1px solid #eee;">
      <div style="display: flex; justify-content: space-around; margin-bottom: 10px;">
        <span>总计: {{ todos.length }}</span>
        <span>已完成: {{ completedCount }}</span>
        <span>未完成: {{ activeCount }}</span>
      </div>
      <button @click="clearCompleted" :disabled="completedCount === 0"
        style="width: 100%; background: #ff6b6b; color: white; border: none; padding: 12px; border-radius: 8px;">
        清除已完成 ({{ completedCount }})
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'

// 数据
const newTodo = ref('')
const todos = ref([])

// 计算属性
const completedCount = computed(() =>
  todos.value.filter(t => t.completed).length
)

const activeCount = computed(() =>
  todos.value.length - completedCount.value
)

// 方法
const addTodo = () => {
  console.log('添加任务:', newTodo.value)
  if (newTodo.value.trim()) {
    todos.value.push({
      id: Date.now(),
      text: newTodo.value.trim(),
      completed: false
    })
    newTodo.value = ''
    saveToLocalStorage()
  }
}

const toggleTodo = (index) => {
  console.log('切换任务状态:', index)
  todos.value[index].completed = !todos.value[index].completed
  saveToLocalStorage()
}

const removeTodo = (index) => {
  console.log('删除任务:', index)
  todos.value.splice(index, 1)
  saveToLocalStorage()
}

const clearCompleted = () => {
  console.log('清除已完成任务')
  todos.value = todos.value.filter(t => !t.completed)
  saveToLocalStorage()
}

// 本地存储
const saveToLocalStorage = () => {
  localStorage.setItem('vue3-todos-debug', JSON.stringify(todos.value))
  console.log('保存到本地存储:', todos.value)
}

const loadFromLocalStorage = () => {
  const saved = localStorage.getItem('vue3-todos-debug')
  if (saved) {
    todos.value = JSON.parse(saved)
    console.log('从本地存储加载:', todos.value)
  }
}

// 生命周期
onMounted(() => {
  console.log('组件挂载完成')
  loadFromLocalStorage()

  // 添加几个测试数据
  if (todos.value.length === 0) {
    todos.value = [
      { id: 1, text: '学习大前端开发', completed: false },
      { id: 2, text: '完成TodoApp调试', completed: true },
      { id: 3, text: '测试移动端适配', completed: false }
    ]
  }
})
</script>

<style scoped>
.todo-container {
  min-height: clac(100dvh - 100px);
  /* 减去底部统计栏的高度 */
  padding-bottom: 100px;
  /* 为底部统计栏留空间 */
  background: linear-gradient(135deg, #f5f7fa 0%, #c3cfe2 100%);
  /* overflow: hidden; */
}
</style>
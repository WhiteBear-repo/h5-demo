// src/vite-env.d.ts 应该已经有类似内容
// <reference types="vite/client" />

// 如果没有.vue声明，添加下面这行
declare module '*.vue' {
  import type { DefineComponent } from 'vue'
  const component: DefineComponent<object, object, any>
  export default component
}

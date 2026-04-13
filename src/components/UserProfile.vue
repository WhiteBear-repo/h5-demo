<!-- src/components/UserProfile.vue -->
<template>
  <!-- 移动端布局容器 -->
  <div class="profile-container">
    <!-- 顶部安全区域 -->
    <div class="safe-top"></div>

    <!-- 头部 -->
    <header class="profile-header">
      <h1>个人中心</h1>
    </header>

    <!-- 主要内容 -->
    <main class="profile-main">
      <!-- 这里实现用户信息和卡片 -->
      <div class="profile-basic-info">
        <div class="profile-avatar"></div>
        <p class="profile-username">用户名</p>
        <p class="profile-level">会员等级3</p>
      </div>
      <div class="profile-info">
        <ul class="profile-info-list">
          <li class="profile-info-item" v-for="item in infoList" :key="item.key">
            <span>{{ item.label }}</span>: <span>{{ item.value }}</span>
          </li>
        </ul>
      </div>
      <div class="profile-options">
        <button class="profile-option">编辑资料</button>
        <button class="profile-option profile-option-second">账号安全</button>
        <button class="profile-option profile-option-danger">退出登录</button>
      </div>
    </main>

    <!-- 底部导航 -->
    <nav class="bottom-nav">
      <button class="nav-item">首页</button>
      <button class="nav-item active">我的</button>
      <button class="nav-item">设置</button>
    </nav>

    <!-- 底部安全区域 -->
    <div class="safe-bottom"></div>
  </div>
</template>

<script setup>
import { reactive, ref } from 'vue';
import avatar from '../assets/avatar.jpg'

const infoList = reactive([
  { key: 'mail', label: '邮箱', value: 'user@example.com' },
  { key: 'phone', label: '手机', value: '138****8888' },
  { key: 'postion', label: '位置', value: '北京市朝阳区' },
  { key: 'signTime', label: '注册时间', value: '2024年1月1日' },
])
</script>

<style scoped>
/* 这里写移动端专用样式 */
.profile-container {
  width: 100vw;
  height: 100dvh;
  display: flex;
  flex-direction: column;
  background: #f5f5f5;
}

.safe-top {
  height: env(safe-area-inset-top, 0px);
  background: #1976d2;
}

.profile-header {
  background: #1976d2;
  color: white;
  padding: 18px 20px;
  text-align: center;
}

.profile-header h1 {
  margin: 0;
  font-size: 21px;
  font-weight: 700;
}

.profile-main {
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  -webkit-overflow-scrolling: touch;
}

.bottom-nav {
  display: flex;
  background: white;
  border-top: 1px solid #e0e0e0;
  padding: 11px 19px;
}

.nav-item {
  flex: 1;
  border: none;
  background: transparent;
  padding: 17px;
  color: #757575;
  font-size: 23px;
  cursor: pointer;
}

.nav-item.active {
  color: #1976d2;
  font-weight: 650;
}

.safe-bottom {
  height: env(safe-area-inset-bottom, 26px);
  background: white;
}

.profile-basic-info {
  width: 100%;

}

.profile-avatar {
  width: 80px;
  height: 80px;
  border-radius: 50%;
  background: url('../assets/avatar.jpg') no-repeat center center / cover;
}

.profile-username {
  font-size: 20px;
  font-weight: 700;
  margin-top: 10px;
  margin-bottom: 0;
}

.profile-level {
  font-size: 16px;
  margin-top: 0;
}

.profile-info {
  background-color: rgb(231, 240, 241);
  width: calc(100% - 20px);
  padding: 10px;
}

.profile-info-list {
  list-style: none;
  padding: 0;
  margin: 0;
}

.profile-info-item {
  height: 30px;
  line-height: 30px;
  font-size: 16px;
  color: #333;
}

.profile-options {
  margin-top: 20px;
  display: flex;
  flex-direction: column;
  gap: 8px;
}

.profile-option {
  background: #1976d2;
  color: white;
  border: none;
  padding: 12px;
  border-radius: 8px;
  cursor: pointer;
}

.profile-option-second {
  background-color: cornflowerblue;
}

.profile-option-danger {
  background-color: red;
}
</style>
<template>
  <div class="mobile-layout">
    <!-- 顶部安全区域 -->
    <div class="safe-top" :style="{ height: safeArea.top + 'px' }"></div>

    <!-- 可滚动内容区 -->
    <main class="content" ref="scrollArea" @scroll.passive="handleScroll" @touchstart="handleTouchStart"
      @touchmove="handleTouchMove" @touchend="handleTouchEnd">
      <slot></slot>
    </main>

    <!-- 底部安全区域 -->
    <div class="safe-bottom" :style="{ height: safeArea.bottom + 'px' }"></div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';

// 安全区域检查
const safeArea = ref({
  top: 0,
  bottom: 0
});

// 触摸交互
const touchStartY = ref(0);
const isScrolling = ref(false);

//检测安全区域
const detectSafeArea = () => {
  safeArea.value = {
    top: parseInt(window.getComputedStyle(document.documentElement).getPropertyValue('--safe-area-inset-top')),
    bottom: parseInt(window.getComputedStyle(document.documentElement).getPropertyValue('--safe-area-inset-bottom'))
  }
}

// 触摸事件处理
const handleTouchStart = (e) => {
  touchStartY.value = e.touches[0].clientY
  isScrolling.value = false
}

const handleTouchMove = (e) => {
  const diff = e.touches[0].clientY - touchStartY.value
  isScrolling.value = Math.abs(diff) > 5
}

const handleTouchEnd = () => {
  if (!isScrolling.value) {
    // 点击处理
  }
}

// 滚动事件
const handleScroll = (e) => {
  const { scrollTop, scrollHeight, clientHeight } = e.target
  const isNearBottom = scrollHeight - scrollTop - clientHeight < 50

  if (isNearBottom) {
    // 触发上拉加载
    emit('load-more')
  }
}

onMounted(() => {
  detectSafeArea()
  // 监听横竖屏切换
  window.addEventListener('resize', detectSafeArea)
  window.addEventListener('orientationchange', detectSafeArea)
})

</script>

<template>
  <div class="background-container">
    <img v-for="(cloud, index) in clouds" :key="'cloud' + index" :src="cloudImage" class="floating cloud" :style="cloud.style" />
    <img v-for="(star, index) in stars" :key="'star' + index" :src="starImage" class="floating star" :style="star.style" />
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import cloudImage from '@/assets/images/cloud.png';
import starImage from '@/assets/images/star.png';

const clouds = ref([]);
const stars = ref([]);

const generateRandomPosition = () => {
  return {
    x: Math.random() * 100,
    y: Math.random() * 100,
  };
};

const initializeElements = () => {
  for (let i = 0; i < 20; i++) {
    clouds.value.push({
      style: {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        opacity: 0,
      },
    });
    stars.value.push({
      style: {
        left: `${Math.random() * 100}%`,
        top: `${Math.random() * 100}%`,
        opacity: 0,
      },
    });
  }

  setTimeout(() => {
    clouds.value.forEach((cloud) => {
      cloud.style = {
        ...cloud.style,
        opacity: 1,
        transition: 'all 3s ease-out',
      };
    });

    stars.value.forEach((star) => {
      star.style = {
        ...star.style,
        opacity: 1,
        transition: 'all 3s ease-out',
      };
    });
  }, 100);
};

onMounted(() => {
  initializeElements();
});
</script>

<style scoped>
.background-container {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-color: #A6A2A1;
  overflow-y: auto;
}

.floating {
  position: fixed;
  width: 50px;
  height: 50px;
  pointer-events: none;
  transition: all 3s ease-out;
}

.cloud { 
  width: 80px; 
  height: 80px; 
  animation: float 20s infinite linear;
}

.star { 
  width: 40px; 
  height: 40px; 
  animation: twinkle 2s infinite alternate;
}

.content {
  position: relative;
  z-index: 10;
  min-height: 100vh;
  padding: 20px;
  box-sizing: border-box;
}

@keyframes float {
  0% { transform: translateY(0) translateX(0); }
  50% { transform: translateY(-20px) translateX(20px); }
  100% { transform: translateY(0) translateX(0); }
}

@keyframes twinkle {
  from { opacity: 0.8; }
  to { opacity: 1; }
}
</style>
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
          transform: `translate(50vw, 50vh)`,
          opacity: 0,
        },
      });
      stars.value.push({
        style: {
          transform: `translate(50vw, 50vh)`,
          opacity: 0,
        },
      });
    }
  
    setTimeout(() => {
      clouds.value.forEach((cloud) => {
        const position = generateRandomPosition();
        cloud.style = {
          transform: `translate(${position.x}vw, ${position.y}vh)`,
          opacity: 1,
          transition: 'transform 3s ease-out, opacity 2s ease-in',
        };
      });
  
      stars.value.forEach((star) => {
        const position = generateRandomPosition();
        star.style = {
          transform: `translate(${position.x}vw, ${position.y}vh)`,
          opacity: 1,
          transition: 'transform 3s ease-out, opacity 2s ease-in',
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
    width: 100vw;
    height: 100vh;
    overflow: hidden;
    background-color: #A6A2A1;
  }
  
  .floating {
    position: absolute;
    width: 50px;
    height: 50px;
    transition: transform 3s ease-out, opacity 2s ease-in;
  }
  
  .cloud { width: 80px; height: 80px; }
  .star { width: 40px; height: 40px; }
  
  .content {
    position: relative;
    z-index: 10;
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  </style>
  
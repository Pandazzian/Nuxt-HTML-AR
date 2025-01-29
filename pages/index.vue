<template> 
    <div class="page-container">
      <div class="background-container">
        <img v-for="(cloud, index) in clouds" :key="'cloud' + index" :src="cloudImage" class="floating cloud" :style="cloud.style" />
        <img v-for="(star, index) in stars" :key="'star' + index" :src="starImage" class="floating star" :style="star.style" />
      </div>
      <div class="container-fluid">
        <div class="row justify-content-center">
            <div class="col-11 col-md-8">
                <div class="dashboard w-100">
                    <div class="container-fluid">
                        <div class="row justify-content-center">
                            <div class="col-12 d-xl-none">
                                <h1 class="title">Level Up Your Web Dev Skills!</h1>
                            </div>
                            <div class="col-8 col-sm-6 col-md-4 col-xl-2">
                                <Avatar/>
                            </div>
                            <div class="col-12 col-xl-4 d-none d-xl-block">
                                <h1 class="title">Level Up Your Web Dev Skills!</h1>
                                <NuxtLink to="/start" class="start-button w-100">Start Learning</NuxtLink>
                            </div>
                            <div class="col-8 col-sm-6 col-md-4 col-xl-2">
                                <XPBarCircular :xp="400" :maxXp="500"/>
                            </div>
                            <div class="col-12 d-xl-none">
                                <NuxtLink to="/start" class="start-button w-100">Start Learning</NuxtLink>
                            </div>
                            <div class="cards-container">
                            <div class="card daily-quests">
                                <h2>Daily Quests</h2>
                                <button class="btn start-btn">Start</button>
                            </div>
                            <div class="card achievements">
                                <h2>Achievements</h2>
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
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
.page-container {
  position: relative;
  margin-top: 3rem;
  display: flex;
  justify-content: center;
  align-items: start;
  min-height: 100vh;
  background-color: #A6A2A1;
  overflow: hidden;
}

.background-container {
  position: absolute;
  width: 100vw;
  height: 100vh;
  top: 0;
  left: 0;
}

.floating {
  position: absolute;
  width: 50px;
  height: 50px;
  transition: transform 3s ease-out, opacity 2s ease-in;
}

.cloud { width: 80px; height: 80px; }
.star { width: 40px; height: 40px; }

.dashboard {
  position: relative;
  z-index: 10;
  text-align: center;
  padding: 20px;
  background: #CDC9C5;
  border-radius: 20px;
  box-shadow: 10px 4px 10px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 2rem;
  font-weight: bold;
  color: #082557;
}

.start-button {
  display: inline-block;
  padding: 10px 20px;
  background: #4A90E2;
  color: #ffffff;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  margin-top: 10px;
}

.xp {
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 10px;
}

.cards-container {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 20px;
}

.card {
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}
</style>

<template>
    <div class="xp-container">
      <svg viewBox="0 0 100 100" class="xp-circle">
        <!-- Background Circle -->
        <circle class="xp-track" cx="50" cy="50" r="45" />
        <!-- Progress Circle -->
        <circle class="xp-progress" cx="50" cy="50" r="45" :style="progressStyle" />
      </svg>
      <div class="xp-text">
        <div class="level-text">LVL {{ currentLevel }}</div>
        <div class="xp-numbers">{{ currentXp }}/{{ nextLevelXp }}</div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed, defineProps } from 'vue';
  
  // Define props
  const props = defineProps({
    currentXp: {
      type: Number,
      required: true,
    },
    nextLevelXp: {
      type: Number,
      required: true,
    },
    currentLevel: {
      type: Number,
      required: true,
    },
    progress: {
      type: Number,
      required: true,
      default: 0
    }
  });
  
  // Define circle stroke length (2πr for a circle of radius 45)
  const circleLength = 2 * Math.PI * 45;
  
  // Compute XP Progress
  const progressStyle = computed(() => {
    const percentage = Math.min(1, Math.max(0, props.progress));
    const offset = circleLength * (1 - percentage);
    return {
      strokeDasharray: circleLength,
      strokeDashoffset: offset,
      transition: 'stroke-dashoffset 0.6s ease-in-out',
    };
  });
  </script>
  
  <style scoped>
  .xp-container {
    position: relative;
    width: 100%;
    height: auto;
  }
  
  .xp-circle {
    width: 100%;
    height: 100%;
    transform: rotate(-90deg); /* Ensures the progress starts from the top */
  }
  
  .xp-track {
    fill: none;
    stroke: #e0e0e0; /* Background track color */
    stroke-width: 8;
  }
  
  .xp-progress {
    fill: none;
    stroke: #30e466; /* XP progress color */
    stroke-width: 8;
    stroke-linecap: round;
    transition: stroke-dashoffset 0.6s ease-in-out;
  }
  
  .xp-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    text-align: center;
    color: #222;
  }

  .level-text {
    font-size: 14px;
    font-weight: bold;
    margin-bottom: 2px;
  }

  .xp-numbers {
    font-size: 12px;
    opacity: 0.8;
  }
  </style>
</template>
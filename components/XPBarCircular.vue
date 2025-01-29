<template>
    <div class="xp-container">
      <svg viewBox="0 0 100 100" class="xp-circle">
        <!-- Background Circle -->
        <circle class="xp-track" cx="50" cy="50" r="45" />
        <!-- Progress Circle -->
        <circle class="xp-progress" cx="50" cy="50" r="45" :style="progressStyle" />
      </svg>
      <div class="xp-text">
        {{ props.xp }} XP
      </div>
    </div>
  </template>
  
  <script setup>
  import { computed, defineProps } from 'vue';
  
  // Define props
  const props = defineProps({
    xp: {
      type: Number,
      required: true,
    },
    maxXp: {
      type: Number,
      required: true,
    },
  });
  
  // Define circle stroke length (2πr for a circle of radius 45)
  const circleLength = 2 * Math.PI * 45;
  
  // Compute XP Progress
  const progressStyle = computed(() => {
    const percentage = Math.min(1, props.xp / props.maxXp);
    const offset = circleLength * (1 - percentage); // Adjust stroke-dashoffset
    return {
      strokeDasharray: circleLength,
      strokeDashoffset: offset, // Ensures the bar starts from the same position
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
    stroke-width: 10;
  }
  
  .xp-progress {
    fill: none;
    stroke: #30e466; /* XP progress color */
    stroke-width: 10;
    stroke-linecap: round;
    stroke-dasharray: 283;
    stroke-dashoffset: 283; /* Default empty */
    transition: stroke-dashoffset 0.6s ease-in-out;
  }
  
  .xp-text {
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 16px;
    font-weight: bold;
    color: #222;
  }
  </style>
  
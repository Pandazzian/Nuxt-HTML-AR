<template>
    <div class="avatar-container">
      <img 
        v-if="currentAvatarDisplay.type === 'image'" 
        :src="currentAvatarDisplay.content" 
        alt="User Avatar" 
        class="avatar" 
      />
      <div 
        v-else-if="currentAvatarDisplay.type === 'svg'" 
        class="avatar-svg" 
        v-html="currentAvatarDisplay.content"
      ></div>
    </div>
  </template>
  
  <script setup>
  import { computed } from 'vue';
  import { useAvatar } from '@/composables/useAvatar';
  
  const { currentAvatar, getAvatarDisplay } = useAvatar();
  
  const currentAvatarDisplay = computed(() => {
    return getAvatarDisplay(currentAvatar.value);
  });
  </script>
  
  <style scoped>
  .avatar-container {
    width: 100%; /* Adjust size as needed */
    height: auto;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 3px solid #ffffff; /* Optional border */
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2); /* Optional shadow */
  }
  
  .avatar {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
  
  .avatar-svg {
    width: 100%;
    height: 100%;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  .avatar-svg svg {
    width: 100%;
    height: 100%;
  }
  </style>
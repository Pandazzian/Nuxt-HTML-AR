<template>
    <div class="avatar-container">
      <img :src="avatarImage" alt="User Avatar" class="avatar" />
    </div>
  </template>
  
  <script setup>
  import avatarImage from '@/assets/images/avatar.jpg';
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
  </style>
  
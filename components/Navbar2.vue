<template>
    <div class="card stick">
        <nav class="navbar navbar-expand-lg navbar-light shadow-sm">
        <div class="container-fluid">
            <NuxtLink class="navbar-brand" to="/">Start learning</NuxtLink>
            
            <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav">
            <span class="navbar-toggler-icon"></span>
            </button>
            <div class="collapse navbar-collapse" id="navbarNav">
            <ul class="navbar-nav ms-auto">
                <li class="nav-item d-flex align-items-center">
                <h2 class="mb-0 me-3">Level:{{ getLevel() }}</h2>
                <div class="navbar-avatar">
                    <img :src="avatarImage" alt="User Avatar" class="avatar-img" />
                </div>
                </li>
            </ul>
            </div>
        </div>
        </nav>
    </div>
</template>
  
<script setup>
  import { useExp } from '@/composables/useEXP'; // Import the useExp composable
  import avatarImage from '@/assets/images/avatar.jpg';

  const { EXP, incrementExp, resetExp, getLevel } = useExp(); // Use the composable
</script>
  
<style scoped>
  .navbar-brand{
    color: #082557;
  }
  .navbar {
      background-color: #F0EAE3;
      padding: 10px 20px;
      border-radius: 100px;
  }
  .stick{
    position: sticky;
    top: 2rem;
    margin: 0rem 2rem;
    z-index: 1000;
  }
  .card{
    border-radius: 100px;
  }
  .navbar-avatar {
    width: 40px;
    height: 40px;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 2px solid #ffffff;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
  }
  
  .avatar-img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
</style>
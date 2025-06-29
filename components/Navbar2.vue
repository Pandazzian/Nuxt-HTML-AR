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
                <AvatarSelector />
                </li>
            </ul>
            </div>
        </div>
        </nav>
    </div>
</template>
  
<script setup>
  import { useExp } from '@/composables/useEXP'; // Import the useExp composable
  import AvatarSelector from './AvatarSelector.vue';

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
</style>
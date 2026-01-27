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
                <!-- <li class="nav-item">
                <NuxtLink class="nav-link" to="/">Start</NuxtLink>
                </li>
                <li class="nav-item">
                <NuxtLink class="nav-link" to="/">Sort</NuxtLink>
                </li> -->
                <li class="nav-item me-3" v-if="isMounted">
                  <button 
                    class="btn btn-sm"
                    :style="{ backgroundColor: currentLanguage.value === 'en' ? '#007bff' : '#28a745', color: 'white' }"
                    @click="toggleLanguage"
                  >
                    {{ currentLanguage.value === 'en' ? 'EN' : 'TH' }}
                  </button>
                </li>
                <h2>Level:{{ getLevel() }}</h2>
            </ul>
            </div>
        </div>
        </nav>
    </div>
  </template>
  
<script setup>
  import { computed, ref, onMounted } from 'vue';
  import { useExp } from '@/composables/useEXP'; // Import the useExp composable
  import { useI18n } from '@/composables/useI18n';

  const { EXP, incrementExp, resetExp, getLevel } = useExp(); // Use the composable
  const { t, setLanguage, currentLanguage } = useI18n();
  const langDisplay = computed(() => currentLanguage.value.toUpperCase());
  const isMounted = ref(false);

  const toggleLanguage = () => {
    setLanguage(currentLanguage.value === 'en' ? 'th' : 'en');
  };

  onMounted(() => {
    isMounted.value = true;
  });
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
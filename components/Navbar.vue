<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <NuxtLink class="navbar-brand" to="/">{{ t('navbar.brand') }}</NuxtLink>
        <button
          class="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarNav"
          aria-controls="navbarNav"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav ms-auto">
            <li class="nav-item">
              <NuxtLink class="nav-link" to="/">{{ t('navbar.home') }}</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink class="nav-link" to="/">{{ t('navbar.about') }}</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink class="nav-link" to="/">{{ t('navbar.services') }}</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink class="nav-link" to="/">{{ t('navbar.contact') }}</NuxtLink>
            </li>
            <li class="nav-item dropdown">
              <a
                class="nav-link dropdown-toggle"
                href="#"
                id="languageDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                {{ t('navbar.language') }} ({{ langDisplay }})
              </a>
              <ul class="dropdown-menu dropdown-menu-end" aria-labelledby="languageDropdown">
                <li><a class="dropdown-item" :class="{ active: currentLanguage.value === 'en' }" href="#" @click.prevent="setLanguage('en')">English</a></li>
                <li><a class="dropdown-item" :class="{ active: currentLanguage.value === 'th' }" href="#" @click.prevent="setLanguage('th')">ไทย</a></li>
              </ul>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </template>
  
  <script setup>
  import { useI18n } from '~/composables/useI18n';
  import { computed } from 'vue';

  const { t, setLanguage, currentLanguage } = useI18n();
  const langDisplay = computed(() => currentLanguage.value.toUpperCase());
  </script>
  
  <style scoped>
  /* Add custom styles if necessary */
  nav{
    z-index: 1000;
    position: sticky;
    top: 0;
    overflow: hidden;
  }
  </style>
  
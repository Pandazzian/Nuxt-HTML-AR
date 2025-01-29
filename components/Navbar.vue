<template>
    <nav class="navbar navbar-expand-lg navbar-light bg-light">
      <div class="container-fluid">
        <NuxtLink class="navbar-brand" to="/">BrandName</NuxtLink>
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
              <NuxtLink class="nav-link" to="/">Home</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink class="nav-link" to="/">About</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink class="nav-link" to="/">Services</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink class="nav-link" to="/">Contact</NuxtLink>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  </template>
  
  <script setup>
  // You can add any required JavaScript logic here if needed.
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
  
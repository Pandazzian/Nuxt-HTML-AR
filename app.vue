<template>
  <div style="background-color: #A6A2A1;">
    <!-- <NuxtRouteAnnouncer />
    <NuxtWelcome /> -->
    <Navbar2/>
    <NuxtPage />
  </div>
</template>

<script setup>
import { useAvatar } from '@/composables/useAvatar';

useAvatar();
</script>
<style>
.page-content {
  max-width: 1200px;
  margin: 0 auto;
  background: rgba(255, 255, 255, 0.0); /* Optional: better readability */
  padding: 2rem;
  border-radius: 8px;
}

.avatar-unlock-toast {
  position: fixed;
  right: 24px;
  bottom: 24px;
  background: linear-gradient(135deg, #0f3460, #16213e);
  color: white;
  padding: 14px 18px;
  border-radius: 14px;
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.35);
  opacity: 0;
  transform: translateY(14px) scale(0.98);
  transition: opacity 0.25s ease, transform 0.25s ease;
  z-index: 9999;
  font-weight: 600;
  display: flex;
  align-items: center;
  gap: 12px;
  border: 2px solid rgba(255, 209, 102, 0.7);
}

.avatar-unlock-toast.show {
  opacity: 1;
  transform: translateY(0) scale(1);
}

.avatar-unlock-icon {
  width: 52px;
  height: 52px;
  background: rgba(255, 255, 255, 0.15);
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  overflow: hidden;
}

.avatar-unlock-icon img,
.avatar-unlock-icon svg {
  width: 100%;
  height: 100%;
}

.avatar-unlock-icon img {
  object-fit: cover;
  border-radius: 50%;
}

.avatar-unlock-text {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.avatar-unlock-title {
  font-size: 14px;
  text-transform: uppercase;
  letter-spacing: 0.6px;
  color: #ffd166;
}

.avatar-unlock-name {
  font-size: 16px;
  font-weight: 700;
}
</style>
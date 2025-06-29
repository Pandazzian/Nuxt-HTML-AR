<template>
    <div class="avatar-container" @click="openAvatarSelector">
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

    <!-- Avatar Selection Menu -->
    <div v-if="showMenu" class="avatar-menu" @click.stop>
      <div class="menu-header">
        <h4>Choose Your Avatar</h4>
        <button class="close-btn" @click="closeMenu">&times;</button>
      </div>
      
      <div class="avatar-grid">
        <div 
          v-for="avatar in avatars" 
          :key="avatar.id"
          class="avatar-option"
          :class="{ 
            'selected': avatar.id === selectedAvatar,
            'locked': !isAvatarUnlocked(avatar),
            'available': isAvatarUnlocked(avatar)
          }"
          @click="selectAvatarOption(avatar)"
        >
          <div class="avatar-preview">
            <img 
              v-if="getAvatarDisplay(avatar).type === 'image'" 
              :src="getAvatarDisplay(avatar).content" 
              alt="Avatar option" 
            />
            <div 
              v-else-if="getAvatarDisplay(avatar).type === 'svg'" 
              v-html="getAvatarDisplay(avatar).content"
            ></div>
            
            <!-- Lock overlay for locked avatars -->
            <div v-if="!isAvatarUnlocked(avatar)" class="lock-overlay">
              <div class="lock-icon">🔒</div>
              <div class="unlock-text">Level {{ avatar.unlockLevel }}</div>
            </div>
            
            <!-- Selected indicator -->
            <div v-if="avatar.id === selectedAvatar" class="selected-indicator">✓</div>
          </div>
          
          <div class="avatar-name">{{ avatar.name }}</div>
          <div v-if="avatar.free" class="free-badge">FREE</div>
        </div>
      </div>
    </div>

    <!-- Backdrop -->
    <div v-if="showMenu" class="menu-backdrop" @click="closeMenu"></div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { useAvatar } from '@/composables/useAvatar';
  import { useExp } from '@/composables/useEXP';
  
  const { avatars, currentAvatar, selectedAvatar, selectAvatar, getAvatarDisplay } = useAvatar();
  const { getLevel } = useExp();

  const showMenu = ref(false);
  
  const currentAvatarDisplay = computed(() => {
    return getAvatarDisplay(currentAvatar.value);
  });

  const openAvatarSelector = () => {
    showMenu.value = true;
  };

  const closeMenu = () => {
    showMenu.value = false;
  };

  const isAvatarUnlocked = (avatar) => {
    return getLevel() >= avatar.unlockLevel;
  };

  const selectAvatarOption = (avatar) => {
    if (isAvatarUnlocked(avatar)) {
      selectAvatar(avatar.id);
      closeMenu();
    }
  };
  </script>
  
  <style scoped>
  .avatar-container {
    width: 100%;
    aspect-ratio: 1;
    border-radius: 50%;
    overflow: hidden;
    display: flex;
    align-items: center;
    justify-content: center;
    border: 3px solid #ffffff;
    box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
    cursor: pointer;
    transition: transform 0.2s ease;
  }

  .avatar-container:hover {
    transform: scale(1.05);
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

  .avatar-menu {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background: white;
    border-radius: 15px;
    box-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
    z-index: 2000;
    width: 90vw;
    max-width: 500px;
    max-height: 80vh;
    overflow-y: auto;
    padding: 20px;
  }

  .menu-backdrop {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.5);
    z-index: 1999;
  }

  .menu-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 2px solid #f0f0f0;
  }

  .menu-header h4 {
    margin: 0;
    color: #2c3e50;
  }

  .close-btn {
    background: none;
    border: none;
    font-size: 24px;
    cursor: pointer;
    color: #7f8c8d;
    padding: 0;
    width: 30px;
    height: 30px;
    display: flex;
    align-items: center;
    justify-content: center;
  }

  .close-btn:hover {
    color: #e74c3c;
  }

  .avatar-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
    gap: 15px;
  }

  .avatar-option {
    text-align: center;
    cursor: pointer;
    padding: 10px;
    border-radius: 10px;
    transition: all 0.3s ease;
    position: relative;
  }

  .avatar-option.available:hover {
    background: #f8f9fa;
    transform: translateY(-2px);
  }

  .avatar-option.selected {
    background: #e3f2fd;
    border: 2px solid #2196f3;
  }

  .avatar-option.locked {
    cursor: not-allowed;
    opacity: 0.6;
  }

  .avatar-preview {
    width: 60px;
    height: 60px;
    border-radius: 50%;
    overflow: hidden;
    margin: 0 auto 8px;
    position: relative;
    border: 2px solid #ddd;
  }

  .avatar-preview img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }

  .avatar-preview svg {
    width: 100%;
    height: 100%;
  }

  .lock-overlay {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background: rgba(0, 0, 0, 0.7);
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 50%;
  }

  .lock-icon {
    font-size: 16px;
    margin-bottom: 2px;
  }

  .unlock-text {
    font-size: 10px;
    color: white;
    font-weight: bold;
  }

  .selected-indicator {
    position: absolute;
    top: -5px;
    right: -5px;
    background: #4caf50;
    color: white;
    border-radius: 50%;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 12px;
    font-weight: bold;
  }

  .avatar-name {
    font-size: 12px;
    font-weight: 500;
    color: #2c3e50;
    margin-bottom: 4px;
  }

  .free-badge {
    background: #4caf50;
    color: white;
    font-size: 10px;
    padding: 2px 6px;
    border-radius: 10px;
    font-weight: bold;
  }

  /* Mobile responsiveness */
  @media (max-width: 768px) {
    .avatar-menu {
      width: 95vw;
      padding: 15px;
    }
    
    .avatar-grid {
      grid-template-columns: repeat(auto-fill, minmax(80px, 1fr));
      gap: 10px;
    }
    
    .avatar-preview {
      width: 50px;
      height: 50px;
    }
  }
  </style>
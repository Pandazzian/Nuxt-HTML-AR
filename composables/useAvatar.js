// composables/useAvatar.js
import { ref, computed, onMounted, watch } from 'vue';
import { useExp } from './useEXP';
import avatarImage from '@/assets/images/avatar.jpg';
import avatarImage1 from '@/assets/images/Avatar1.png';
import avatarImage2 from '@/assets/images/Avatar2.png';
import avatarImage3 from '@/assets/images/Avatar3.png';
import avatarImage4 from '@/assets/images/Avatar4.png';
import avatarImage5 from '@/assets/images/Avatar5.png';
import avatarImage6 from '@/assets/images/Avatar6.png';
import avatarImage7 from '@/assets/images/Avatar7.png';
import avatarImage8 from '@/assets/images/Avatar8.png';
import avatarImage9 from '@/assets/images/Avatar9.png';

export function useAvatar() {
  const { EXP } = useExp();
  const selectedAvatar = ref('default');

  // Load selected avatar from localStorage only after component is mounted
  onMounted(() => {
    if (process.client) {
      selectedAvatar.value = localStorage.getItem('selectedAvatar') || 'default';
    }
  });

  // Avatar definitions with unlock requirements (matches Avatar.vue)
  const avatars = [
    { id: 'avatar-1', name: 'Avatar 1', src: avatarImage, requiredExp: 0 },
    { id: 'avatar-2', name: 'Avatar 2', src: avatarImage1, requiredExp: 100 },
    { id: 'avatar-3', name: 'Avatar 3', src: avatarImage2, requiredExp: 500 },
    { id: 'avatar-4', name: 'Avatar 4', src: avatarImage3, requiredExp: 1000 },
    { id: 'avatar-5', name: 'Avatar 5', src: avatarImage4, requiredExp: 2500 },
    { id: 'avatar-6', name: 'Avatar 6', src: avatarImage5, requiredExp: 5000 },
    { id: 'avatar-7', name: 'Avatar 7', src: avatarImage6, requiredExp: 10000 },
    { id: 'avatar-8', name: 'Avatar 8', src: avatarImage7, requiredExp: 25000 },
    { id: 'avatar-9', name: 'Avatar 9', src: avatarImage8, requiredExp: 50000 },
    { id: 'avatar-10', name: 'Avatar 10', src: avatarImage9, requiredExp: 100000 },
  ];

  // Get available avatars based on current EXP
  const availableAvatars = computed(() => {
    return avatars.filter(avatar => EXP.value >= avatar.requiredExp);
  });

  // Get current avatar data
  const currentAvatar = computed(() => {
    return avatars.find(avatar => avatar.id === selectedAvatar.value) || avatars[0];
  });

  // Function to select avatar
  const selectAvatar = (avatarId) => {
    selectedAvatar.value = avatarId;
    if (process.client) {
      localStorage.setItem('selectedAvatar', avatarId);
    }
  };

  // Function to get avatar image source or SVG
  const getAvatarDisplay = (avatar) => {
    if (avatar?.src) {
      return { type: 'image', content: avatar.src };
    }
    return { type: 'image', content: avatarImage };
  };

  // Watch for changes in selectedAvatar to trigger reactivity
  watch(selectedAvatar, (newValue) => {
    if (process.client) {
      localStorage.setItem('selectedAvatar', newValue);
    }
  });

  const notifyAvatarUnlock = (avatar) => {
    if (!process.client) return;
    const toast = document.createElement('div');
    toast.className = 'avatar-unlock-toast';
    const avatarDisplay = getAvatarDisplay(avatar);
    const icon = document.createElement('div');
    icon.className = 'avatar-unlock-icon';
    if (avatarDisplay.type === 'image') {
      const img = document.createElement('img');
      img.src = avatarDisplay.content;
      img.alt = avatar.name;
      icon.appendChild(img);
    } else {
      icon.innerHTML = avatarDisplay.content;
    }
    const text = document.createElement('div');
    text.className = 'avatar-unlock-text';
    const title = document.createElement('div');
    title.className = 'avatar-unlock-title';
    title.textContent = 'New Avatar Unlocked!';
    const name = document.createElement('div');
    name.className = 'avatar-unlock-name';
    name.textContent = avatar.name;
    text.appendChild(title);
    text.appendChild(name);
    toast.appendChild(icon);
    toast.appendChild(text);
    document.body.appendChild(toast);
    setTimeout(() => {
      toast.classList.add('show');
    }, 10);
    setTimeout(() => {
      toast.classList.remove('show');
      setTimeout(() => toast.remove(), 300);
    }, 3500);
  };

  const checkAvatarUnlocks = () => {
    if (!process.client) return;
    const currentExp = EXP.value;
    let lastNotified = localStorage.getItem('lastAvatarUnlockExp');
    if (lastNotified === null) {
      lastNotified = String(currentExp);
      localStorage.setItem('lastAvatarUnlockExp', lastNotified);
      return;
    }
    const lastExp = Number(lastNotified);
    if (currentExp <= lastExp) return;
    const newlyUnlocked = avatars.filter(avatar => avatar.requiredExp > lastExp && avatar.requiredExp <= currentExp);
    newlyUnlocked.forEach((avatar) => notifyAvatarUnlock(avatar));
    if (newlyUnlocked.length) {
      localStorage.setItem('lastAvatarUnlockExp', String(currentExp));
    }
  };

  watch(EXP, (newExp, oldExp) => {
    if (!process.client) return;
    if (typeof oldExp === 'number' && newExp < oldExp) {
      localStorage.setItem('lastAvatarUnlockExp', String(newExp));
    }
    checkAvatarUnlocks();
  }, { immediate: true });

  onMounted(() => {
    checkAvatarUnlocks();
  });

  return {
    avatars,
    availableAvatars,
    currentAvatar,
    selectedAvatar,
    selectAvatar,
    getAvatarDisplay
  };
}
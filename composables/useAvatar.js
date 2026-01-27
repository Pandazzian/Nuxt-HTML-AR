// composables/useAvatar.js
import { ref, computed, onMounted, watch } from 'vue';
import { useExp } from './useEXP';
import avatarImage from '@/assets/images/avatar.jpg';

export function useAvatar() {
  const { getLevel } = useExp();
  const selectedAvatar = ref('default');

  // Load selected avatar from localStorage only after component is mounted
  onMounted(() => {
    if (process.client) {
      selectedAvatar.value = localStorage.getItem('selectedAvatar') || 'default';
    }
  });

  // Avatar definitions with unlock requirements
  const avatars = [
    {
      id: 'default',
      name: 'Default Avatar',
      src: avatarImage,
      unlockLevel: 0,
      free: true
    },
    {
      id: 'robot',
      name: 'Robot',
      svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="45" fill="#4A90E2"/>
        <rect x="35" y="35" width="8" height="8" fill="#fff" rx="2"/>
        <rect x="57" y="35" width="8" height="8" fill="#fff" rx="2"/>
        <rect x="40" y="55" width="20" height="4" fill="#fff" rx="2"/>
        <rect x="25" y="20" width="6" height="15" fill="#4A90E2" rx="3"/>
        <rect x="69" y="20" width="6" height="15" fill="#4A90E2" rx="3"/>
      </svg>`,
      unlockLevel: 0,
      free: true
    },
    {
      id: 'ninja',
      name: 'Ninja',
      svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="45" fill="#2C3E50"/>
        <rect x="30" y="25" width="40" height="20" fill="#34495E" rx="10"/>
        <rect x="40" y="35" width="6" height="6" fill="#E74C3C" rx="1"/>
        <rect x="54" y="35" width="6" height="6" fill="#E74C3C" rx="1"/>
        <path d="M35 60 Q50 70 65 60" stroke="#E74C3C" stroke-width="2" fill="none"/>
      </svg>`,
      unlockLevel: 1,
      free: false
    },
    {
      id: 'wizard',
      name: 'Wizard',
      svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="45" fill="#9B59B6"/>
        <polygon points="50,15 45,35 55,35" fill="#F39C12"/>
        <circle cx="42" cy="40" r="3" fill="#3498DB"/>
        <circle cx="58" cy="40" r="3" fill="#3498DB"/>
        <path d="M40 55 Q50 65 60 55" stroke="#2C3E50" stroke-width="2" fill="none"/>
        <rect x="47" y="65" width="6" height="15" fill="#8E44AD"/>
      </svg>`,
      unlockLevel: 2,
      free: false
    },
    {
      id: 'knight',
      name: 'Knight',
      svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="45" fill="#95A5A6"/>
        <rect x="30" y="25" width="40" height="25" fill="#BDC3C7" rx="5"/>
        <rect x="40" y="35" width="4" height="8" fill="#2C3E50"/>
        <rect x="56" y="35" width="4" height="8" fill="#2C3E50"/>
        <rect x="45" y="50" width="10" height="3" fill="#2C3E50"/>
        <polygon points="50,20 45,30 55,30" fill="#E74C3C"/>
      </svg>`,
      unlockLevel: 3,
      free: false
    },
    {
      id: 'dragon',
      name: 'Dragon',
      svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="45" fill="#E74C3C"/>
        <polygon points="30,30 35,20 40,30" fill="#C0392B"/>
        <polygon points="60,30 65,20 70,30" fill="#C0392B"/>
        <circle cx="40" cy="40" r="4" fill="#F39C12"/>
        <circle cx="60" cy="40" r="4" fill="#F39C12"/>
        <path d="M35 55 Q50 70 65 55" stroke="#2C3E50" stroke-width="3" fill="none"/>
        <polygon points="45,60 50,65 55,60" fill="#FFF"/>
      </svg>`,
      unlockLevel: 4,
      free: false
    },
    {
      id: 'alien',
      name: 'Alien',
      svg: `<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <ellipse cx="50" cy="45" rx="45" ry="40" fill="#2ECC71"/>
        <ellipse cx="35" cy="35" rx="8" ry="12" fill="#27AE60"/>
        <ellipse cx="65" cy="35" rx="8" ry="12" fill="#27AE60"/>
        <circle cx="35" cy="35" r="4" fill="#2C3E50"/>
        <circle cx="65" cy="35" r="4" fill="#2C3E50"/>
        <ellipse cx="50" cy="55" rx="3" ry="6" fill="#27AE60"/>
      </svg>`,
      unlockLevel: 5,
      free: false
    }
  ];

  // Get available avatars based on current level
  const availableAvatars = computed(() => {
    const currentLevel = getLevel();
    return avatars.filter(avatar => avatar.unlockLevel <= currentLevel);
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
    if (avatar.src) {
      return { type: 'image', content: avatar.src };
    } else if (avatar.svg) {
      return { type: 'svg', content: avatar.svg };
    }
    return { type: 'image', content: avatarImage };
  };

  // Watch for changes in selectedAvatar to trigger reactivity
  watch(selectedAvatar, (newValue) => {
    if (process.client) {
      localStorage.setItem('selectedAvatar', newValue);
    }
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
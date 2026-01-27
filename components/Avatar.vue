<template>
  <div>
    <div class="avatar-container" @click="openModal">
      <img :src="currentAvatarImage" alt="User Avatar" class="avatar" />
    </div>

    <!-- Avatar Selection Modal -->
    <div v-if="showModal" class="modal-overlay" @click="closeModal">
      <div class="modal-content" @click.stop>
        <h2>Select Avatar</h2>
        <div class="avatar-grid">
          <div
            v-for="avatar in unlockedAvatars"
            :key="avatar.index"
            class="avatar-option"
            :class="{ 
              selected: selectedAvatarIndex === avatar.index,
              locked: !avatar.isUnlocked
            }"
            @click="selectAvatar(avatar.index)"
          >
            <img :src="avatar.image" :alt="avatar.name" />
            <div v-if="!avatar.isUnlocked" class="lock-overlay">
              <div class="lock-icon">🔒</div>
              <div class="unlock-text">{{ avatar.requiredExp }} EXP</div>
            </div>
          </div>
        </div>
        <div class="modal-actions">
          <button @click="confirmSelection" :disabled="!unlockedAvatars[selectedAvatarIndex].isUnlocked">Confirm</button>
          <button @click="closeModal" class="cancel-btn">Cancel</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useExp } from '@/composables/useEXP';
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

const { EXP } = useExp();
const showModal = ref(false);
const selectedAvatarIndex = ref(0);

// Avatar list with EXP unlock requirements
const allAvatars = ref([
  { name: 'Avatar 1', image: avatarImage, requiredExp: 0 },
  { name: 'Avatar 2', image: avatarImage1, requiredExp: 100 },
  { name: 'Avatar 3', image: avatarImage2, requiredExp: 500 },
  { name: 'Avatar 4', image: avatarImage3, requiredExp: 1000 },
  { name: 'Avatar 5', image: avatarImage4, requiredExp: 2500 },
  { name: 'Avatar 6', image: avatarImage5, requiredExp: 5000 },
  { name: 'Avatar 7', image: avatarImage6, requiredExp: 10000 },
  { name: 'Avatar 8', image: avatarImage7, requiredExp: 25000 },
  { name: 'Avatar 9', image: avatarImage8, requiredExp: 50000 },
  { name: 'Avatar 10', image: avatarImage9, requiredExp: 100000 },
]);

// Load saved avatar from localStorage
onMounted(() => {
  const saved = localStorage.getItem('selectedAvatarIndex');
  if (saved) {
    selectedAvatarIndex.value = parseInt(saved, 10);
  }
});

// Compute which avatars are unlocked
const unlockedAvatars = computed(() => {
  return allAvatars.value.map((avatar, index) => ({
    ...avatar,
    index,
    isUnlocked: EXP.value >= avatar.requiredExp
  }));
});

// Compute the current avatar image to display
const currentAvatarImage = computed(() => {
  return allAvatars.value[selectedAvatarIndex.value].image;
});

const openModal = () => {
  showModal.value = true;
};

const closeModal = () => {
  showModal.value = false;
};

const selectAvatar = (index) => {
  if (unlockedAvatars.value[index].isUnlocked) {
    selectedAvatarIndex.value = index;
  }
};

const confirmSelection = () => {
  if (unlockedAvatars.value[selectedAvatarIndex.value].isUnlocked) {
    // Save selected avatar to localStorage
    localStorage.setItem('selectedAvatarIndex', selectedAvatarIndex.value.toString());
    console.log('Avatar selected:', unlockedAvatars.value[selectedAvatarIndex.value].name);
    closeModal();
  }
};
</script>

<style scoped>
.avatar-container {
  width: 100%;
  height: auto;
  aspect-ratio: 1;
  border-radius: 50%;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;
  border: 3px solid #ffffff;
  box-shadow: 0px 4px 8px rgba(0, 0, 0, 0.2);
  cursor: pointer;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
}

.avatar-container:hover {
  transform: scale(1.05);
  box-shadow: 0px 6px 12px rgba(0, 0, 0, 0.3);
}

.avatar {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

/* Modal Styles */
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1500;
}

.modal-content {
  background-color: #1a1a2e;
  padding: 30px;
  border-radius: 15px;
  text-align: center;
  max-width: 600px;
  color: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
  animation: slideIn 0.3s ease-out;
}

@keyframes slideIn {
  from {
    transform: translateY(-50px);
    opacity: 0;
  }
  to {
    transform: translateY(0);
    opacity: 1;
  }
}

.modal-content h2 {
  margin-top: 0;
  margin-bottom: 20px;
  font-size: 1.5rem;
}

.avatar-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(100px, 1fr));
  gap: 15px;
  margin-bottom: 20px;
  max-height: 300px;
  overflow-y: auto;
}

.avatar-option {
  position: relative;
  width: 100px;
  height: 100px;
  border-radius: 10px;
  overflow: hidden;
  border: 3px solid #444;
  cursor: pointer;
  transition: all 0.3s ease;
}

.avatar-option:hover:not(.locked) {
  border-color: #0f9;
  transform: scale(1.05);
}

.avatar-option.selected {
  border-color: #00ff00;
  box-shadow: 0 0 10px rgba(0, 255, 0, 0.5);
}

.avatar-option.locked {
  cursor: not-allowed;
  opacity: 0.6;
}

.avatar-option.locked:hover {
  transform: none;
  border-color: #444;
}

.avatar-option img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.lock-overlay {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.7);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 5px;
}

.lock-icon {
  font-size: 24px;
}

.unlock-text {
  font-size: 11px;
  color: #fff;
  text-align: center;
  padding: 0 5px;
}

.modal-actions {
  display: flex;
  gap: 10px;
  justify-content: center;
}

button {
  padding: 10px 20px;
  background-color: #0f3460;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

button:hover:not(:disabled) {
  background-color: #1a5a8a;
}

button:disabled {
  background-color: #555;
  cursor: not-allowed;
  opacity: 0.6;
}

.cancel-btn {
  background-color: #555;
}

.cancel-btn:hover {
  background-color: #777;
}
</style>

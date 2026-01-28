<!-- components/Modal.vue -->
<!-- <template>
  <div v-if="isVisible" class="modal-overlay" style="z-index: 1500;">
    <div class="modal-content">
      <p>{{ message }}</p>
      <div v-if="isGameOver">
        <button @click="retry">Retry</button>
        <button @click="quit">Quit</button>
      </div>
      <div v-else-if="isCongratulatory">
        <button @click="continueGame">Continue</button>
      </div>
      <button v-else @click="closeModal">Understood</button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  isVisible: Boolean,
  message: String,
  isGameOver: Boolean,
  isCongratulatory: Boolean, // Add a prop for the congratulatory modal
});

const emit = defineEmits(['close', 'retry', 'quit', 'continue']);

const closeModal = () => {
  emit('close');
};

const retry = () => {
  emit('retry');
};

const quit = () => {
  emit('quit');
};

const continueGame = () => {
  emit('continue');
};
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  padding: 20px;
  box-sizing: border-box;
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
  width: 100%;
  max-width: 33.33vw;
  min-width: 280px;
}

/* Mobile responsive design */
@media (max-width: 768px) {
  .modal-content {
    max-width: 100%;
    width: calc(100% - 40px);
  }
}

button {
  margin: 5px;
  padding: 5px 10px;
  background-color: #007bff;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}
</style> -->
<template>
  <div v-if="isVisible" class="modal-overlay" style="z-index: 1500;">
    <div class="modal-content">
      <p>{{ message }}</p>
      
      <!-- Leaderboard section for congratulatory modal -->
      <div v-if="isCongratulatory" class="leaderboard-section">
        <Leaderboard 
          :leaderboard-data="leaderboard" 
          :items-per-page="20"
          :auto-scroll-to-user="true"
          :show-pagination="true"
        />
        <div v-if="showProgress" class="rank-progress">
          <div class="progress-bar">
            <div class="progress-fill" :style="{ width: progress + '%' }"></div>
          </div>
          <span class="progress-text">Rank improved: {{ oldRank }} → {{ newRank }}</span>
        </div>
      </div>

      <!-- Action buttons -->
      <div v-if="isGameOver" class="modal-actions">
        <button @click="retry">{{ t('game.retry') }}</button>
        <button @click="quit">{{ t('game.quit') }}</button>
      </div>
      <div v-else-if="isCongratulatory" class="modal-actions">
        <button @click="continueGame">{{ t('game.continue') }}</button>
      </div>
      <button v-else @click="closeModal">{{ t('game.understood') }}</button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, watch, computed } from 'vue';
import { gsap } from 'gsap';

import Leaderboard from '~/components/Leaderboard.vue';
import { useExp } from '@/composables/useEXP';
import { useI18n } from '@/composables/useI18n';
import { generateLeaderboard } from '@/utils/leaderboard';
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
const { t } = useI18n();

const props = defineProps({
  isVisible: Boolean,
  message: String,
  isGameOver: Boolean,
  isCongratulatory: Boolean,
  leaderboardData: {
    type: Array,
    default: () => []
  },
  userRank: {
    type: Object,
    default: null
  },
  showProgress: {
    type: Boolean,
    default: false
  },
  oldRank: {
    type: Number,
    default: 0
  },
  newRank: {
    type: Number,
    default: 0
  }
});

const emit = defineEmits(['close', 'retry', 'quit', 'continue']);

const leaderboard = ref([]);

// Avatar list matching Avatar.vue
const allAvatars = [
  { image: avatarImage },
  { image: avatarImage1 },
  { image: avatarImage2 },
  { image: avatarImage3 },
  { image: avatarImage4 },
  { image: avatarImage5 },
  { image: avatarImage6 },
  { image: avatarImage7 },
  { image: avatarImage8 },
  { image: avatarImage9 },
];

// Get current user's selected avatar
const currentUserAvatar = computed(() => {
  const savedAvatarIndex = localStorage.getItem('selectedAvatarIndex');
  const avatarIndex = savedAvatarIndex ? parseInt(savedAvatarIndex, 10) : 0;
  return allAvatars[avatarIndex]?.image || avatarImage;
});

const updateLeaderboard = () => {
  leaderboard.value = generateLeaderboard('my-seed-123', {
    name: "User5489",
    country: "Thailand",
    exp: EXP.value,
    avatar: currentUserAvatar.value
  });
};

onMounted(() => {
  updateLeaderboard();
});

// Watch isVisible to update leaderboard when modal shows
watch(() => props.isVisible, (newVal) => {
  if (newVal && props.isCongratulatory) {
    updateLeaderboard();
  }
});

// Watch isCongratulatory to update leaderboard when it becomes true
watch(() => props.isCongratulatory, (newVal) => {
  if (newVal && props.isVisible) {
    updateLeaderboard();
  }
});

// Watch EXP for changes
watch(() => EXP.value, () => {
  updateLeaderboard();
});

const highlightRank = ref(false);
const progress = ref(0);
const displayedLeaderboard = ref([]);

// Watch for changes in leaderboard data
watch(() => props.leaderboardData, (newData) => {
  if (newData.length > 0) {
    // Show top 5 plus the user's rank if not in top 5
    const top5 = newData.slice(0, 5);
    const userEntry = newData.find(entry => entry.isCurrentUser);
    
    if (userEntry && !top5.some(entry => entry.isCurrentUser)) {
      displayedLeaderboard.value = [...top5, userEntry];
    } else {
      displayedLeaderboard.value = top5;
    }
  }
}, { immediate: true });

// Animation effects
onMounted(() => {
  if (props.isCongratulatory) {
    // Highlight pulse animation
    const highlightInterval = setInterval(() => {
      highlightRank.value = !highlightRank.value;
    }, 500);
    
    setTimeout(() => {
      clearInterval(highlightInterval);
      highlightRank.value = true;
    }, 3000);
    
    // Progress bar animation
    if (props.showProgress) {
      gsap.to(progress, {
        value: 100,
        duration: 2,
        ease: "power1.out"
      });
    }
  }
});

const closeModal = () => {
  emit('close');
};

const retry = () => {
  emit('retry');
};

const quit = () => {
  emit('quit');
};

const continueGame = () => {
  emit('continue');
};
</script>

<style scoped>
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
}

.modal-content {
  background-color: #1a1a2e;
  padding: 25px;
  border-radius: 15px;
  text-align: center;
  max-width: 80%;
  max-height: 80vh;
  overflow-y: auto;
  color: white;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.5);
}

.modal-content p {
  margin-bottom: 20px;
  font-size: 1.2rem;
}

button {
  margin: 8px;
  padding: 8px 16px;
  background-color: #0f3460;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  font-size: 1rem;
  transition: background-color 0.3s;
}

button:hover {
  background-color: #1a5a8a;
}

.modal-actions {
  margin-top: 20px;
}

/* Leaderboard styles */
.leaderboard-section {
  margin: 20px 0;
}

.leaderboard-container {
  margin-bottom: 15px;
  border: 1px solid #444;
  border-radius: 8px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 8px 10px;
  text-align: left;
  border-bottom: 1px solid #444;
  font-size: 0.9rem;
}

th {
  background-color: #16213e;
  position: sticky;
  top: 0;
}

.current-user {
  /* color: #1a1a2e; */
  background-color: rgba(0, 200, 255, 0.1);
  font-weight: bold;
}

.highlight {
  animation: pulse 0.5s infinite alternate;
}

@keyframes pulse {
  from {
    background-color: rgba(0, 200, 255, 0.1);
  }
  to {
    background-color: rgba(0, 200, 255, 0.3);
  }
}

/* Rank progress styles */
.rank-progress {
  margin-top: 15px;
}

.progress-bar {
  background-color: #16213e;
  height: 20px;
  border-radius: 10px;
  overflow: hidden;
  margin-bottom: 8px;
}

.progress-fill {
  background-color: #4CAF50;
  height: 100%;
  border-radius: 10px;
  transition: width 0.3s;
}

.progress-text {
  font-size: 0.9rem;
  color: #aaa;
}

/* Pagination styles for leaderboard */
.leaderboard-section :deep(.pagination) {
  margin-top: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

.leaderboard-section :deep(.pagination button) {
  padding: 6px 12px;
  background-color: #0f3460;
  color: white;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 0.9rem;
  transition: background-color 0.3s;
}

.leaderboard-section :deep(.pagination button:hover:not(:disabled)) {
  background-color: #1a5a8a;
}

.leaderboard-section :deep(.pagination button:disabled) {
  background-color: #555;
  cursor: not-allowed;
  opacity: 0.6;
}

.leaderboard-section :deep(.pagination span) {
  color: white;
  font-size: 0.9rem;
}
</style>
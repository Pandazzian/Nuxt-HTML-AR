<template> 
    <Background>
        <div class="page-content" style="position: relative; z-index: 1;">
            <div class="container-fluid mt-5" style="align-self: baseline; ">
                <div class="row justify-content-center">
                    <div class="col-11 col-md-10 col-lg-12">
                        <div class="dashboard w-100">
                            <div class="container-fluid">
                                <div class="row justify-content-center">
                                    <div class="col-12 d-xl-none">
                                        <h1 class="title">{{ t('index.title') }}</h1>
                                    </div>
                                    <div class="col-8 col-sm-6 col-md-4 col-xl-2">
                                        <Avatar/>
                                    </div>
                                    <div class="col-12 col-xl-4 d-none d-xl-block">
                                        <h1 class="title">{{ t('index.title') }}</h1>
                                        <NuxtLink to="/Levels" class="start-button w-100">{{ t('index.startButton') }}</NuxtLink>
                                    </div>
                                    <div class="col-8 col-sm-6 col-md-4 col-xl-2">
                                        <XPBarCircular 
                                            :currentXp="currentLevelXp" 
                                            :nextLevelXp="nextLevelXp"
                                            :currentLevel="currentLevel"
                                            :progress="xpProgress"
                                        />
                                    </div>
                                    <div class="col-12 d-xl-none">
                                        <NuxtLink to="/Levels" class="start-button w-100">{{ t('index.startButton') }}</NuxtLink>
                                    </div>
                                    <button class="col-12 btn-warning" @click="resetExp">
                                        {{ t('index.resetExp') }}
                                    </button>
                                </div>
                            </div>
                        </div>
                        
                        <!-- Leaderboard Section -->
                        <div class="leaderboard-section mt-4">
                            <h2 class="section-title">Top Players</h2>
                            <Leaderboard 
                                :leaderboardData="leaderboardData" 
                                :itemsPerPage="10"
                                :showTitle="false"
                                :showPagination="false"
                            />
                            <NuxtLink to="/Leaderboard" class="view-all-button w-100 mt-3">
                                View Full Leaderboard
                            </NuxtLink>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Background>
</template>
  
<script setup>
import { ref, onMounted, computed } from 'vue';
import Background from '~/components/Background.vue';
import Leaderboard from '~/components/Leaderboard.vue';
import { useExp } from '@/composables/useEXP'; // Import the useExp composable
import { useI18n } from '~/composables/useI18n';
import { generateLeaderboard } from '~/utils/leaderboard';
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

const { EXP, incrementExp, resetExp } = useExp(); // Use the composable
const { t } = useI18n();
const leaderboardData = ref([]);

// XP level thresholds
const levelThresholds = [0, 10, 100, 1000, 10000, 20000];

const currentLevel = computed(() => {
  for (let i = levelThresholds.length - 1; i >= 0; i--) {
    if (EXP.value >= levelThresholds[i]) {
      return i;
    }
  }
  return 0;
});

const currentLevelXp = computed(() => {
  return EXP.value - (levelThresholds[currentLevel.value] || 0);
});

const nextLevelXp = computed(() => {
  return (levelThresholds[currentLevel.value + 1] || levelThresholds[levelThresholds.length - 1]) - (levelThresholds[currentLevel.value] || 0);
});

const xpProgress = computed(() => {
  return currentLevelXp.value / nextLevelXp.value;
});

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

onMounted(() => {
  // Generate leaderboard with current user's EXP
  leaderboardData.value = generateLeaderboard('seeded-leaderboard', {
    name: 'You',
    country: 'Your Country',
    exp: EXP.value,
    level: currentLevel.value,
    avatar: currentUserAvatar.value
  });
});
</script>
  
<style scoped>

.dashboard {
  position: relative;
  z-index: 100;
  text-align: center;
  padding: 20px;
  background: #CDC9C5;
  border-radius: 20px;
  box-shadow: 10px 4px 10px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 2rem;
  font-weight: bold;
  color: #082557;
}

.start-button {
  display: inline-block;
  padding: 10px 20px;
  background: #4A90E2;
  color: #ffffff;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  margin-top: 10px;
  transition: background 0.3s ease;
}

.start-button:hover {
  background: #357abd;
}

.xp {
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 10px;
}

.cards-container {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 20px;
}

.card {
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}

button.btn-warning {
  display: none;
}

.leaderboard-section {
  background: #CDC9C5;
  border-radius: 20px;
  padding: 25px;
  box-shadow: 10px 4px 10px rgba(0, 0, 0, 0.1);
  z-index: 1;
  position: relative;
}

.section-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #082557;
  margin-bottom: 20px;
  text-align: center;
}

.view-all-button {
  display: inline-block;
  padding: 10px 20px;
  background: #4A90E2;
  color: #ffffff;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  text-align: center;
  transition: background 0.3s ease;
}

.view-all-button:hover {
  background: #357abd;
}

</style>

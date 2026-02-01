<template> 
    <Background>
        <div class="page-content" style="position: relative; z-index: 1;">
          <div v-if="showNameModal" class="name-modal-overlay">
            <div class="name-modal">
              <h3>Welcome!</h3>
              <p>Please enter your name to appear on the leaderboard.</p>
              <div class="name-modal-input">
                <input v-model="nameInput" type="text" maxlength="24" placeholder="Your name" />
                <button type="button" @click="saveName">Save</button>
              </div>
            </div>
          </div>
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
import { ref, onMounted, onUnmounted, computed, watch } from 'vue';
import Background from '~/components/Background.vue';
import Leaderboard from '~/components/Leaderboard.vue';
import { useExp } from '@/composables/useEXP'; // Import the useExp composable
import { useI18n } from '~/composables/useI18n';
import { useLeaderboard } from '@/composables/useLeaderboard';

const { EXP, incrementExp, resetExp, getLevel, getXpForNextLevel, getCurrentLevelProgress } = useExp(); // Use the composable
const { t } = useI18n();
const leaderboardData = ref([]);
const { userName, setUserName, fetchLeaderboard, submitScore } = useLeaderboard();
const nameInput = ref('');
const showNameModal = ref(false);
let refreshTimer = null;

const currentLevel = computed(() => getLevel());

const levelStartXp = computed(() => {
  const level = currentLevel.value;
  if (level === 0) return 0;
  if (level === 1) return 10;
  if (level === 2) return 100;
  if (level === 3) return 1000;
  if (level === 4) return 10000;
  return (level - 4) * 10000 + 10000;
});

const levelEndXp = computed(() => getXpForNextLevel());

const currentLevelXp = computed(() => Math.max(0, EXP.value - levelStartXp.value));

const nextLevelXp = computed(() => Math.max(1, levelEndXp.value - levelStartXp.value));

const xpProgress = computed(() => {
  const progress = getCurrentLevelProgress();
  return Number.isFinite(progress) ? progress : 0;
});

const refreshLeaderboard = async () => {
  await submitScore(EXP.value);
  leaderboardData.value = await fetchLeaderboard(10);
};

const saveName = async () => {
  setUserName(nameInput.value);
  showNameModal.value = false;
  await refreshLeaderboard();
};

onMounted(() => {
  nameInput.value = userName.value;
  showNameModal.value = !userName.value;
  refreshLeaderboard();
  refreshTimer = setInterval(refreshLeaderboard, 8000);
});

watch(EXP, () => {
  refreshLeaderboard();
});

onUnmounted(() => {
  if (refreshTimer) {
    clearInterval(refreshTimer);
    refreshTimer = null;
  }
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

.name-modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 2000;
}

.name-modal {
  background: #ffffff;
  padding: 24px;
  border-radius: 16px;
  width: min(420px, 90vw);
  box-shadow: 0 12px 24px rgba(0, 0, 0, 0.2);
  text-align: center;
}

.name-modal h3 {
  margin-bottom: 8px;
  color: #082557;
}

.name-modal p {
  margin-bottom: 16px;
  color: #333;
}

.name-modal-input {
  display: flex;
  gap: 8px;
  justify-content: center;
}

.name-modal-input input {
  flex: 1;
  min-width: 0;
  padding: 8px 10px;
  border-radius: 8px;
  border: 1px solid #ccc;
}

.name-modal-input button {
  padding: 8px 14px;
  border-radius: 8px;
  border: none;
  background: #0f3460;
  color: white;
  cursor: pointer;
}

</style>

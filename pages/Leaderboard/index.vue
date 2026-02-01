<template>
  <ClientOnly>
    <Background>
      <div class="page-content">
        <ClientOnly>
          <div class="leaderboard-header">
            <div class="name-input">
              <label for="leaderboard-name">Name</label>
              <input id="leaderboard-name" v-model="nameInput" type="text" maxlength="24" placeholder="Enter your name" />
              <button type="button" @click="saveName">Save</button>
            </div>
          </div>
          <Leaderboard 
            v-if="leaderboard"
            :leaderboard-data="leaderboard" 
            :items-per-page="20"
            :auto-scroll-to-user="true"
          />
        </ClientOnly>
      </div>
    </Background>
  </ClientOnly>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue';
import Background from '~/components/Background.vue';
import Leaderboard from '~/components/Leaderboard.vue';
import { useExp } from '@/composables/useEXP';
import { useLeaderboard } from '@/composables/useLeaderboard';

const { EXP } = useExp();
const leaderboard = ref(null);
const { userName, setUserName, fetchLeaderboard, submitScore } = useLeaderboard();
const nameInput = ref('');
let refreshTimer = null;

const refreshLeaderboard = async () => {
  await submitScore(EXP.value);
  leaderboard.value = await fetchLeaderboard(200);
};

const saveName = async () => {
  setUserName(nameInput.value);
  await refreshLeaderboard();
};

onMounted(() => {
  nameInput.value = userName.value;
  refreshLeaderboard();
  refreshTimer = setInterval(refreshLeaderboard, 5000);
});

onUnmounted(() => {
  if (refreshTimer) {
    clearInterval(refreshTimer);
    refreshTimer = null;
  }
});
</script>

<style scoped>
.leaderboard-header {
  display: flex;
  justify-content: flex-end;
  margin-bottom: 16px;
}

.name-input {
  display: flex;
  align-items: center;
  gap: 8px;
  background: rgba(255, 255, 255, 0.9);
  padding: 8px 12px;
  border-radius: 8px;
}

.name-input label {
  font-weight: 600;
}

.name-input input {
  padding: 6px 8px;
  border-radius: 6px;
  border: 1px solid #ccc;
}

.name-input button {
  padding: 6px 12px;
  border-radius: 6px;
  border: none;
  background: #0f3460;
  color: white;
  cursor: pointer;
}
</style>
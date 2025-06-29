<template> 
    <Background>
        <div class="page-content">
            <div class="container-fluid mt-5" style="align-self: baseline;">
                <div class="row justify-content-center">
                    <div class="col-11 col-md-10 col-lg-8">
                        <div class="dashboard w-100">
                            <div class="container-fluid">
                                <!-- Main Title Row -->
                                <div class="row justify-content-center mb-4">
                                    <div class="col-12 text-center">
                                        <h1 class="title">Level Up Your Web Dev Skills!</h1>
                                        <p class="subtitle">Master HTML, CSS, and JavaScript through interactive challenges and unlock new achievements as you progress.</p>
                                    </div>
                                </div>

                                <!-- Avatar and XP Row -->
                                <div class="row justify-content-center align-items-center mb-4">
                                    <div class="col-6 col-sm-4 col-md-3 col-xl-2">
                                        <div class="avatar-section">
                                            <ClientOnly>
                                                <Avatar/>
                                            </ClientOnly>
                                        </div>
                                    </div>
                                    <div class="col-6 col-sm-4 col-md-3 col-xl-2">
                                        <div class="xp-section">
                                            <ClientOnly>
                                                <XPBarCircular 
                                                    :currentXp="EXP" 
                                                    :nextLevelXp="getXpForNextLevel()"
                                                    :currentLevel="getLevel()"
                                                    :progress="getCurrentLevelProgress()"
                                                />
                                            </ClientOnly>
                                        </div>
                                    </div>
                                </div>

                                <!-- Level Progress Text -->
                                <div class="row justify-content-center mb-4">
                                    <div class="col-12 text-center">
                                        <ClientOnly>
                                            <div class="level-info">
                                                <span class="current-level">Level {{ getLevel() }}</span>
                                                <span class="progress-text">{{ getXpNeededForNextLevel() }} XP to next level</span>
                                            </div>
                                        </ClientOnly>
                                    </div>
                                </div>

                                <!-- Action Buttons Row -->
                                <div class="row justify-content-center">
                                    <div class="col-12 col-sm-8 col-md-6">
                                        <div class="action-buttons">
                                            <NuxtLink to="/Levels" class="start-button">
                                                🚀 Start Learning
                                            </NuxtLink>
                                            <NuxtLink to="/Leaderboard" class="leaderboard-button">
                                                🏆 View Leaderboard
                                            </NuxtLink>
                                        </div>
                                    </div>
                                </div>

                                <!-- Debug Button (can be removed in production) -->
                                <div class="row justify-content-center mt-3">
                                    <div class="col-12 text-center">
                                        <button class="reset-button" @click="resetExp">
                                            Reset Progress
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Background>
</template>
  
<script setup>
import Background from '~/components/Background.vue';
import { useExp } from '@/composables/useEXP';

const { EXP, incrementExp, resetExp, getLevel, getXpForNextLevel, getXpNeededForNextLevel, getCurrentLevelProgress } = useExp();
</script>
  
<style scoped>
.dashboard {
  position: relative;
  z-index: 10;
  text-align: center;
  padding: 30px 20px;
  background: #CDC9C5;
  border-radius: 20px;
  box-shadow: 0 8px 20px rgba(0, 0, 0, 0.15);
}

.title {
  font-size: 2.5rem;
  font-weight: bold;
  color: #082557;
  margin-bottom: 10px;
}

.subtitle {
  font-size: 1.1rem;
  color: #5a6c7d;
  margin-bottom: 0;
  line-height: 1.5;
}

.avatar-section, .xp-section {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 120px;
}

.level-info {
  display: flex;
  flex-direction: column;
  gap: 5px;
}

.current-level {
  font-size: 1.4rem;
  font-weight: bold;
  color: #082557;
}

.progress-text {
  font-size: 1rem;
  color: #6c757d;
}

.action-buttons {
  display: flex;
  flex-direction: column;
  gap: 15px;
  width: 100%;
}

.start-button, .leaderboard-button {
  display: inline-block;
  padding: 15px 25px;
  border-radius: 12px;
  text-decoration: none;
  font-weight: bold;
  font-size: 1.1rem;
  transition: all 0.3s ease;
  text-align: center;
}

.start-button {
  background: linear-gradient(135deg, #4A90E2, #357ABD);
  color: #ffffff;
  box-shadow: 0 4px 15px rgba(74, 144, 226, 0.3);
}

.start-button:hover {
  background: linear-gradient(135deg, #357ABD, #2E6DA4);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(74, 144, 226, 0.4);
  color: #ffffff;
}

.leaderboard-button {
  background: linear-gradient(135deg, #28a745, #20c997);
  color: #ffffff;
  box-shadow: 0 4px 15px rgba(40, 167, 69, 0.3);
}

.leaderboard-button:hover {
  background: linear-gradient(135deg, #20c997, #17a2b8);
  transform: translateY(-2px);
  box-shadow: 0 6px 20px rgba(40, 167, 69, 0.4);
  color: #ffffff;
}

.reset-button {
  background: #dc3545;
  color: white;
  border: none;
  padding: 8px 16px;
  border-radius: 6px;
  font-size: 0.9rem;
  cursor: pointer;
  transition: all 0.3s ease;
}

.reset-button:hover {
  background: #c82333;
  transform: translateY(-1px);
}

/* Responsive Design */
@media (min-width: 768px) {
  .action-buttons {
    flex-direction: row;
    justify-content: center;
  }
  
  .start-button, .leaderboard-button {
    flex: 1;
    max-width: 200px;
  }
}

@media (min-width: 1200px) {
  .title {
    font-size: 3rem;
  }
  
  .subtitle {
    font-size: 1.2rem;
  }
}

@media (max-width: 576px) {
  .title {
    font-size: 2rem;
  }
  
  .subtitle {
    font-size: 1rem;
  }
  
  .dashboard {
    padding: 20px 15px;
  }
  
  .avatar-section, .xp-section {
    height: 100px;
  }
}
</style>
</template>
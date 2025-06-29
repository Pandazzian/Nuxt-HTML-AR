// composables/useExp.js
import { ref, onMounted } from 'vue';

export function useExp() {
  // Initialize EXP with a default value for consistent SSR/hydration
  const EXP = ref(0);

  // Load EXP from localStorage only after component is mounted
  onMounted(() => {
    if (process.client) {
      EXP.value = Number(localStorage.getItem('EXP')) || 0;
    }
  });

  const getLevel=()=>{
    let level = 0;
    if(EXP.value>=10&&EXP.value<100){
        level = 1;
    }
    else if(EXP.value>=100&&EXP.value<1000){
        level = 2;
    }
    else if(EXP.value>=1000&&EXP.value<10000){
        level = 3;
    }
    else if(EXP.value>=10000&&EXP.value<20000){
        level = 4;
    }
    else{
        level = 3+parseInt(EXP.value/10000)
    }
    return level;
  }

  // Function to get XP required for next level
  const getXpForNextLevel = () => {
    const currentLevel = getLevel();
    if (currentLevel === 0) return 10;
    if (currentLevel === 1) return 100;
    if (currentLevel === 2) return 1000;
    if (currentLevel === 3) return 10000;
    if (currentLevel === 4) return 20000;
    return (currentLevel - 3) * 10000 + 10000;
  };

  // Function to get XP needed for next level
  const getXpNeededForNextLevel = () => {
    return getXpForNextLevel() - EXP.value;
  };

  // Function to get current level progress (0-1)
  const getCurrentLevelProgress = () => {
    const currentLevel = getLevel();
    let levelStartXp = 0;
    
    if (currentLevel === 0) levelStartXp = 0;
    else if (currentLevel === 1) levelStartXp = 10;
    else if (currentLevel === 2) levelStartXp = 100;
    else if (currentLevel === 3) levelStartXp = 1000;
    else if (currentLevel === 4) levelStartXp = 10000;
    else levelStartXp = (currentLevel - 4) * 10000 + 10000;

    const levelEndXp = getXpForNextLevel();
    const progressInLevel = EXP.value - levelStartXp;
    const totalLevelXp = levelEndXp - levelStartXp;
    
    return Math.min(1, Math.max(0, progressInLevel / totalLevelXp));
  };

  // Function to increment EXP
  const incrementExp = (amount) => {
    EXP.value += amount;
    if (process.client) {
      localStorage.setItem('EXP', EXP.value); // Save to localStorage
    }
  };

  // Function to reset EXP
  const resetExp = () => {
    EXP.value = 0;
    if (process.client) {
      localStorage.setItem('EXP', EXP.value); // Save to localStorage
    }
  };

  return {
    EXP,
    incrementExp,
    resetExp,
    getLevel,
    getXpForNextLevel,
    getXpNeededForNextLevel,
    getCurrentLevelProgress
  };
}
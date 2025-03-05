// composables/useExp.js
import { ref } from 'vue';

export function useExp() {
  // Initialize EXP with a default value
  const EXP = ref(0);

  // Only access localStorage on the client side
  if (process.client) {
    // Load EXP from localStorage or initialize to 0
    EXP.value = Number(localStorage.getItem('EXP')) || 0;
  }

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
    getLevel
  };
}
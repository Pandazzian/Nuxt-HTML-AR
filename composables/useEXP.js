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
  };
}
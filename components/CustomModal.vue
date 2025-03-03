<!-- components/Modal.vue -->
<template>
  <div v-if="isVisible" class="modal-overlay" style="z-index: 1500;">
    <div class="modal-content">
      <p>{{ message }}</p>
      <div v-if="isGameOver">
        <button @click="retry">Retry</button>
        <button @click="quit">Quit</button>
      </div>
      <button v-else @click="closeModal">Understood</button>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  isVisible: Boolean,
  message: String,
  isGameOver: Boolean, // Add a prop to distinguish between modals
});

const emit = defineEmits(['close', 'retry', 'quit']);

const closeModal = () => {
  emit('close');
};

const retry = () => {
  emit('retry');
};

const quit = () => {
  emit('quit');
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
}

.modal-content {
  background-color: white;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
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
</style>
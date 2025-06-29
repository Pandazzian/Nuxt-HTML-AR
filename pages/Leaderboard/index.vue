<template>
  <Background>
    <div class="page-content">
      <ClientOnly>
        <Leaderboard 
          :leaderboard-data="leaderboard" 
          :items-per-page="20"
          :auto-scroll-to-user="true"
        />
      </ClientOnly>
    </div>
  </Background>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { generateLeaderboard } from '@/utils/leaderboard';
import Background from '~/components/Background.vue';
import Leaderboard from '~/components/Leaderboard.vue';
import { useExp } from '@/composables/useEXP';

const { EXP } = useExp();
const leaderboard = ref([]);

onMounted(() => {
  leaderboard.value = generateLeaderboard('my-seed-123', {
    name: "User5489",
    country: "Thailand",
    exp: EXP.value
  });
});
</script>
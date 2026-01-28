<template>
  <ClientOnly>
    <Background>
      <div class="page-content">
        <ClientOnly>
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
import { ref, onMounted, computed } from 'vue';
import { generateLeaderboard } from '@/utils/leaderboard';
import Background from '~/components/Background.vue';
import Leaderboard from '~/components/Leaderboard.vue';
import { useExp } from '@/composables/useEXP';
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
const leaderboard = ref(null);

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
  leaderboard.value = generateLeaderboard('my-seed-123', {
    name: "User5489",
    country: "Thailand",
    exp: EXP.value,
    avatar: currentUserAvatar.value
  });
});
</script>
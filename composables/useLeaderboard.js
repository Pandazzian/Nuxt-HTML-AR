import { ref, computed, onMounted } from 'vue';
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

const avatarList = [
  avatarImage,
  avatarImage1,
  avatarImage2,
  avatarImage3,
  avatarImage4,
  avatarImage5,
  avatarImage6,
  avatarImage7,
  avatarImage8,
  avatarImage9,
];

const ensureClient = () => typeof window !== 'undefined';

const sanitizeName = (name) => name.trim().slice(0, 24);

const getOrCreateId = () => {
  if (!ensureClient()) return '';
  let id = localStorage.getItem('leaderboardId');
  if (!id) {
    id = `player_${crypto.randomUUID()}`;
    localStorage.setItem('leaderboardId', id);
  }
  return id;
};

const getStoredName = () => {
  if (!ensureClient()) return '';
  return localStorage.getItem('leaderboardName') || '';
};

const getOrCreateCountry = () => {
  if (!ensureClient()) return '';
  let country = localStorage.getItem('leaderboardCountry');
  if (!country) {
    country = 'Thailand';
    localStorage.setItem('leaderboardCountry', country);
  }
  return country;
};

const getAvatarIndex = () => {
  if (!ensureClient()) return 0;
  const savedAvatarIndex = localStorage.getItem('selectedAvatarIndex');
  const avatarIndex = savedAvatarIndex ? parseInt(savedAvatarIndex, 10) : 0;
  return Number.isNaN(avatarIndex) ? 0 : avatarIndex;
};

export const useLeaderboard = () => {
  const userId = ref('');
  const userName = ref('');
  const userCountry = ref('');
  const avatarIndex = ref(0);

  const avatarUrl = computed(() => avatarList[avatarIndex.value] || avatarImage);

  const loadIdentity = () => {
    if (!ensureClient()) return;
    userId.value = getOrCreateId();
    userName.value = getStoredName();
    userCountry.value = getOrCreateCountry();
    avatarIndex.value = getAvatarIndex();
  };

  const setUserName = (name) => {
    if (!ensureClient()) return;
    const cleaned = sanitizeName(name);
    if (!cleaned) return;
    userName.value = cleaned;
    localStorage.setItem('leaderboardName', cleaned);
  };

  const setUserCountry = (country) => {
    if (!ensureClient()) return;
    const cleaned = sanitizeName(country);
    if (!cleaned) return;
    userCountry.value = cleaned;
    localStorage.setItem('leaderboardCountry', cleaned);
  };

  const submitScore = async (exp) => {
    if (!ensureClient()) return;
    if (!userId.value) loadIdentity();
    if (!userName.value) return;
    await $fetch('/api/leaderboard', {
      method: 'POST',
      body: {
        id: userId.value,
        name: userName.value,
        country: userCountry.value,
        exp,
        avatarIndex: avatarIndex.value,
      },
    });
  };

  const fetchLeaderboard = async (limit = 100) => {
    const entries = await $fetch('/api/leaderboard', { params: { limit } });
    return (entries || []).map((entry) => ({
      ...entry,
      avatar: avatarList[entry.avatarIndex] || avatarImage,
      isCurrentUser: entry.id === userId.value,
    }));
  };

  onMounted(() => {
    loadIdentity();
  });

  return {
    userId,
    userName,
    userCountry,
    avatarIndex,
    avatarUrl,
    setUserName,
    setUserCountry,
    submitScore,
    fetchLeaderboard,
  };
};

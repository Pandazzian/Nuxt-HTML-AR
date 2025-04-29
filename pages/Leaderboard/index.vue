<template>
  <Background>
    <div class="page-content">
      <Leaderboard 
        :leaderboard-data="leaderboard" 
        :items-per-page="20"
        :auto-scroll-to-user="true"
      />
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
<!-- <template>
  <Background>
    <div class="page-content">
      <h1>Leaderboard</h1>
      <table>
        <thead>
          <tr>
            <th>Place</th>
            <th>Name</th>
            <th>Country</th>
            <th>EXP</th>
          </tr>
        </thead>
        <tbody>
          <tr 
            v-for="entry in paginatedLeaderboard" 
            :key="entry.place"
            :class="{ 'current-user': entry.isCurrentUser }"
          >
            <td>{{ entry.place }}</td>
            <td>
              {{ entry.name }}
              <span v-if="entry.isCurrentUser" class="user-badge">(You)</span>
            </td>
            <td>{{ entry.country }}</td>
            <td>{{ entry.exp }}</td>
          </tr>
        </tbody>
      </table>
      <div class="pagination">
        <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
      </div>
    </div>
  </Background>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { generateLeaderboard } from '@/utils/leaderboard';
import Background from '~/components/Background.vue';
import { useExp } from '@/composables/useEXP';

const { EXP } = useExp();

// Generate the leaderboard with current user included
const leaderboard = generateLeaderboard('my-seed-123', {
  name: "User5489",
  country: "Thailand",
  exp: EXP.value
});

// Find the current user's page
const findUserPage = () => {
  const userEntry = leaderboard.find(entry => entry.isCurrentUser);
  if (userEntry) {
    return Math.ceil(userEntry.place / itemsPerPage);
  }
  return 1;
};

// Pagination logic
const itemsPerPage = 30;
const currentPage = ref(1);

// Set initial page to user's page
onMounted(() => {
  currentPage.value = findUserPage();
});

const totalPages = computed(() => Math.ceil(leaderboard.length / itemsPerPage));

const paginatedLeaderboard = computed(() => {
  const start = (currentPage.value - 1) * itemsPerPage;
  const end = start + itemsPerPage;
  return leaderboard.slice(start, end);
});

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--;
  }
};

const nextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++;
  }
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 20px;
}

th, td {
  padding: 10px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}

th {
  background-color: #f4f4f4;
}

tr:hover {
  background-color: #f9f9f9;
}

.current-user {
  background-color: #e6f7ff;
  font-weight: bold;
  position: relative;
}

.current-user::after {
  content: "⭐";
  position: absolute;
  right: 10px;
}

.user-badge {
  color: #1890ff;
  margin-left: 5px;
}

.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 10px;
}

button {
  padding: 5px 10px;
  cursor: pointer;
}
</style> -->
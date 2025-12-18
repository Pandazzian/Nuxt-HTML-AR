<template>
    <div class="leaderboard-container">
      <h1 v-if="showTitle">Leaderboard</h1>
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
      <div class="pagination" v-if="showPagination">
        <button @click="prevPage" :disabled="currentPage === 1">Previous</button>
        <span>Page {{ currentPage }} of {{ totalPages }}</span>
        <button @click="nextPage" :disabled="currentPage === totalPages">Next</button>
      </div>
    </div>
</template>
  
<script setup>
  import { ref, computed, onMounted, watch } from 'vue';
  
  const props = defineProps({
    leaderboardData: {
      type: Array,
      required: true
    },
    itemsPerPage: {
      type: Number,
      default: 30
    },
    showTitle: {
      type: Boolean,
      default: true
    },
    showPagination: {
      type: Boolean,
      default: true
    },
    autoScrollToUser: {
      type: Boolean,
      default: true
    }
  });
  
  const currentPage = ref(1);
  
  // Find the current user's position and calculate their page
  const findUserPage = () => {
    const userEntry = props.leaderboardData.find(entry => entry.isCurrentUser);
    if (userEntry) {
      return Math.ceil(userEntry.place / props.itemsPerPage);
    }
    return 1;
  };
  
  // Update current page when leaderboard data changes
  watch(() => props.leaderboardData, (newData) => {
    if (props.autoScrollToUser && newData.length > 0) {
      currentPage.value = findUserPage();
    }
  }, { immediate: true });
  
  const totalPages = computed(() => Math.ceil(props.leaderboardData.length / props.itemsPerPage));
  
  const paginatedLeaderboard = computed(() => {
    const start = (currentPage.value - 1) * props.itemsPerPage;
    const end = start + props.itemsPerPage;
    return props.leaderboardData.slice(start, end);
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
  
  // Expose functions if parent component needs to control pagination
  defineExpose({
    goToPage: (page) => {
      if (page >= 1 && page <= totalPages.value) {
        currentPage.value = page;
      }
    },
    currentPage,
    totalPages
  });
</script>
  
<style scoped>
    .leaderboard-container {
        width: 100%;
    }

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
      color: #1890ff;
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
</style>
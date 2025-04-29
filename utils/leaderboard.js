// // utils/leaderboard.js
// import seedrandom from 'seedrandom';

// // Function to generate random names
// const generateName = (rng) => {
//   const firstNames = ['John', 'Jane', 'Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank'];
//   const lastNames = ['Smith', 'Doe', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller'];
//   const firstName = firstNames[Math.floor(rng() * firstNames.length)];
//   const lastName = lastNames[Math.floor(rng() * lastNames.length)];
//   return `${firstName} ${lastName}`;
// };

// // Function to generate random countries
// const generateCountry = (rng) => {
//   const countries = ['USA', 'Canada', 'UK', 'Australia', 'Germany', 'France', 'Japan', 'Brazil','Thailand'];
//   return countries[Math.floor(rng() * countries.length)];
// };

// // Function to generate random EXP
// const generateExp = (rng) => {
//   return Math.floor(rng() * 10000); // Random EXP between 0 and 9999
// };

// // Function to generate the leaderboard
// export const generateLeaderboard = (seed) => {
//   const rng = seedrandom(seed); // Seed the random number generator
//   const leaderboard = [];

//   for (let i = 1; i <= 10000; i++) {
//     leaderboard.push({
//       place: i,
//       name: generateName(rng),
//       country: generateCountry(rng),
//       exp: generateExp(rng),
//     });
//   }

//   // Sort the leaderboard by EXP in descending order
//   leaderboard.sort((a, b) => b.exp - a.exp);

//   // Reassign places based on sorted order
//   leaderboard.forEach((entry, index) => {
//     entry.place = index + 1;
//   });

//   return leaderboard;
// };

// utils/leaderboard.js
import seedrandom from 'seedrandom';

// Function to generate random names
const generateName = (rng) => {
  const firstNames = ['John', 'Jane', 'Alice', 'Bob', 'Charlie', 'Diana', 'Eve', 'Frank'];
  const lastNames = ['Smith', 'Doe', 'Johnson', 'Williams', 'Brown', 'Jones', 'Garcia', 'Miller'];
  const firstName = firstNames[Math.floor(rng() * firstNames.length)];
  const lastName = lastNames[Math.floor(rng() * lastNames.length)];
  return `${firstName} ${lastName}`;
};

// Function to generate random countries
const generateCountry = (rng) => {
  const countries = ['USA', 'Canada', 'UK', 'Australia', 'Germany', 'France', 'Japan', 'Brazil', 'Thailand'];
  return countries[Math.floor(rng() * countries.length)];
};

// Function to generate random EXP
const generateExp = (rng) => {
  return Math.floor(rng() * 10000); // Random EXP between 0 and 9999
};

// Function to generate the leaderboard
export const generateLeaderboard = (seed, currentUser = null) => {
  const rng = seedrandom(seed); // Seed the random number generator
  const leaderboard = [];

  // Generate random entries
  for (let i = 0; i < 10000; i++) {
    // If this is the last entry and we have a current user, use their data
    if (currentUser && i === 9999) {
      leaderboard.push({
        name: currentUser.name,
        country: currentUser.country,
        exp: currentUser.exp,
        isCurrentUser: true
      });
    } else {
      leaderboard.push({
        name: generateName(rng),
        country: generateCountry(rng),
        exp: generateExp(rng),
        isCurrentUser: false
      });
    }
  }

  // Sort the leaderboard by EXP in descending order
  leaderboard.sort((a, b) => b.exp - a.exp);

  // Reassign places based on sorted order
  leaderboard.forEach((entry, index) => {
    entry.place = index + 1;
  });

  return leaderboard;
};
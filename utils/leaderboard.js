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

// Avatar definitions matching Avatar.vue
const allAvatars = [
  { image: avatarImage, requiredExp: 0 },
  { image: avatarImage1, requiredExp: 100 },
  { image: avatarImage2, requiredExp: 500 },
  { image: avatarImage3, requiredExp: 1000 },
  { image: avatarImage4, requiredExp: 2500 },
  { image: avatarImage5, requiredExp: 5000 },
  { image: avatarImage6, requiredExp: 10000 },
  { image: avatarImage7, requiredExp: 25000 },
  { image: avatarImage8, requiredExp: 50000 },
  { image: avatarImage9, requiredExp: 100000 },
];

// Function to get unlocked avatars based on EXP
const getUnlockedAvatars = (exp) => {
  return allAvatars.filter(avatar => exp >= avatar.requiredExp);
};

// Function to pick a random avatar from unlocked ones using seeded RNG
const generateAvatarForExp = (exp, rng) => {
  const unlockedAvatars = getUnlockedAvatars(exp);
  const randomIndex = Math.floor(rng() * unlockedAvatars.length);
  return unlockedAvatars[randomIndex].image;
};

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

// Function to generate random EXP with tight bell curve centered at 10000
const generateExp = (rng) => {
  // Box-Muller transform to get normal distribution
  const u1 = rng();
  const u2 = rng();
  const z = Math.sqrt(-2 * Math.log(u1)) * Math.cos(2 * Math.PI * u2);
  
  // Tight bell curve centered at 10000 with small standard deviation
  // Most players between 5000-15000, very few above 20000
  const mean = 10000;
  const stdDev = 2500;
  let exp = mean + z * stdDev;
  
  // Clamp to 0-20000 range (sharp cutoff prevents extreme values)
  return Math.max(0, Math.min(20000, Math.floor(exp)));
};

// Function to generate high EXP (rare veterans)
const generateHighExp = (rng) => {
  // Generate values between 20000-100000 for rare high-level players
  return Math.floor(20000 + rng() * 80000);
};

// Function to generate the leaderboard
export const generateLeaderboard = (seed, currentUser = null) => {
  const rng = seedrandom(seed); // Seed the random number generator
  const leaderboard = [];

  // Generate random entries (9970 = leave room for 30 high-EXP entries)
  for (let i = 0; i < 9970; i++) {
    // If this is the last entry and we have a current user, use their data
    if (currentUser && i === 9969) {
      leaderboard.push({
        name: currentUser.name,
        country: currentUser.country,
        exp: currentUser.exp,
        avatar: currentUser.avatar,
        isCurrentUser: true
      });
    } else {
      const exp = generateExp(rng);
      leaderboard.push({
        name: generateName(rng),
        country: generateCountry(rng),
        exp: exp,
        avatar: generateAvatarForExp(exp, rng),
        isCurrentUser: false
      });
    }
  }

  // Add ~30 scarce high-EXP entries (veterans/extreme players)
  for (let i = 0; i < 30; i++) {
    const exp = generateHighExp(rng);
    leaderboard.push({
      name: generateName(rng),
      country: generateCountry(rng),
      exp: exp,
      avatar: generateAvatarForExp(exp, rng),
      isCurrentUser: false
    });
  }

  // Sort the leaderboard by EXP in descending order
  leaderboard.sort((a, b) => b.exp - a.exp);

  // Reassign places based on sorted order
  leaderboard.forEach((entry, index) => {
    entry.place = index + 1;
  });

  return leaderboard;
};
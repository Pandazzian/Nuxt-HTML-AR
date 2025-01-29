<template>
    <div class="hero-container">
      <div class="hero-content">
        <h1 class="hero-title">The Power of Interactive Learning</h1>
        <p class="hero-subtitle">
          Step into a universe where technology and creativity merge seamlessly.
        </p>
        <NuxtLink to="/Levels">
          <button class="btn btn-lg btn-primary hero-btn">Start Exploring</button>
        </NuxtLink>
      </div>
    </div>
  </template>
  
  <script setup>
  // No additional logic required for now
  </script>
  
  <style scoped>
  /* Hero Section Styling */
  .hero-container {
      position: relative;
      width: 100%;
      height: 100vh;
      display: flex;
      align-items: center;
      justify-content: center;
      text-align: center;
      background: linear-gradient(135deg, #6A11CB, #2575FC);
      overflow: hidden;
  }
  
  /* Styling for Title & Subtitle */
  .hero-content {
      max-width: 800px;
      color: white;
      padding: 20px;
  }
  
  .hero-title {
      font-size: 3rem;
      font-weight: bold;
      margin-bottom: 10px;
  }
  
  .hero-subtitle {
      font-size: 1.2rem;
      opacity: 0.9;
      margin-bottom: 20px;
  }
  
  /* Call-to-Action Button */
  .hero-btn {
      padding: 14px 28px;
      font-size: 1.2rem;
      border-radius: 30px;
      background: white;
      color: #6A11CB;
      font-weight: bold;
      transition: all 0.3s ease-in-out;
      border: none;
  }
  
  .hero-btn:hover {
      background: rgba(255, 255, 255, 0.8);
      transform: scale(1.05);
  }
  
  /* Wave Effect */
  .hero-container::before {
      content: "";
      position: absolute;
      bottom: 0;
      left: 0;
      width: 100%;
      height: 180px;
      background: url("https://raw.githubusercontent.com/willianjusten/animated-css-waves/master/waves.svg");
      background-size: cover;
      animation: waveMove 6s infinite linear;
  }
  
  /* Wave Animation */
  @keyframes waveMove {
      from {
          background-position-x: 0;
      }
      to {
          background-position-x: 1000px;
      }
  }
  </style>
  
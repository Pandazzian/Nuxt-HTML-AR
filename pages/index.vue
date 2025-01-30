<template> 
    <Background>
        <div class="container-fluid mt-5" style="align-self: baseline; ">
            <div class="row justify-content-center">
                <div class="col-11 col-md-8">
                    <div class="dashboard w-100">
                        <div class="container-fluid">
                            <div class="row justify-content-center">
                                <div class="col-12 d-xl-none">
                                    <h1 class="title">Level Up Your Web Dev Skills!</h1>
                                </div>
                                <div class="col-8 col-sm-6 col-md-4 col-xl-2">
                                    <Avatar/>
                                </div>
                                <div class="col-12 col-xl-4 d-none d-xl-block">
                                    <h1 class="title">Level Up Your Web Dev Skills!</h1>
                                    <NuxtLink to="/Levels" class="start-button w-100">Start Learning</NuxtLink>
                                </div>
                                <div class="col-8 col-sm-6 col-md-4 col-xl-2">
                                    <XPBarCircular :xp="400" :maxXp="500"/>
                                </div>
                                <div class="col-12 d-xl-none">
                                    <NuxtLink to="/Levels" class="start-button w-100">Start Learning</NuxtLink>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </Background>
</template>
  
<script setup>
import Background from '~/components/Background.vue';
</script>
  
<style scoped>

.dashboard {
  position: relative;
  z-index: 10;
  text-align: center;
  padding: 20px;
  background: #CDC9C5;
  border-radius: 20px;
  box-shadow: 10px 4px 10px rgba(0, 0, 0, 0.1);
}

.title {
  font-size: 2rem;
  font-weight: bold;
  color: #082557;
}

.start-button {
  display: inline-block;
  padding: 10px 20px;
  background: #4A90E2;
  color: #ffffff;
  border-radius: 8px;
  text-decoration: none;
  font-weight: bold;
  margin-top: 10px;
}

.xp {
  font-size: 1.5rem;
  font-weight: bold;
  margin-top: 10px;
}

.cards-container {
  display: flex;
  gap: 20px;
  justify-content: center;
  margin-top: 20px;
}

.card {
  background: #fff;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  text-align: center;
}
</style>

<template>
  <Background>
    <div class="container-fluid">
      <div class="row justify-content-center">
        <div class="col-10" v-for="(level, index) in levels" :key="'level' + index+1">
          <div class="card w-100 mt-2 mb-2 levels">
            <div class="card-body">
              
              <div class="card-text">
                <div class="container-fluid">
                  <div class="row">
                    <div class="col-2">
                      <h3 class="card-title white-text">Level {{level.level}}</h3>
                    </div>
                  </div>
                  <div class="row">
                    <div class="col-2">
                      <img :src=level.image :alt=level.name>
                    </div>
                    <div class="col-6" style="align-content: space-evenly;">
                      <h4 class="white-text">{{ level.name }}</h4>
                    </div>
                    <div class="col-4">
                      <button v-if="level.expRequirement>EXP" type="button" class="btn btn-secondary btn-lg w-100" disabled>Locked</button>
                      <button v-else type="button" class="btn btn-info btn-lg w-100" style="color: white"  @click="navigateToLevel(level.level)">Play</button>
                    </div>
                  </div>
                </div>
              </div>
              <!-- <a href="#" class="btn btn-primary">Button</a> -->
            </div>
          </div>
        </div>
      </div>
    </div>
  </Background>
</template>
<script setup>
import level1 from '@/assets/images/level1.webp';
import level2 from '@/assets/images/level2.webp';
import level3 from '@/assets/images/level3.webp';
import level4 from '@/assets/images/level4.webp';
import level5 from '@/assets/images/level5.webp';
import { useRouter } from 'vue-router';
import { useExp } from '@/composables/useEXP'; // Import the useExp composable

const { EXP, incrementExp, resetExp } = useExp(); // Use the composable
const router = useRouter();
const levels = [
  {
    level: 0,
    name: "Basic HTML Structure",
    image: level1,
    expRequirement:0,
    locked: false
  },
  {
    level: 1,
    name: "Adding Head and Body",
    image: level2,
    expRequirement:10,
    locked: true
  },
  {
    level: 2,
    name: "Adding Content to the Head",
    image: level3,
    expRequirement:100,
    locked: true
  },
  {
    level: 3,
    name: "Adding Content to the Body",
    image: level4,
    expRequirement:1000,
    locked: true
  },
  {
    level: 4,
    name: "Adding Attributes and Styling",
    image: level5,
    expRequirement:10000,
    locked: true
  },
];
const navigateToLevel = (id) => {
  router.push(`/Levels/${id}`);
};
</script>
<style>
img{
  width: 5rem;
  height: auto;
  border-radius: 3rem;
}
.levels{
  border-radius: 4rem; 
  padding: 0rem 1rem;
  background-color: #0f2235;
}
.white-text{
  color: antiquewhite;
}
.btn{
  border-radius: 3rem;
}
</style>
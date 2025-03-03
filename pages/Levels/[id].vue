<!-- <template>  
    <Background>
        <div class="container-fluid">
            <div class="row justify-content-center">
                <div class="col-10">
                    <div class="container-fluid">
                        <div class="row">
                            <div class="col-12">
                                <span style="font-size: 1.5rem;">lives:</span><img v-for="index in lives" :key="'life'+index" style="margin-left: 2px;margin-right: 2px;" src="@/assets/images/pixelateHeart.png" width="20px" height="auto">
                            </div>
                        </div>
                        <div class="row" id="demo">
                            <div class="col-4 source">
                                <h3 style="color: aliceblue;">Source</h3>
                                <div v-for="(choice,index) in levels[id].choices" :key="'choice' + index" :class="'box dragger'+(index+1)">{{ choice.text }}</div>
                            </div>
                            <div class="col-7 destination">
                                <h3 style="color: aliceblue;">HTML file</h3>
                                <div v-for="(tar,index) in levels[id].destinations" :key="'target'+index+'key'" :id="'target'+index" class="target">
                                    line{{ index+1 }}
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
import { onMounted } from 'vue';
import { gsap } from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { useRoute } from 'vue-router';
let lives = 3;
const levels = [
  {
    level: 0,
    name: "Basic HTML Structure",
    choices:[
        {
            text:"<!DOCTYPE html>",
            role:"Use to set the document type for the whole file."
        },
        {
            text:"<html>",
            role:"html open tag goes on the outer most layer of the html file"
        },
        {
            text:"</html>",
            role:"html close tag goes on the outer most layer of the html file"
        },
    ],
    destinations:[
        {
            expect:"<!DOCTYPE html>"
        },
        {
            expect:"<html>"
        },
        {
            expect:"</html>"
        },
    ]
  },
  {
    level: 1,
    name: "Adding Head and Body",
    // image: level2,
    // locked: true
  },
  {
    level: 2,
    name: "Adding Content to the Head",
    // image: level3,
    // locked: true
  },
  {
    level: 3,
    name: "Adding Content to the Body",
    // image: level4,
    // locked: true
  },
  {
    level: 4,
    name: "Adding Attributes and Styling",
    // image: level5,
    // locked: true
  },
];

const route = useRoute();
const id = route.params.id; // Get the dynamic ID from the URL
const tooltipVisible = ref([false,false,false]);

const showTooltip = (id) => {
    tooltipVisible[id].value = true;
};

const hideTooltip = (id) => {
    tooltipVisible[id].value = false;
};
// Register Plugins
gsap.registerPlugin(Draggable);

onMounted(() => {
    const targets = document.querySelectorAll(".target");
    const overlapThreshold = "50%";
    
    // Store original positions
    const boxes = document.querySelectorAll(".box");
    boxes.forEach((box) => {
        box.originalLeft = box.offsetLeft;
        box.originalTop = box.offsetTop;
    });

    Draggable.create(".box", {
        bounds: "#demo",
        edgeResistance: 0.65,
        type: "x,y",
        inertia: true,
        onDrag() {
            targets.forEach(target => {
                if (this.hitTest(target, overlapThreshold)) {
                    target.classList.add("show-over");
                } else {
                    target.classList.remove("show-over");
                }
            });
        },
        onDragEnd(e) {
            let snapMade = false;
            targets.forEach(target => {
                if (this.hitTest(target, overlapThreshold)) {
                    if (!target.classList.contains("occupied")) {
                        target.classList.add("occupied");
                        gsap.to(e.target, { duration: 0.1, x: target.offsetLeft - e.target.offsetLeft, y: target.offsetTop - e.target.offsetTop });
                        if (e.target.targetAttachedTo && e.target.targetAttachedTo !== target) {
                            e.target.targetAttachedTo.classList.remove("occupied");
                        }
                        e.target.targetAttachedTo = target;
                        snapMade = true;
                    }
                }
            });
            if (!snapMade) {
                if (e.target.targetAttachedTo) {
                    e.target.targetAttachedTo.classList.remove("occupied");
                    e.target.targetAttachedTo = undefined;
                }
                gsap.to(e.target, { duration: 0.1, x: 0, y: 0 });
            }
        }
    });
});
</script> -->
<template>
    <Background>
      <div class="container-fluid">
        <div class="row justify-content-center">
          <div class="col-10">
            <div class="container-fluid">
              <div class="row">
                <div class="col-12">
                  <span style="font-size: 1.5rem;">lives:</span>
                  <img
                    v-for="index in lives"
                    :key="'life' + index"
                    style="margin-left: 2px; margin-right: 2px"
                    src="@/assets/images/pixelateHeart.png"
                    width="20px"
                    height="auto"
                  />
                </div>
              </div>
              <div class="row" id="demo">
                <div class="col-4 source">
                  <h3 style="color: aliceblue">Source</h3>
                  <div
                    v-for="(choice, index) in levels[id].choices"
                    :key="'choice' + index"
                    :class="'box dragger' + (index + 1)"
                  >
                    {{ choice.text }}
                  </div>
                </div>
                <div class="col-7 destination">
                  <h3 style="color: aliceblue">HTML file</h3>
                  <div
                    v-for="(tar, index) in levels[id].destinations"
                    :key="'target' + index + 'key'"
                    :id="'target' + index"
                    class="target"
                  >
                    line{{ index + 1 }}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <!-- Modal for incorrect choices -->
    <Modal
      :isVisible="showModal"
      :message="modalMessage"
      @close="closeModal"
    />
  
    <!-- Game Over Modal -->
    <Modal
      :isVisible="showGameOverModal"
      message="Game Over! Try again?"
      :isGameOver="true"
      @retry="retry"
      @quit="quit"
    />
    </Background> 
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue';
  import { gsap } from 'gsap';
  import { Draggable } from 'gsap/Draggable';
  import { useRoute, useRouter } from 'vue-router';
  import Modal from '@/components/CustomModal.vue';
  
  const lives = ref(3); // Track lives
  const showModal = ref(false); // Control incorrect choice modal visibility
  const showGameOverModal = ref(false); // Control Game Over modal visibility
  const modalMessage = ref(''); // Store modal message
  
  const levels = [
    {
      level: 0,
      name: 'Basic HTML Structure',
      choices: [
        {
          text: '<!DOCTYPE html>',
          role: 'Use to set the document type for the whole file.',
        },
        {
          text: '<html>',
          role: 'html open tag goes on the outer most layer of the html file',
        },
        {
          text: '</html>',
          role: 'html close tag goes on the outer most layer of the html file',
        },
      ],
      destinations: [
        { expect: '<!DOCTYPE html>' },
        { expect: '<html>' },
        { expect: '</html>' },
      ],
    },
    // Other levels...
  ];
  
  const route = useRoute();
  const router = useRouter();
  const id = route.params.id; // Get the dynamic ID from the URL
  
  // Watch lives for Game Over
  watch(lives, (newLives) => {
    if (newLives === 0) {
      showGameOverModal.value = true; // Show Game Over modal
    }
  });
  
  // Register Plugins
  gsap.registerPlugin(Draggable);
  
  onMounted(() => {
    const targets = document.querySelectorAll('.target');
    const overlapThreshold = '50%';
  
    // Store original positions
    const boxes = document.querySelectorAll('.box');
    boxes.forEach((box) => {
      box.originalLeft = box.offsetLeft;
      box.originalTop = box.offsetTop;
    });
  
    Draggable.create('.box', {
      bounds: '#demo',
      edgeResistance: 0.65,
      type: 'x,y',
      inertia: true,
      onDrag() {
        targets.forEach((target) => {
          if (this.hitTest(target, overlapThreshold)) {
            target.classList.add('show-over');
          } else {
            target.classList.remove('show-over');
          }
        });
      },
      onDragEnd(e) {
        let snapMade = false;
        targets.forEach((target, targetIndex) => {
          if (this.hitTest(target, overlapThreshold)) {
            const choiceIndex = Array.from(boxes).indexOf(e.target);
            const choice = levels[id].choices[choiceIndex];
            const expected = levels[id].destinations[targetIndex].expect;
  
            if (choice.text !== expected) {
              lives.value -= 1; // Reduce lives
              modalMessage.value = choice.role; // Set modal message
              showModal.value = true; // Show incorrect choice modal
            }
  
            if (!target.classList.contains('occupied')) {
              target.classList.add('occupied');
              gsap.to(e.target, {
                duration: 0.1,
                x: target.offsetLeft - e.target.offsetLeft,
                y: target.offsetTop - e.target.offsetTop,
              });
              if (e.target.targetAttachedTo && e.target.targetAttachedTo !== target) {
                e.target.targetAttachedTo.classList.remove('occupied');
              }
              e.target.targetAttachedTo = target;
              snapMade = true;
            }
          }
        });
        if (!snapMade) {
          if (e.target.targetAttachedTo) {
            e.target.targetAttachedTo.classList.remove('occupied');
            e.target.targetAttachedTo = undefined;
          }
          gsap.to(e.target, { duration: 0.1, x: 0, y: 0 });
        }
      },
    });
  });
  
  const closeModal = () => {
    showModal.value = false; // Close incorrect choice modal
  };
  
  const retry = () => {
    window.location.reload(); // Refresh the page
  };
  
  const quit = () => {
    router.push('/Levels'); // Navigate to the Levels page
  };
  </script>
  

<style scoped>
body{
 font-family:sans-serif;
}

.box {
    background-color: #91e600;
    text-align: center;
    width: 100%;
    max-width: 150px;
    height: 50px;
    line-height: 50px;
    color: black;
    position: relative;
    border-radius: 10px;
    cursor: grab;
    margin-bottom: 10px;
}

.target {
    background-color: #CCC;
    text-align: center;
    width: 100%;
    max-width: 150px;
    height: 50px;
    line-height: 50px;
    color: black;
    position: relative;
    border-radius: 10px;
    border: 2px dashed #007bff;
    margin-bottom: 10px;
}

.tooltip-box {
    position: absolute;
    background-color: black;
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    top: -30px;
    left: 50%;
    transform: translateX(-50%);
    white-space: nowrap;
    font-size: 12px;
    display: block;
}

#demo {
    width:100%;
    height:auto;
    background-color:rgb(3, 18, 46);
    position:relative;
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 10px;
}

.source{
    background-color: rgb(1, 39, 26);
    border-radius: 3rem;
    padding-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    min-height: 500px;
}

.destination{
    background-color: rgb(68, 43, 6);
    border-radius: 3rem;
    padding-top: 30px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 10px;
    min-height: 500px;
}

.show-over{
    background-color: red;
    /* max-width: 150px; */
}
</style>

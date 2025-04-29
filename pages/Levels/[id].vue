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
      <div class="page-content">
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
                      style="margin-left: 2px; margin-right: 2px;width: 20px;height: auto;"
                      src="@/assets/images/pixelateHeart.png"
                    />
                    <h5>{{ timesComplete }}</h5>
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
  
    <!-- Congratulatory Modal -->
    <Modal
      :isVisible="showCongratulatoryModal"
      message="Congratulations! You completed the level!"
      :isCongratulatory="true"
      @continue="levelComplete"
    />
    </Background>  
  </template>
  
  <script setup>
  import { ref, onMounted, watch } from 'vue';
  import { gsap } from 'gsap';
  import { Draggable } from 'gsap/Draggable';
  import { useRoute, useRouter } from 'vue-router';
  import Modal from '@/components/CustomModal.vue';
  import { useExp } from '@/composables/useEXP'; // Import the useExp composable

  const { EXP, incrementExp, resetExp } = useExp(); // Use the composable
  const lives = ref(3); // Track lives
  const showModal = ref(false); // Control incorrect choice modal visibility
  const showGameOverModal = ref(false); // Control Game Over modal visibility
  const showCongratulatoryModal = ref(false); // Control congratulatory modal visibility
  const modalMessage = ref(''); // Store modal message
  const timesComplete = ref(0); // Track how many times the level is completed
  
  const levels = [
    {
        level: 0,
        EXPonComplete: 10,
        timesToComplete: 3,
        name: 'Basic HTML Structure',
        choices: [
            { text: '<!DOCTYPE html>', role: 'Declares the document type and version (HTML5).\nThis should be at the very top of the HTML file before any other content.' },
            { text: '<html>', role: 'Defines the root of the HTML document.\nThis should be just under <!DOCTYPE html> and wrap all content.' },
            { text: '</html>', role: 'Closes the HTML document.\nThis should be the last tag in the file.' },
        ],
        destinations: [
            { expect: '<!DOCTYPE html>' },
            { expect: '<html>' },
            { expect: '</html>' },
        ],
    },
    {
        level: 1,
        EXPonComplete: 90,
        timesToComplete: 3,
        name: 'Adding Head and Body',
        choices: [
            { text: '<!DOCTYPE html>', role: 'Declares the document type and version (HTML5).\nThis should be at the very top of the HTML file before any other content.' },
            { text: '<html>', role: 'Defines the root of the HTML document.\nThis should be just under <!DOCTYPE html> and wrap all content.' },
            { text: '</html>', role: 'Closes the HTML document.\nThis should be the last tag in the file.' },
            { text: '<head>', role: 'Contains metadata, links to stylesheets, and scripts.\nThis should be placed directly under <html> before <body>.' },
            { text: '</head>', role: 'Closes the <head> section.\nThis should be placed just before the <body> tag.' },
            { text: '<body>', role: 'Contains the visible page content such as text, images, and links.\nThis should be placed directly after </head>.' },
            { text: '</body>', role: 'Closes the <body> section.\nThis should be placed just before </html>.' },
        ],
        destinations: [
            { expect: '<!DOCTYPE html>' },
            { expect: '<html>' },
            { expect: '<head>' },
            { expect: '</head>' },
            { expect: '<body>' },
            { expect: '</body>' },
            { expect: '</html>' },
        ],
    },
    {
        level: 2,
        EXPonComplete: 900,
        timesToComplete: 3,
        name: 'Adding Content to the Head',
        choices: [
            { text: '<title>', role: 'Defines the title of the document shown in the browser tab.\nThis should be placed inside <head>.' },
            { text: '</title>', role: 'Closes the <title> element.\nMust be placed immediately after <title>.' },
            { text: '<meta charset="UTF-8">', role: 'Specifies the character encoding for the document (UTF-8 recommended).\nShould be placed inside <head>.' },
            { text: '<meta name="viewport" content="width=device-width, initial-scale=1.0">', role: 'Ensures proper scaling and responsiveness on mobile devices.\nShould be placed inside <head>.' },
            { text: '<link rel="stylesheet" href="styles.css">', role: 'Links an external CSS file to the document.\nShould be placed inside <head>.' },
        ],
        destinations: [
            { expect: '<title>' },
            { expect: '</title>' },
            { expect: '<meta charset="UTF-8">' },
            { expect: '<meta name="viewport" content="width=device-width, initial-scale=1.0">' },
            { expect: '<link rel="stylesheet" href="styles.css">' },
        ],
    },
    {
        level: 3,
        EXPonComplete: 9000,
        timesToComplete: 3,
        name: 'Adding Content to the Body',
        choices: [
            { text: '<h1>', role: 'Defines a top-level heading.\nShould be placed inside <body>.' },
            { text: '</h1>', role: 'Closes the <h1> element.\nMust be placed immediately after its content.' },
            { text: '<p>', role: 'Defines a paragraph of text.\nShould be placed inside <body>.' },
            { text: '</p>', role: 'Closes the <p> element.\nMust be placed immediately after its content.' },
            { text: '<img src="image.jpg" alt="A sample image">', role: 'Embeds an image into the document.\nShould be placed inside <body>.' },
            { text: '<a href="https://example.com">', role: 'Defines a hyperlink to another page.\nShould be placed inside <body>.' },
            { text: '</a>', role: 'Closes the <a> element.\nMust be placed immediately after its content.' },
        ],
        destinations: [
            { expect: '<h1>' },
            { expect: '</h1>' },
            { expect: '<p>' },
            { expect: '</p>' },
            { expect: '<img src="image.jpg" alt="A sample image">' },
            { expect: '<a href="https://example.com">' },
            { expect: '</a>' },
        ],
    },
    {
        level: 4,
        EXPonComplete: 10000,
        timesToComplete: 3,
        name: 'Adding Attributes and Styling',
        choices: [
            { text: '<h1 class="main-title">', role: 'Adds a class attribute for styling.\nShould be placed inside <body>.' },
            { text: '<p id="intro">', role: 'Adds a unique ID to a paragraph for styling or scripting.\nShould be placed inside <body>.' },
            { text: '<img src="image.jpg" alt="A sample image" style="width:100px;">', role: 'Adds inline styling to an image element.\nShould be placed inside <body>.' },
            { text: '<a href="https://example.com" target="_blank">', role: 'Opens the link in a new tab using the target attribute.\nShould be placed inside <body>.' },
        ],
        destinations: [
            { expect: '<h1 class="main-title">' },
            { expect: '<p id="intro">' },
            { expect: '<img src="image.jpg" alt="A sample image" style="width:100px;">' },
            { expect: '<a href="https://example.com" target="_blank">' },
        ],
    }
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
  
        // Check if all targets are correctly occupied
        if (checkAllTargetsCorrect()) {
          timesComplete.value += 1; // Increment timesComplete
          continueGame()
        }
        if(timesComplete.value == levels[id].timesToComplete){
          showCongratulatoryModal.value = true; // Show congratulatory modal
        }
  
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
  const levelComplete = () => {
    incrementExp(levels[id].EXPonComplete);
    quit();
  }
  // Function to check if all targets are correctly occupied
  const checkAllTargetsCorrect = () => {
    const targets = document.querySelectorAll('.target');
    let allCorrect = true;

    targets.forEach((target, targetIndex) => {
      // Find the box attached to this target
      const attachedBox = Array.from(document.querySelectorAll('.box')).find(
        (box) => box.targetAttachedTo === target
      );

      if (!attachedBox) {
        // If no box is attached to this target, it's not correct
        allCorrect = false;
        return;
      }

      // Find the choice corresponding to the attached box
      const choiceIndex = Array.from(document.querySelectorAll('.box')).indexOf(attachedBox);
      const choice = levels[id].choices[choiceIndex];
      const expected = levels[id].destinations[targetIndex].expect;

      // Check if the choice matches the expected value
      if (choice.text !== expected) {
        allCorrect = false;
      }
    });

    return allCorrect;
  };
  
  // Function to shuffle array
  const shuffleArray = (array) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };
  
  const closeModal = () => {
    showModal.value = false; // Close incorrect choice modal
  };
  
  const retry = () => {
    window.location.reload(); // Refresh the page
  };
  
  const quit = () => {
    router.push('/Levels'); // Navigate to the Levels page
  };
  
  const continueGame = () => {
    showCongratulatoryModal.value = false; // Close congratulatory modal
    shuffleArray(levels[id].choices); // Shuffle choices
    resetDraggables(); // Reset draggables
  };
  
  // Function to reset draggables
  const resetDraggables = () => {
    const boxes = document.querySelectorAll('.box');
    boxes.forEach((box) => {
      gsap.to(box, { duration: 0.1, x: 0, y: 0 });
      box.targetAttachedTo?.classList.remove('occupied');
      box.targetAttachedTo = undefined;
    });
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

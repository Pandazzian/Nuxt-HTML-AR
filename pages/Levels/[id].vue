<template>
    <Background>
      <div class="page-content">
        <div class="container-fluid">
          <div class="row justify-content-center">
            <div class="col-10">
              <div class="container-fluid">
                <div class="row">
                  <div class="col-12 header-row">
                    <div class="header-left">
                      <span class="lives-label">lives:</span>
                      <img
                        v-for="index in lives"
                        :key="'life' + index"
                        class="life-icon"
                        src="@/assets/images/pixelateHeart.png"
                        alt="life"
                      />
                      <h5 class="times-complete">{{ timesComplete }}</h5>
                    </div>
                    <div class="header-right">
                      <button class="instructions-btn" @click="openSlides">How to Play</button>
                    </div>
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

      <!-- Slide / Instruction Modal (click overlay to dismiss) -->
      <div v-if="showSlidesModal" class="slide-overlay" @click.self="closeSlides">
        <div class="slide-modal" role="dialog" aria-modal="true" aria-label="How to play">
          <div class="slide-header">
            <h3>{{ slides[currentSlide].title }}</h3>
            <button class="close-slide" @click="closeSlides" aria-label="Close">&times;</button>
          </div>
          <div class="slide-body">
            <p v-html="slides[currentSlide].body"></p>
          </div>
          <div class="slide-controls">
            <button @click="prevSlide" :disabled="currentSlide === 0">Prev</button>
            <div class="dots">
              <button
                v-for="(s, idx) in slides"
                :key="idx"
                :class="['dot', { active: idx === currentSlide }]"
                @click="currentSlide = idx"
                :aria-label="'Go to slide ' + (idx + 1)"
              />
            </div>
            <button @click="nextSlide">{{ currentSlide < slides.length - 1 ? 'Next' : 'Got it' }}</button>
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

  // Slides modal state
  const showSlidesModal = ref(true); // show before game start
  const currentSlide = ref(0);
  const slides = ref([
    { title: 'Welcome', body: 'Welcome to the HTML assembly game. Drag the tags from the <strong>Source</strong> column to the correct line in the <strong>HTML file</strong> column.' },
    { title: 'How to Play', body: 'Drag a box and drop it onto the target line. If it\'s correct it will snap into place. Incorrect drops will cost a life and show a hint.' },
    { title: 'Tips', body: 'On small screens the layout stacks vertically. Use the <strong>How to Play</strong> button anytime to re-open these instructions.' },
  ]);

  const openSlides = () => { showSlidesModal.value = true; currentSlide.value = 0; };
  const closeSlides = () => { showSlidesModal.value = false; };

  const nextSlide = () => {
    if (currentSlide.value < slides.value.length - 1) currentSlide.value++;
    else closeSlides();
  };
  const prevSlide = () => {
    if (currentSlide.value > 0) currentSlide.value--;
  };

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
          incrementExp(levels[id].EXPonComplete);
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

.header-row {
  display:flex;
  justify-content:space-between;
  align-items:center;
  gap:12px;
  margin-bottom:8px;
}
.header-left { display:flex; align-items:center; gap:8px; }
.header-right { display:flex; align-items:center; gap:8px; }

.instructions-btn {
  background:#007bff;
  color:white;
  border:none;
  padding:8px 12px;
  border-radius:6px;
  cursor:pointer;
}
.instructions-btn:active { transform: translateY(1px); }

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

/* slide modal styles */
.slide-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0,0,0,0.55);
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1200;
  padding: 16px;
}
.slide-modal {
  background: #ffffff;
  max-width: 720px;
  width: 100%;
  border-radius: 10px;
  padding: 16px;
  box-sizing: border-box;
  box-shadow: 0 8px 24px rgba(0,0,0,0.4);
}
.slide-header { display:flex; justify-content:space-between; align-items:center; gap:12px; }
.slide-header h3 { margin:0; }
.close-slide { background:transparent; border:none; font-size:24px; line-height:1; cursor:pointer; }
.slide-body { margin-top:12px; color:#222; min-height:90px; }
.slide-controls { display:flex; align-items:center; justify-content:space-between; gap:12px; margin-top:16px; }
.slide-controls button { padding:8px 12px; border-radius:6px; border:1px solid #ccc; background:#f5f5f5; cursor:pointer; }
.dots { display:flex; gap:6px; align-items:center; justify-content:center; flex:1; }
.dot { width:10px; height:10px; border-radius:50%; background:#ddd; border:none; cursor:pointer; }
.dot.active { background:#007bff; }

/* responsive adjustments for modal */
@media (max-width: 480px) {
  .slide-modal { padding:12px; }
  .slide-body { font-size:14px; }
  .box, .target { max-width: 120px; height:44px; line-height:44px; }
}
</style>
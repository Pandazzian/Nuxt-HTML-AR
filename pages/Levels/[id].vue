<template>  
    <Background>
        <div class="container-fluid">
            <div class="row justify-content-center">
                <div class="col-10">
                    <div class="container-fluid">
                        <div class="row" id="demo">
                            <div class="col-4 source">
                                <h3 style="color: aliceblue;">Source</h3>
                                <div class="box dragger1">{{ "<!DOCTYPE html>" }}</div>
                                <div class="box dragger2">{{"<html>"}}</div>
                                <div class="box dragger3">{{ "</html>" }}</div>
                            </div>
                            <div class="col-7 destination">
                                <h3 style="color: aliceblue;">HTML file</h3>
                                <div id="target1" class="target" @mouseenter="showTooltip(0)" @mouseleave="hideTooltip(0)">
                                    line 1
                                    <div v-if="tooltipVisible[0]" class="tooltip-box">Document Type Declaration</div>
                                </div>
                                <div id="target2" class="target" @mouseenter="showTooltip(1)" @mouseleave="hideTooltip(1)">
                                    line 2
                                    <div v-if="tooltipVisible[1]" class="tooltip-box">Root element of an HTML document.</div>
                                </div>
                                <div id="target3" class="target" @mouseenter="showTooltip(2)" @mouseleave="hideTooltip(2)">
                                    line 3
                                    <div v-if="tooltipVisible[2]" class="tooltip-box">end of root element of an HTML document.</div>
                                </div>
                                <!-- <div id="target2" class="target">Root element of an HTML document.</div>
                                <div id="target3" class="target">end of root element of an HTML document.</div> -->
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

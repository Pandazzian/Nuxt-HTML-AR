<template>
    <div>
      <video ref="video" style="width: 100%;"></video>
      <canvas ref="canvas" style="display: none;"></canvas>
      <div>
        <button @click="startQRScan" :disabled="isScanning">Start Scanning</button>
        <h3>Decoded HTML:</h3>
        <div v-html="decodedHTML"></div>
      </div>
    </div>
  </template>
  
  <script>
    import cv from "@techstark/opencv-js";

  export default {
    data() {
      return {
        decodedHTML: "",
        isScanning: false, // To track if scanning is active
        qrResults: [], // Stores results of all QR codes
      };
    },
    mounted() {
      this.startVideoStream();
    },
    methods: {
      async startVideoStream() {
        const video = this.$refs.video;
  
        try {
          const stream = await navigator.mediaDevices.getUserMedia({
            video: { facingMode: "environment" },
          });
          video.srcObject = stream;
          video.setAttribute("playsinline", true); // Required for iOS Safari
          video.play();
        } catch (error) {
          console.error("Error accessing the camera:", error);
        }
      },
      async startQRScan() {
        if (this.isScanning) return;
  
        this.isScanning = true; // Prevent multiple concurrent scans
  
        const video = this.$refs.video;
        const canvas = this.$refs.canvas;
        const context = canvas.getContext("2d");
  
        const scan = () => {
          if (!this.isScanning) return; // Stop scanning if the flag is reset
  
          if (video.readyState === video.HAVE_ENOUGH_DATA) {
            canvas.width = video.videoWidth;
            canvas.height = video.videoHeight;
            context.drawImage(video, 0, 0, canvas.width, canvas.height);
  
            // Process the frame with OpenCV.js
            const imageData = context.getImageData(
              0,
              0,
              canvas.width,
              canvas.height
            );
  
            const src = cv.matFromImageData(imageData);
            const gray = new cv.Mat();
            cv.cvtColor(src, gray, cv.COLOR_RGBA2GRAY);
  
            const qrDecoder = new cv.QRCodeDetector();
            const results = [];
            const points = new cv.Mat();
            const data = new cv.Mat();
  
            // Detect multiple QR codes
            const found = qrDecoder.detectMulti(gray, points);
            if (found) {
              for (let i = 0; i < points.rows; i++) {
                // Decode each QR code
                const singleQR = qrDecoder.decode(gray, points.row(i));
                results.push({ data: singleQR, position: points.row(i) });
              }
  
              // Sort results by position (left-to-right, top-to-bottom)
              results.sort((a, b) => {
                const ay = a.position[0][1]; // y-coordinate
                const by = b.position[0][1];
                const ax = a.position[0][0]; // x-coordinate
                const bx = b.position[0][0];
  
                return ay === by ? ax - bx : ay - by;
              });
  
              // Append results to `decodedHTML`
              results.forEach((result) => {
                if (result.data) {
                  this.decodedHTML += result.data + "<br/>";
                }
              });
            }
  
            // Clean up
            src.delete();
            gray.delete();
            points.delete();
            data.delete();
          }
  
          requestAnimationFrame(scan); // Keep scanning
        };
  
        scan();
      },
      stopQRScan() {
        this.isScanning = false; // Stop scanning by resetting the flag
      },
    },
    beforeDestroy() {
      // Clean up video stream and scanning on component destroy
      const video = this.$refs.video;
      if (video.srcObject) {
        const stream = video.srcObject;
        const tracks = stream.getTracks();
        tracks.forEach((track) => track.stop());
        video.srcObject = null;
      }
      this.stopQRScan();
    },
  };
  </script>
  

  
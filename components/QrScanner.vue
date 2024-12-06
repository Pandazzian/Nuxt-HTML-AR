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
import jsQR from "jsqr";

export default {
  data() {
    return {
      decodedHTML: "",
      isScanning: false, // To track whether scanning is active
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
    startQRScan() {
      if (this.isScanning) return;

      this.isScanning = true; // Prevent multiple scans

      const video = this.$refs.video;
      const canvas = this.$refs.canvas;
      const context = canvas.getContext("2d");

      const scan = () => {
        if (!this.isScanning) return; // Stop scanning if the flag is reset

        if (video.readyState === video.HAVE_ENOUGH_DATA) {
          canvas.width = video.videoWidth;
          canvas.height = video.videoHeight;
          context.drawImage(video, 0, 0, canvas.width, canvas.height);

          const imageData = context.getImageData(
            0,
            0,
            canvas.width,
            canvas.height
          );
          const qrCode = jsQR(imageData.data, canvas.width, canvas.height);

          if (qrCode) {
            console.log(qrCode.data);
            this.decodedHTML += qrCode.data; // Append decoded HTML snippet
          }
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

<template>
  <div>
    <div class="loader">
      <div class="dot"></div>
      <div class="dot"></div>
      <div class="dot"></div>
    </div>
  </div>
</template>

<script setup>

</script>

<style scoped>
.loader {
  width: 80px;
  height: 40px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.dot {
  width: 15px;
  height: 15px;
  border-radius: 50%;
  background: #abb2b9;
  animation: pulse 1.5s infinite ease-in-out;

  &:nth-child(1) {
    animation-delay: 0s;
    background: #ef476f;
  }
  &:nth-child(2) {
    animation-delay: 0.5s;
    background: #ffd166;
  }
  &:nth-child(3) {
    animation-delay: 1s;
    background: #06d6a0;
  }
}

@keyframes pulse {
  0%, 100% {
    scale: 0.6;
    opacity: 0.5;
  }
  50% {
    scale: 1;
    opacity: 1;
  }
}
</style>
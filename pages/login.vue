<template>
  <div>
    
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'home'
})
</script>

<style scoped>
body {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-image: url('/assets/img/background-library.jpg');
  background-size: cover;
  background-position: center;
}
body::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
}
</style>
<template>
  <div class="wrapper">
    <slot />
  </div>
</template>

<script setup>

</script>

<style scoped>
.wrapper {
  position: relative;
  width: 100%;
  min-height: 100vh;
  background-image: url('/assets/img/background-library.jpg');
  background-size: cover;
  background-position: center;
  overflow: hidden;
  display: flex;
  justify-content: center;
  align-items: center;
}
.wrapper::before {
  content: "";
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(0, 0, 0, 0.6);
}
</style>
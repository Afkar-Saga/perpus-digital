<template>
  <div class="link-container d-flex justify-content-center align-items-center" @click="navigateTo(props.destination)">
    <div class="text-center text-white fs-3 position-relative">{{ props.name }}</div>
  </div>
</template>

<script setup>
const props = defineProps({
  name: String,
  image: String,
  destination: String
})
const imgUrl = getImageUrl(props.image);
const bgUrl = `url(${imgUrl})`;
</script>

<style scoped>
.link-container {
  position: relative;
  width: 100%;
  height: 100%;
  min-height: 200px;
  border-radius: 50px;
  transition: .3s;
  cursor: pointer;
}

.link-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-image: v-bind(bgUrl);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  border-radius: 50px;
  opacity: 0.5;
  transition: .3s;
}

.link-container:hover {
  scale: 1.03;
}

.link-container:hover::before {
  opacity: 0.25;
}
</style>
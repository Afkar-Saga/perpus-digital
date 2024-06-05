<template>
  <NuxtLink class="text-white text-decoration-none" :to="props.destination">
    <div class="link-container d-flex justify-content-center align-items-center" :class="{ overlay: props.overlay }">
      <h3 class="text-center position-relative">{{ props.name }}</h3>
    </div>
  </NuxtLink>
</template>

<script setup>
const props = defineProps({
  name: String,
  image: String,
  overlay: Boolean,
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
  opacity: 0.25;
  transition: .3s;
}
.link-container:hover {
  scale: 1.03;
}
.link-container:hover::before {
  opacity: 0.65;
}
.link-container.overlay {
  border-bottom: 5px solid black;
}
.link-container.overlay::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(55, 44, 34, 0.65);
  opacity: 0.75;
}
.link-container.overlay:hover::before {
  opacity: 0.25;
}
</style>
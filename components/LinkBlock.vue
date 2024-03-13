<template>
  <div class="link-container" :class="{ overlay: props.overlay }">
    <NuxtLink class="text-white text-decoration-none" :to="props.destination">
      <h3>{{ props.name }}</h3>
    </NuxtLink>
  </div>
</template>

<script setup>
const props = defineProps({
  name: String,
  bg: String,
  overlay: Boolean,
  destination: String
})
</script>

<style scoped>
.link-container {
  position: relative;
  width: 376px;
  height: 190px;
  border-radius: 50px;
}
.link-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-size: cover;
  background-image: v-bind(bg);
  opacity: 0.35;
}
.link-container.overlay::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(55, 44, 34, 0.65);
}
</style>
<template>
  <div>
    <NuxtLink class="text-white text-decoration-none" :to="props.destination">
      <div class="link-container d-flex justify-content-center align-items-center py-sm-5" :class="{ overlay: props.overlay }">
        <h3>{{ props.name }}</h3>
      </div>
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
  width: 100%;
  height: 100%;
  border-radius: 50px;
}
.link-container::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-image: v-bind(bg);
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  opacity: 0.25;
  transition: .3s;
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
}
</style>
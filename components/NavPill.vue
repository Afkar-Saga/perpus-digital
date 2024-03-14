<template>
  <div>
    <NuxtLink class="text-center text-decoration-none text-white fw-bold fs-4" :to="props.destination">
      <div class="nav-container container d-flex justify-content-center align-items-center" :class="{ navImage: image }">
        <div class="row">
          <div class="col">{{ props.name }}</div>
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  name: String,
  image: String,
  color: String,
  border: String,
  destination: String
})
</script>

<style scoped>
.nav-container {
  width: 200px;
  height: 100px;
  background: v-bind(color);
  border: v-bind(border);
  border-radius: 95px;
}
.nav-container.nav-image {
  position: relative;
  background-image: v-bind(image);
  background-size: cover;
  background-position: center;
}
.nav-container.nav-image::before {
  content: "";
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(55, 44, 34, 0.65);
}
</style>
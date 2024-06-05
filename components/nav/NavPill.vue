<template>
  <div data-bs-dismiss="offcanvas" data-bs-target="#offcanvasDarkNavbar">
    <NuxtLink class="text-center text-decoration-none text-white fw-bold fs-4" :to="props.destination">
      <div class="nav-container container d-flex justify-content-center align-items-center" :class="{ 'nav-image': image }">
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
  borderStyle: {
    type: String,
    default: '5px solid black'
  },
  destination: String
})
const imgUrl = `url(${getImageUrl(props.image)})`
</script>

<style scoped>
.nav-container {
  width: 200px;
  height: 100px;
  background: v-bind(color);
  border: v-bind(borderStyle);
  border-radius: 95px;
  transition: 0.3s;
}
.nav-container:hover {
  opacity: 0.75;
}
.nav-container.nav-image {
  position: relative;
  background: linear-gradient(rgba(55, 44, 34, 0.65), rgba(55, 44, 34, 0.65)), v-bind(imgUrl);
  background-size: cover;
  background-position: center;
  border: none;
  border-bottom: v-bind(borderStyle);
}
</style>
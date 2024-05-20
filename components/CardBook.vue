<template>
  <div class="card rounded-4 shadow-md">
    <NuxtLink :to="`/buku/${props.id}`" class="text-decoration-none">
      <img :src="props.image" alt="Cover" class="d-block mx-auto">
      <div class="card-body position-relative">
        <p class="card-text text-muted m-0">{{ penulis }}</p>
        <h5 class="card-title text-dark">{{ judul }} 
        </h5>
        <div class="position-absolute bottom-0 end-0 translate-middle" v-if="admin">
          ✏❌
        </div>
      </div>
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  id: Number,
  image: String,
  penulis: String,
  judul: String,
  admin: {
    type: Boolean,
    default: false
  }
})
</script>

<style scoped>
.card {
  width: 90%;
  transition: 0.2s;
}
.card:hover {
  opacity: 0.85;
}
.card img {
  height: 14rem;
}
</style>
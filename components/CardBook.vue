<template>
  <div class="card rounded-4 shadow-md" :class="{ 'admin': props.admin }">
    <NuxtLink :to="`/buku/${props.id}`" class="text-decoration-none">
      <img :src="props.image" alt="Cover" class="d-block mx-auto">
      <div class="card-body">
        <p class="card-text text-muted m-0">{{ penulis }}</p>
        <h5 class="card-title text-dark">{{ judul }} 
        </h5>
      </div>
      <div class="card-footer" v-if="admin">
        ✏❌
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
  transition: 0.2s;
}
.card:not(.admin):hover {
  opacity: 0.85;
}
.card.admin {
  pointer-events: none
}
.card img {
  height: 14rem;
}
</style>
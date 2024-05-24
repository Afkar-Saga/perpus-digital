<template>
  <div class="card flex-fill flex-column rounded-4 shadow-md">
    <NuxtLink :to="props.destination" class="text-decoration-none">
      <img :src="props.image" alt="Cover" class="d-block mx-auto">
      <div class="card-body">
        <p class="card-text text-muted m-0">{{ penulis }}</p>
        <h5 class="card-title text-dark">{{ judul }}
        </h5>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup>
const props = defineProps(['destination', 'judul', 'penulis', 'image'])
const user = useSupabaseUser()
</script>

<style scoped>
.card {
  transition: 0.2s;
}
.card:hover {
  opacity: 0.85;
}
.card img {
  height: 14rem;
}
</style>
<template>
  <div>
    <NuxtLink :to="props.to">
      <div class="back d-inline-block ms-2 mt-2">
        <i class="bi bi-arrow-return-left text-black fs-2"></i>
      </div>
    </NuxtLink>
  </div>
</template>

<script setup>
const props = defineProps(['to'])
</script>

<style scoped>
@import url('~/assets/css/main.css');
</style>
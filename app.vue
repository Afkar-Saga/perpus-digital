<template>
  <div lang="id">
    <NuxtLayout>
      <NuxtPage />
    </NuxtLayout>
  </div>
</template>

<script setup>
useHead({
  titleTemplate: (titleChunk) => {
    return titleChunk ? `${titleChunk} - Perpus Digital SMKN 4 Tasikmalaya` : 'Perpus Digital SMKN 4 Tasikmalaya'
  },
  meta: [
    { name: 'description', content: 'Catatan Kunjungan dan Pencarian Buku Perpustakaan SMKN 4 Tasikmalaya' },
  ],
  htmlAttrs: {
    lang: 'id'
  }
})
</script>

<style>
div {
  overflow: hidden
}
.page-enter-active,
.page-leave-active {
  transition: all 0.4s;
}
.page-enter-from,
.page-leave-to {
  opacity: 0;
  filter: blur(1rem);
}
.layout-enter-active,
.layout-leave-active {
  transition: all 0.4s;
}
.layout-enter-from,
.layout-leave-to {
  opacity: 0;
  translate: 0 -50px;
  scale: 1.1;
}
</style>
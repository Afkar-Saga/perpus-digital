<template>
  <div class="container text-center position-relative d-grid align-content-space-evenly">
    <div class="row">
      <div class="col">
        <h1 class="display-1 text-white">Perpus Digital</h1>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-2">
        <img src="/assets/img/logo-smkn4.png" alt="Logo SMKN 4">
      </div>
      <div class="col-2">
        <img src="/assets/img/books.png" alt="Books">
      </div>
    </div>
    <div class="row">
      <div class="col">
        <p class="lead text-white">
          <span class="fw-bold fst-italic">SMKN 4 Tasikmalaya</span><br>
          Jl. Depok, Sukamenak, Purbaratu
        </p>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col-4">
        <LinkBlock name="Isi Kunjungan" bg="url('/_nuxt/assets/img/library-visit.png')" :overlay="false" destination="/" />
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
    layout: 'home'
})
</script>

<style scoped>
.container {
  height: 100vh;
}
img {
  max-width: 150px;
}
</style>
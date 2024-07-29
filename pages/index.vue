<template>
  <div class="container py-3 py-lg-5 text-center position-relative">
    <div class="row mb-5">
      <div class="col">
        <h1 class="display-2 text-white">Perpustakaan Digital</h1>
      </div>
    </div>
    <div class="row justify-content-center align-items-center mb-5">
      <div class="col-lg-2 col-sm-3 col-4">
        <NuxtImg class="img-fluid" src="/img/logo-smkn4.png" width="150" height="175" alt="Logo SMKN 4" />
      </div>
      <div class="col-lg-2 col-sm-3 col-4">
        <NuxtImg class="img-fluid" src="/img/books.png" width="150" height="125" alt="Books" />
      </div>
    </div>
    <div class="row mb-5">
      <div class="col">
        <p class="lead text-white">
          <span class="fw-bold fst-italic">SMKN 4 Tasikmalaya</span><br>
          Jl. Depok, Sukamenak, Purbaratu
        </p>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col col-lg-4">
        <NavBlock name="Isi Kunjungan" image="library-visit" :overlay="false" destination="/pengunjung/tambah" />
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'home',
})
</script>

<style scoped></style>
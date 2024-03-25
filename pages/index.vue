<template>
  <div>
    <NuxtLink to="/login" class="btn btn-dark position-absolute top-0 end-0 px-4 py-2 m-1 rounded-pill" role="button">Login</NuxtLink>
    <div class="container py-5 text-center position-relative">
      <div class="row">
        <div class="col">
          <h1 class="display-2 text-white">Perpustakaan Digital</h1>
        </div>
      </div>
      <div class="row justify-content-center align-items-center mb-3">
        <div class="col-lg-2 col-sm-3 col-4">
          <img class="img-fluid" src="/assets/img/logo-smkn4.png" alt="Logo SMKN 4">
        </div>
        <div class="col-lg-2 col-sm-3 col-4">
          <img class="img-fluid" src="/assets/img/books.png" alt="Books">
        </div>
      </div>
      <div class="row mb-3">
        <div class="col">
          <p class="lead text-white">
            <span class="fw-bold fst-italic">SMKN 4 Tasikmalaya</span><br>
            Jl. Depok, Sukamenak, Purbaratu
          </p>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-md-4 col-sm-6 col-5">
          <NavBlock name="Isi Kunjungan" image="library-visit.png" :overlay="false" destination="/pengunjung/tambah" />
        </div>
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

</style>
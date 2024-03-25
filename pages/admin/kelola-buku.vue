<template>
  <div>
    <div class="container mt-4 py-4">
      <div class="row mb-3">
        <div class="col">
          <h1 class="fw-bold text-center">Kelola Buku</h1>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col">
          <button class="btn btn-success">+ Tambah Buku</button>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col">
          <input type="text" class="form-control" placeholder="Cari buku berdasarkan judul atau pengarang">
        </div>
      </div>
      <div class="row">
        <div class="col col-sm-6 col-md-4 col-lg-3">
          <CardBook id="1" image="book-bumi.png" judul="Bumi" penulis="Tere Liye" :admin="true" />
        </div>
        <div class="col col-sm-6 col-md-4 col-lg-3">
          <CardBook id="2" image="book-ayah.png" judul="Ayah" penulis="Andrea Hirata" :admin="true" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'admin'
})
</script>

<style scoped>

</style>
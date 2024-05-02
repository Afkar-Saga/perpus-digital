<template>
  <div>
    <div class="container mt-4">
      <div class="row">
        <div class="col text-center">
          <h2>Pencarian Buku 🔍</h2>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <input type="text" class="form-control" placeholder="Cari buku berdasarkan judul atau pengarang">
        </div>
      </div>
      <div class="row align-items-center my-2">
        <div class="col-lg-1 col-2">
          <label for="kode">Kode Rak: </label>
        </div>
        <div class="col-lg-3 col-4">
          <select id="kode" class="form-control form-select">
            <option value="200">200 | Novel</option>
          </select>
        </div>
        <div class="col-lg-1 col-2">
          <label for="kategori">Kategori: </label>
        </div>
        <div class="col-lg-3 col-4">
          <select id="kategori" class="form-control form-select">
            <option value="Novel">Novel</option>
          </select>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <p class="text-black-70">Menampilkan 2 dari 31 buku</p>
        </div>
      </div>
      <div class="row">
        <div class="col col-sm-6 col-md-4 col-lg-3">
          <CardBook id="1" image="book-bumi" penulis="Tere Liye" judul="Bumi" />
        </div>
        <div class="col col-sm-6 col-md-4 col-lg-3">
          <CardBook id="2" image="book-ayah" penulis="Andrea Hirata" judul="Ayah" />
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>

</style>
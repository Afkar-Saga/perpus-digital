<template>
  <div>
    <div class="container mt-4 py-4">
      <div class="row gy-5 gx-5 justify-content-evenly">
        <div class="col-lg-5 col-10">
          <NavBlock name="Riwayat Kunjungan" image="bg-home-kunjungan" :overlay="true" destination="/pengunjung" />
        </div>
        <div class="col-lg-5 col-10">
          <NavBlock name="Pencarian Buku" image="book-search" :overlay="true" destination="/buku" />
        </div>
        <div class="col-lg-5 col-10">
          <NavBlock name="Detail Statistik" image="statistics" :overlay="true" destination="/admin/statistik" />
        </div>
        <div class="col-lg-5 col-10">
          <NavBlock name="Kelola Buku" image="manage-books" :overlay="true" destination="/admin/kelola-buku" />
        </div>
      </div>
      <div class="row my-4">
        <div class="col">
          <h2 class="fw-bold text-center">STATISTIK</h2>
        </div>
      </div>
      <div class="row gy-5 justify-content-evenly">
        <div class="col-lg-5 col-10">
          <div class="stats pengunjung">
            <span class="total">97</span>
            <span class="info">Pengunjung</span>
          </div>
        </div>
        <div class="col-lg-5 col-10">
          <div class="stats buku">
            <span class="total">31</span>
            <span class="info">Buku</span>
          </div>
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
.stats {
  color: white;
  padding: 1em 2em;
  border-radius: 20px;
}
.pengunjung {
  background-color: #EC8F00;
}
.buku {
  background-color: #810000;
}
.stats .total {
  font-size: 5em;
  font-weight: bold;
}
.stats .info {
  font-size: 2em;
  margin-left: 0.5em;
}
</style>
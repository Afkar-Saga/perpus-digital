<template>
  <div>
    <div class="container mt-4 py-4">
      <div class="row mb-3">
        <div class="col">
          <h1 class="fw-bold text-center">Statistik Pengunjung</h1>
        </div>
      </div>
      <div class="row justify-content-between">
        <div class="col-md-3 col-6">
          <div class="stats-container">
            <h4 class="info">Total Pengunjung</h4>
            <h2 class="stats">97</h2>
          </div>
        </div>
        <div class="col-md-3 col-6">
          <div class="stats-container">
            <h4 class="info">Pengunjung Bulan Ini</h4>
            <h2 class="stats">4</h2>
          </div>
        </div>
        <div class="col-md-3 col-6">
          <div class="stats-container"></div>
        </div>
        <div class="col-md-3 col-6">
          <div class="stats-container"></div>
        </div>
      </div>
      <div class="row">
        <div class="col-md-6 col-9">

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
.stats-container {
  background-color: #fafafa;
  width: 100%;
  height: 100%;
  padding: 1em;
  border-radius: 20px;
}
.info {
  font-size: 1.2em;
}
.stats {
  font-size: 3em;
  font-weight: bold;
}
</style>
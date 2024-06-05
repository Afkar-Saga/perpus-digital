<template>
  <div class="wrapper">
    <Header>
      <ul class="navbar-nav">
        <li v-if="route.name == 'pengunjung'" class="nav-item">
          <NavPill name="Pencarian Buku" image="book-search" destination="/buku" />
        </li>
        <li v-if="['buku', 'buku-id'].includes(route.name)" class="nav-item">
          <NavPill name="Riwayat Kunjungan" image="bg-home-kunjungan" destination="/pengunjung" />
        </li>
      </ul>
      <hr class="d-lg-none my-2 text-white-50">
      <ul class="navbar-nav ms-lg-3">
        <li v-if="['pengunjung', 'buku', 'buku-id'].includes(route.name)" class="nav-item">
          <NavPill name="SELESAI" color="linear-gradient(#5FAA68, #56A549)" border-style="1px solid green"
            destination="/" />
        </li>
      </ul>
    </Header>
    <slot></slot>
  </div>
</template>

<script setup>
const route = useRoute()
</script>

<style scoped>
.wrapper {
  width: 100%;
  min-height: 100vh;
  background-image: linear-gradient(to top, #e6b980 0%, #eacda3 100%);
  overflow: hidden;
}
</style>
<template>
  <div class="wrapper">
    <Header>
      <li v-if="['pengunjung', 'buku', 'buku-id'].includes(route.name)" class="nav-item">
        <NavPill name="SELESAI" color="linear-gradient(#5FAA68, #56A549)" border-style="1px solid green"
          destination="/" />
      </li>
      <li v-if="route.name == 'pengunjung'" class="nav-item">
        <NavPill name="Pencarian Buku" image="book-search" destination="/buku" />
      </li>
      <li v-if="['buku', 'buku-id'].includes(route.name)" class="nav-item">
        <NavPill name="Riwayat Kunjungan" image="bg-home-kunjungan" destination="/pengunjung" />
      </li>
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
  background: linear-gradient(#ECDDAE, #ECCFAE);
  overflow: hidden;
}
</style>
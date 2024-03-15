<template>
  <div class="wrapper">
    <Header>
      <li v-if="['pengunjung', 'buku', 'buku-id'].includes(route.name)" class="nav-item">
        <NavPill name="SELESAI" color="linear-gradient(#5FAA68, #56A549)" border="1px solid green" destination="/" />
      </li>
      <li v-if="route.name == 'pengunjung'" class="nav-item">
        <NavPill name="Pencarian Buku" image="url('/_nuxt/assets/img/book-search.jpg')" destination="/buku" />
      </li>
      <li v-if="['buku', 'buku-id'].includes(route.name)" class="nav-item">
        <NavPill name="Riwayat Kunjungan" image="url('/_nuxt/assets/img/bg-home-kunjungan.jpeg')" destination="/pengunjung" />
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
  background-color: #ECDDAE;
}
</style>
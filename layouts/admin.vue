<template>
  <div>
    <div class="wrapper">
      <Header>
        <li v-if="['admin', 'admin-kelola-buku', 'admin-statistik'].includes(route.name)" class="nav-item">
          <NavPill name="LOGOUT" color="linear-gradient(#CE2828, #BB1313)" border-style="1px solid #810000" destination="/" />
        </li>
        <div class="navbar" v-if="['admin-kelola-buku', 'admin-statistik'].includes(route.name)">
          <ul class="nav nav-pills nav-fills">
            <li class="nav-item">
              <NuxtLink class="nav-link" to="/admin">Dashboard</NuxtLink>
            </li>
            <li class="nav-item" v-if="route.name == 'admin-statistik'">
              <NuxtLink class="nav-link" to="/admin/kelola-buku">Kelola Buku</NuxtLink>
            </li>
            <li class="nav-item" v-if="route.name == 'admin-kelola-buku'">
              <NuxtLink class="nav-link" to="/admin/statistik">Statistik</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink class="nav-link" to="/pengunjung">Riwayat Kunjungan</NuxtLink>
            </li>
            <li class="nav-item">
              <NuxtLink class="nav-link" to="/buku">Cari Buku</NuxtLink>
            </li>
          </ul>
        </div>
      </Header>
      <slot></slot>
    </div>
  </div>
</template>

<script lang="ts" setup>
const route = useRoute()
</script>

<style scoped>
.wrapper {
  width: 100%;
  min-height: 100vh;
  background: linear-gradient(#E3F5E0, #708F7C);
}
a {
  color: #BFBFBF;
}
</style>
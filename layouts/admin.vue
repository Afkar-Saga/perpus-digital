<template>
  <div class="wrapper">
    <Header>
      <li class="nav-item">
        <NavPill name="LOGOUT" color="linear-gradient(#CE2828, #BB1313)" border-style="1px solid #810000" destination="/logout" />
      </li>
      <ul class="navbar-nav flex-fill justify-content-around align-items-center">
        <li class="nav-item" v-if="route.name != 'admin'">
          <NuxtLink class="nav-link" to="/admin">Dashboard</NuxtLink>
        </li>
        <li class="nav-item" v-if="route.name != 'admin-kelola-buku'">
          <NuxtLink class="nav-link" to="/admin/kelola-buku">Kelola Buku</NuxtLink>
        </li>
        <li class="nav-item" v-if="route.name != 'admin-statistik'">
          <NuxtLink class="nav-link" to="/admin/statistik">Statistik</NuxtLink>
        </li>
        <li class="nav-item" v-if="route.name != 'pengunjung'">
          <NuxtLink class="nav-link" to="/pengunjung">Riwayat Kunjungan</NuxtLink>
        </li>
        <li class="nav-item" v-if="route.name != 'buku'">
          <NuxtLink class="nav-link" to="/buku">Cari Buku</NuxtLink>
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
  background: linear-gradient(#E3F5E0, #708F7C);
}
a {
  color: #BFBFBF;
}
</style>
<template>
  <div class="wrapper">
    <Header>
      <ul class="navbar-nav flex-fill flex-row flex-wrap align-items-center">
        <li class="nav-item col-6 col-lg-auto" v-if="route.name != 'admin'">
          <div data-bs-dismiss="offcanvas" data-bs-target="#offcanvasDarkNavbar">
            <NuxtLink class="nav-link px-lg-3" to="/admin">Dashboard</NuxtLink>
          </div>
        </li>
        <li class="nav-item col-6 col-lg-auto" v-if="route.name != 'admin-buku'">
          <div data-bs-dismiss="offcanvas" data-bs-target="#offcanvasDarkNavbar">
            <NuxtLink class="nav-link px-lg-3" to="/admin/buku">Kelola Buku</NuxtLink>
          </div>
        </li>
        <li class="nav-item col-6 col-lg-auto" v-if="route.name != 'admin-statistik'">
          <div data-bs-dismiss="offcanvas" data-bs-target="#offcanvasDarkNavbar">
            <NuxtLink class="nav-link px-lg-3" to="/admin/statistik">Statistik</NuxtLink>
          </div>
        </li>
        <li class="nav-item col-6 col-lg-auto" v-if="route.name != 'pengunjung'">
          <div data-bs-dismiss="offcanvas" data-bs-target="#offcanvasDarkNavbar">
            <NuxtLink class="nav-link px-lg-3" to="/pengunjung">Riwayat Kunjungan</NuxtLink>
          </div>
        </li>
        <li class="nav-item col-6 col-lg-auto" v-if="route.name != 'buku'">
          <div data-bs-dismiss="offcanvas" data-bs-target="#offcanvasDarkNavbar">
            <NuxtLink class="nav-link px-lg-3" to="/buku">Cari Buku</NuxtLink>
          </div>
        </li>
      </ul>
      <hr class="d-lg-none my-2 text-white-50">
      <ul class="navbar-nav ms-lg-3">
        <li class="nav-item">
          <NavPill name="LOGOUT" color="linear-gradient(#CE2828, #BB1313)" border-style="1px solid #810000" destination="/logout" />
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
  background-image: linear-gradient(to top, #0ba360 0%, #3cba92 100%);
}
a {
  color: #BFBFBF;
}
</style>
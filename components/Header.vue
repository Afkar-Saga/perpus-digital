<template>
  <div>
    <header>
      <nav class="navbar navbar-expand-lg navbar-dark sticky-top">
        <div class="container-xxl flex-wrap flex-lg-nowrap">
          <a href="https://www.smkn4-tsm.sch.id" class="navbar-brand">
            <NuxtImg src="/img/logo-smkn4.png" alt="Logo SMKN 4" />
          </a>
          <button class="navbar-toggler ms-auto" type="button" data-bs-toggle="offcanvas" data-bs-target="#offcanvasDarkNavbar" aria-controls="offcanvasDarkNavbar" aria-label="Toggle navigation">
            <span class="navbar-toggler-icon"></span>
          </button>
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <div class="navbar-text text-white">
              <h4>Perpus Digital</h4>
              <address>
                SMKN 4 Tasikmalaya<br>
                Jl. Depok, Sukamenak, Purbaratu
              </address>
            </div>
          </div>
          <div class="offcanvas-lg offcanvas-end" tab-index="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
            <div class="offcanvas-header">
              <h5 class="offcanvas-title text-white" id="offcanvasDarkNavbarLabel">Perpus Digital</h5>
              <button type="button" data-bs-dismiss="offcanvas" aria-label="Close" class="btn-close btn-close-white" data-bs-target="#offcanvasDarkNavbar"></button>
            </div>
            <div class="offcanvas-body">
              <hr class="d-lg-none text-white-50">
              <slot></slot>
            </div>
          </div>
        </div>
      </nav>
    </header>
  </div>
</template>

<script setup>

</script>

<style scoped>
nav, .offcanvas-lg {
  background-color: #013320;
}
img {
  max-width: 80px;
}
</style>
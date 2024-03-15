<template>
  <div>
    <header>
      <!-- <div class="container-fluid">
        <div class="row py-1">
          <div class="col-lg-1 col-sm-2 col-3">
            <img class="img-fluid m-2" src="/assets/img/logo-smkn4.png" alt="Logo SMKN 4">
          </div>
          <div class="col-md-3 col-7 ms-2 text-white">
            <div class="row row-cols-1">
              <div class="col">
                <h4 class="mt-2">Perpus Digital</h4>
              </div>
              <div class="col">
                SMKN 4 Tasikmalaya
              </div>
              <div class="col">
                Jl. Depok, Sukamenak, Purbaratu
              </div>
            </div>
          </div>
          <div class="col-auto ms-auto">
            <nav class="navbar navbar-expand-lg d-flex flex-row-reverse gap-3">
              <slot />
            </nav>
          </div>
        </div>
      </div> -->
      <nav class="navbar navbar-expand-lg navbar-dark sticky-top">
        <div class="container-fluid justify-content-start nowrap">
          <a href="https://www.smkn4-tsm.sch.id" class="navbar-brand">
            <img src="/assets/img/logo-smkn4.png" alt="Logo SMKN 4">
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
          <div class="collapse navbar-collapse" id="navbarSupportedContent">
            <div class="offcanvas offcanvas-end text-bg-dark" tab-index="-1" id="offcanvasDarkNavbar" aria-labelledby="offcanvasDarkNavbarLabel">
              <div class="offcanvas-header">
                <h5 class="offcanvas-title" id="offcanvasDarkNavbarLabel">Perpus Digital</h5>
                <button type="button" data-bs-dismiss="offcanvas" aria-label="Close" class="btn-close btn-close-white"></button>
              </div>
              <div class="offcanvas-body">
                <ul class="navbar-nav flex-row-reverse flex-grow-1 pe-3 gap-3">
                  <slot></slot>
                </ul>
              </div>
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
nav {
  background-color: #013320;
}
img {
  max-width: 80px;
}
</style>
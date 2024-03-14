<template>
  <div>
    <header class="sticky-top">
      <div class="container-fluid">
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
          <div class="col-auto">
            <nav class="navbar">
              <slot />
            </nav>
          </div>
        </div>
      </div>
    </header>
  </div>
</template>

<script setup>

</script>

<style scoped>
header {
  background-color: #013320;
  max-height: 120px;
}
img {
  max-width: 80px;
}
</style>
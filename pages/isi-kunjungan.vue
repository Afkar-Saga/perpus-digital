<template>
  <div>
    <div class="container mt-4">
      <div class="row justify-content-center">
        <div class="col-md-8 col-sm-10">
          <Form @submit-event.once="isiKunjungan">
            <div class="row py-4">
              <div class="col text-center">
                <h3>Silakan Isi Buku Kunjungan ✍🏻</h3>
              </div>
            </div>
            <div class="row mb-4">
              <div class="col">
                <input type="text" class="form-control" placeholder="Nama">
              </div>
            </div>
            <div class="row mb-4">
              <div class="col">
                <select class="form-control form-select">
                  <option disabled value="">Kategori</option>
                  <option></option>
                </select>
              </div>
            </div>
            <div class="row rowcols-3 mb-4">
              <div class="col">
                <select class="form-control form-select">
                  <option disabled selected value="">Tingkat</option>
                  <option>X</option>
                  <option>XI</option>
                  <option>XII</option>
                </select>
              </div>
              <div class="col">
                <select class="form-control form-select">
                  <option disabled selected value="">Jurusan</option>
                  <option>TJKT</option>
                  <option>PPLG</option>
                  <option>TSM</option>
                  <option>DKV</option>
                  <option>TOI</option>
                </select>
              </div>
              <div class="col">
                <select class="form-control form-select">
                  <option disabled selected value="">Kelas</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                </select>
              </div>
            </div>
            <div class="row mb-4">
              <div class="col">
                <select class="form-control form-select">
                  <option disabled selected value="">Keperluan</option>
                  <option></option>
                </select>
              </div>
            </div>
            <div class="row mb-4">
              <div class="col">
                <input type="text" class="form-control" placeholder="Tulis Keperluan Kamu..">
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
function isiKunjungan() {
  navigateTo('/riwayat')
}
</script>

<style scoped>

</style>
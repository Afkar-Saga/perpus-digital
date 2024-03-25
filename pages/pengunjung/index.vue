<template>
  <div>
    <div class="container mt-4">
      <div class="row">
        <div class="col text-center">
          <h2>Riwayat Kunjungan 📝</h2>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <p class="text-black-70">Menampilkan 1 dari 1 pengunjung</p>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col">
          <div class="table-responsive rounded-3">
            <table class="table table-dark table-bordered">
              <thead class="align-top text-center fw-bold">
                <tr>
                  <td rowspan="2">No</td>
                  <td rowspan="2">Tanggal</td>
                  <td rowspan="2">Jam</td>
                  <td rowspan="2">Nama</td>
                  <td rowspan="2">Kelas</td>
                  <td colspan="4">Keanggotaan</td>
                  <td rowspan="2" colspan="2">Keperluan</td>
                </tr>
                <tr>
                  <td>Siswa</td>
                  <td>Guru</td>
                  <td>Staf</td>
                  <td>Umum</td>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>1</td>
                  <td>Sekarang</td>
                  <td>Saat ini</td>
                  <td>Afkar Sukmawan Ahmad</td>
                  <td>XI PPLG 3</td>
                  <td>✔</td>
                  <td></td>
                  <td></td>
                  <td></td>
                  <td>Shooting Video</td>
                  <td>📝</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>
table {
  border-color: #555;
}
table thead tr td {
  background-color: #404040;
}
table tbody tr td {
  background-color: #363636;
}
</style>
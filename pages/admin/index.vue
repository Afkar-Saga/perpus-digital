<template>
  <div class="container py-3 py-lg-5">
    <div class="row g-5 justify-content-evenly">
      <div class="col-12 col-lg-5">
        <NavBlock name="Riwayat Kunjungan" image="bg-home-kunjungan" :overlay="true" destination="/pengunjung" />
      </div>
      <div class="col-12 col-lg-5">
        <NavBlock name="Pencarian Buku" image="book-search" :overlay="true" destination="/buku" />
      </div>
      <div class="col-12 col-lg-5">
        <NavBlock name="Detail Statistik" image="statistics" :overlay="true" destination="/admin/statistik" />
      </div>
      <div class="col-12 col-lg-5">
        <NavBlock name="Kelola Buku" image="manage-books" :overlay="true" destination="/admin/buku" />
      </div>
    </div>
    <div class="row my-4">
      <div class="col">
        <h2 class="fw-bold text-center">STATISTIK</h2>
      </div>
    </div>
    <div class="row gy-5 justify-content-evenly">
      <div class="col-12 col-lg-5">
        <div class="stats pengunjung">
          <span class="total">{{ totalVisitors }}</span>
          <span class="info">Pengunjung</span>
        </div>
      </div>
      <div class="col-12 col-lg-5">
        <div class="stats buku">
          <span class="total">{{ totalBooks }}</span>
          <span class="info">Buku</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})
useHead({
  title: 'Admin Dashboard'
})

const supabase = useSupabaseClient()

const { data: totalVisitors } = useAsyncData('visitors', async () => {
  const { count, error } = await supabase.from('pengunjung').select('*', { count: 'exact', head: true })
  if (error) throw error
  return count
})
const { data: totalBooks } = useAsyncData('books', async () => {
  const { count, error } = await supabase.from('buku').select('*', { count: 'exact', head: true })
  if (error) throw error
  return count
})
</script>

<style scoped>
.stats {
  color: white;
  padding: 1em 2em;
  border-radius: 20px;
}

.pengunjung {
  background-image: linear-gradient(107.7deg, rgba(235, 230, 44, 0.55) 8.4%, rgba(252, 152, 15, 1) 90.3%);
}

.buku {
  background-image: radial-gradient(circle 986.6px at 10% 20%, rgba(251, 6, 6, 0.94) 0%, rgba(3, 31, 213, 1) 82.8%, rgba(248, 101, 248, 1) 87.9%);
}

.stats .total {
  font-size: 5em;
  font-weight: bold;
}

.stats .info {
  font-size: 2em;
  margin-left: 0.5em;
}
</style>
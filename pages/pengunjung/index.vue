<template>
  <div class="container py-3 py-lg-5">
    <div class="row mb-3">
      <div class="col text-center">
        <h2>Riwayat Kunjungan 📝</h2>
      </div>
    </div>
    <div class="row gy-3 mb-3">
      <div class="col-12 col-lg">
        <input type="text" v-model="search" class="form-control"
          placeholder="Cari pengunjung berdasarkan nama atau kelas" @input="refresh">
      </div>
      <div class="col-auto d-flex align-items-center ms-lg-auto">
        <label for="limit">Pengunjung per Halaman: </label>
      </div>
      <div class="col-3 col-lg-1">
        <select v-model="limit" id="limit" class="form-control form-select" @change="refresh">
          <option :value="5">5</option>
          <option :value="10">10</option>
          <option :value="20">20</option>
        </select>
      </div>
    </div>
    <div class="row" v-if="totalStatus == 'success'">
      <div class="col">
        <p class="text-black-70">Menampilkan {{ page * limit + 1 }}-{{ Math.min((page + 1) * limit, totalVisitors)
          }} dari {{ totalVisitors }} pengunjung</p>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col">
        <div class="table-responsive rounded-3 position-relative">
          <table class="table table-dark table-bordered">
            <thead class="align-middle text-center fw-bold">
              <tr>
                <th rowspan="2">No</th>
                <th rowspan="2">Tanggal</th>
                <th rowspan="2">Jam</th>
                <th rowspan="2" style="min-width: 160px;">Nama</th>
                <th rowspan="2">Kelas</th>
                <th colspan="4">Keanggotaan</th>
                <th rowspan="2">Keperluan</th>
                <th rowspan="2">Actions</th>
              </tr>
              <tr>
                <td>Siswa</td>
                <td>Guru</td>
                <td>Staf</td>
                <td>Umum</td>
              </tr>
            </thead>
            <tbody>
              <tr v-if="status == 'pending'" v-for="n in limit" :key="'pending-' + n">
                <td colspan="11" class="text-center text-secondary">
                  <span class="placeholder-glow w-100">Memuat data...</span>
                </td>
              </tr>
              <tr v-else v-for="(pengunjung, index) in paddedVisitors" :key="index">
                <td>{{ page * limit + index + 1 }}</td>
                <td>{{ pengunjung?.created_at?.split('T')[0] || '' }}</td>
                <td>{{ pengunjung?.created_at?.split('T')[1]?.split('.')[0] || '' }}</td>
                <td>{{ pengunjung?.nama || '' }}</td>
                <td>{{ pengunjung?.kelas || '' }}</td>
                <td><span v-if="pengunjung?.keanggotaan?.nama == 'Siswa'">✔</span></td>
                <td><span v-if="pengunjung?.keanggotaan?.nama == 'Guru'">✔</span></td>
                <td><span v-if="pengunjung?.keanggotaan?.nama == 'Staf'">✔</span></td>
                <td><span v-if="pengunjung?.keanggotaan?.nama == 'Umum'">✔</span></td>
                <td>{{ pengunjung?.keperluan?.nama || pengunjung?.keperluan_lain || '' }}</td>
                <td>
                  <div v-if="pengunjung" class="edit" @click="navigateTo(`/pengunjung/${pengunjung.id}`)">📝</div>
                </td>
              </tr>
              <tr v-if="status == 'error'">
                <td colspan="11" class="text-center text-danger">
                  {{ error?.message || 'Terjadi kesalahan saat memuat data.' }}
                  <button class="btn btn-link" @click="refresh">Coba Lagi</button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="row justify-content-center my-4">
      <div class="col-auto">
        {{ page + 1 }}/{{ pageLimit + 1 }}
      </div>
    </div>
    <div class="row justify-content-center my-4" v-if="totalStatus == 'success'">
      <div class="col-auto">
        <nav>
          <ul class="pagination pagination-dark mb-0">
            <li class="page-item" :class="{ disabled: page === 0 }">
              <button class="page-link" @click="goToPage(0)" :disabled="page === 0">«</button>
            </li>
            <li class="page-item" :class="{ disabled: page === 0 }">
              <button class="page-link" @click="previousPage" :disabled="page === 0">‹</button>
            </li>
            <li v-for="n in pageLimit + 1" :key="n" class="page-item" :class="{ active: page === n - 1 }">
              <button class="page-link" @click="goToPage(n - 1)">{{ n }}</button>
            </li>
            <li class="page-item" :class="{ disabled: page === pageLimit }">
              <button class="page-link" @click="nextPage" :disabled="page === pageLimit">›</button>
            </li>
            <li class="page-item" :class="{ disabled: page === pageLimit }">
              <button class="page-link" @click="goToPage(pageLimit)" :disabled="page === pageLimit">»</button>
            </li>
          </ul>
        </nav>
      </div>
    </div>
    <Loader :show="showLoader" />
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'layout'
})
useHead({
  title: 'Riwayat Kunjungan'
})

const supabase = useSupabaseClient()

const page = ref(0)
const limit = ref(5)
const pageLimit = computed(() => {
  return totalVisitors.value == 0 ? 0 : Math.ceil(totalVisitors.value / limit.value) - 1
})

const nextPage = () => {
  if (page.value >= pageLimit.value) return
  page.value += 1
  refresh()
}
const previousPage = () => {
  if (page.value <= 0) return
  page.value -= 1
  refresh()
}
const goToPage = (n) => {
  if (n < 0 || n > pageLimit.value) return
  page.value = n
  refresh()
}

const search = ref('')

const { data: visitors, status, error, refresh } = useAsyncData('visitors', async () => {
  const { from, to } = getPagination(page.value, limit.value)
  let query = supabase.from('pengunjung').select(`
    *,
    keanggotaan ( nama ),
    keperluan ( nama )
  `)
  if (search.value) query = query.or(`nama.ilike.%${search.value}%, kelas.ilike.%${search.value}%`)
  query = query.order('created_at', { ascending: false }).range(from, to)
  const { data, error } = await query
  if (error) throw new Error("Gagal memuat data pengunjung.")
  return data
}, {
  immediate: false
})

const paddedVisitors = computed(() => {
  const arr = visitors.value || []
  const pad = Array(limit.value - arr.length).fill(null)
  return [...arr, ...pad]
})

const { data: totalVisitors, status: totalStatus } = useAsyncData('totalVisitors', async () => {
  let query = supabase.from('pengunjung').select(`
    *,
    keanggotaan ( nama ),
    keperluan ( nama )
  `, { count: 'exact', head: true })
  if (search.value) query = query.or(`nama.ilike.%${search.value}%, kelas.ilike.%${search.value}%`)
  const { count, error } = await query
  if (error) console.error(error)
  return count || 0
}, {
  watch: search
})

onMounted(() => {
  clearNuxtData('visitors')
  refresh()
})

watch([search, limit], () => {
  page.value = 0
})

const showLoader = useDelayedLoader(status)
</script>

<style scoped>
@import url('~/assets/css/main.css');

.edit {
  display: inline-block;
  cursor: pointer;
  transition: .3s;

  &:hover {
    scale: 1.1;
    translate: 3px 0;
    rotate: 15deg;
  }
}
</style>
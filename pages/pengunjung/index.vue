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
    <div class="row">
      <div class="col">
        <p class="text-black-70">Menampilkan {{ visitors?.length }} dari {{ totalVisitors }} pengunjung</p>
      </div>
    </div>
    <div class="row justify-content-center">
      <div class="col">
        <div class="table-responsive rounded-3">
          <table class="table table-dark table-bordered">
            <thead class="align-middle text-center fw-bold">
              <tr>
                <th rowspan="2">No</th>
                <th rowspan="2">Tanggal</th>
                <th rowspan="2">Jam</th>
                <th rowspan="2">Nama</th>
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
              <tr v-for="(pengunjung, index) in visitors" :key="pengunjung.id">
                <td>{{ index + 1 }}</td>
                <td>{{ pengunjung.created_at?.split('T')[0] }}</td>
                <td>{{ pengunjung.created_at?.split('T')[1].split('.')[0] }}</td>
                <td>{{ pengunjung.nama }}</td>
                <td>{{ pengunjung.kelas }}</td>
                <td><span v-if="pengunjung.keanggotaan?.nama == 'Siswa'">✔</span></td>
                <td><span v-if="pengunjung.keanggotaan?.nama == 'Guru'">✔</span></td>
                <td><span v-if="pengunjung.keanggotaan?.nama == 'Staf'">✔</span></td>
                <td><span v-if="pengunjung.keanggotaan?.nama == 'Umum'">✔</span></td>
                <td>{{ pengunjung.keperluan?.nama || pengunjung.keperluan_lain }}</td>
                <td>
                  <div class="edit" @click="navigateTo(`/pengunjung/${pengunjung.id}`)">📝</div>
                </td>
              </tr>
              <tr v-if="status == 'error'">
                <td colspan="100%" class="text-center text-danger">{{ error?.message }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
    <div class="row justify-content-between my-4">
      <div class="col-auto">
        <button class="btn btn-dark" @click="previousPage" :disabled="page <= 0">Previous</button>
      </div>
      <div class="col-auto" v-if="status == 'pending'">
        <Loader />
      </div>
      <div class="col-auto" v-else>
        {{ page + 1 }}/{{ pageLimit + 1 }}
      </div>
      <div class="col-auto">
        <button class="btn btn-dark" @click="nextPage" :disabled="page >= pageLimit">Next</button>
      </div>
    </div>
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
  if (error) throw error
  return data
}, {
  immediate: false
})

const { data: totalVisitors } = useAsyncData('totalVisitors', async () => {
  let query = supabase.from('pengunjung').select(`
    *,
    keanggotaan ( nama ),
    keperluan ( nama )
  `, { count: 'exact', head: true })
  if (search.value) query = query.or(`nama.ilike.%${search.value}%, kelas.ilike.%${search.value}%`)
  const { count, error } = await query
  if (error) throw error
  return count
}, {
  watch: search
})

onMounted(() => {
  clearNuxtData('visitors')
  refresh()
})

watch(limit, () => {
  page.value = 0
})
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
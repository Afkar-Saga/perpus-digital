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
                <tr v-if="status == 'pending'">
                  <td colspan="100%" class="text-center">Loading...</td>
                </tr>
                <tr v-if="status == 'error'">
                  <td colspan="100%" class="text-center">{{ error?.message }}</td>
                </tr>
                <tr v-if="visitors?.length < totalVisitors">
                  <td colspan="100%" class="text-center">
                    <button class="btn btn-dark" @click="loadMore">Tampilkan lebih banyak</button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-auto">
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'layout'
})

const supabase = useSupabaseClient()

const page = ref(0)

const loadMore = () => {
  page.value += 1
  refresh()
}

const { data: visitors, status, error, refresh } = useAsyncData('visitors', async () => {
  const { from, to } = getPagination(page.value, 5)
  const { data, error } = await supabase.from('pengunjung').select(`
    *,
    keanggotaan ( nama ),
    keperluan ( nama )
  `).order('created_at', { ascending: false }).range(from, to)
  if (error) throw error
  return [...visitors.value ?? [], ...data]
})

const { data: totalVisitors } = useAsyncData('totalVisitors', async () => {
  const { count, error } = await supabase.from('pengunjung').select('*', { count: 'exact', head: true })
  if (error) throw error
  return count
})

onMounted(() => {
  clearNuxtData('visitors')
  refresh()
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
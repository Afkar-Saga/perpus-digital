<template>
  <div>
    <div class="d-inline-block mx-3 mt-4 back">
      <i @click="$router.back()" class="bi bi-arrow-return-left text-black fs-2"></i>
    </div>
    <div class="container mt-4">
      <div class="row">
        <div class="col text-center">
          <h2>Edit Kunjungan 📝</h2>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col">
          <div class="table-responsive rounded-3">
            <table class="table table-dark table-bordered">
              <thead class="align-middle text-center fw-bold">
                <tr>
                  <th rowspan="2">Nama</th>
                  <th rowspan="2">Kelas</th>
                  <th colspan="4">Keanggotaan</th>
                  <th rowspan="2">Keperluan</th>
                </tr>
                <tr>
                  <td>Siswa</td>
                  <td>Guru</td>
                  <td>Staf</td>
                  <td>Umum</td>
                </tr>
              </thead>
              <tbody>
                <tr v-if="status == 'pending'">
                  <td class="text-center" colspan="100%">Loading...</td>
                </tr>
                <tr v-if="status == 'error'">
                  <td class="text-center" colspan="100%">{{ error?.message }}</td>
                </tr>
                <tr v-if="status == 'success'">
                  <td>{{ visitor?.nama }}</td>
                  <td>{{ visitor?.kelas }}</td>
                  <td><span v-if="visitor?.keanggotaan?.id == 1">✔️</span></td>
                  <td><span v-if="visitor?.keanggotaan?.id == 2">✔️</span></td>
                  <td><span v-if="visitor?.keanggotaan?.id == 3">✔️</span></td>
                  <td><span v-if="visitor?.keanggotaan?.id == 4">✔️</span></td>
                  <td>{{ visitor?.keperluan?.nama || visitor?.keperluan_lain }}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
      <div class="row justify-content-center">
        <div class="col-md-8 col-sm-10">
          <Form @submit-event.once="editKunjungan" button-value="Edit" :button-disabled="disableButton">
            <div class="row mb-4">
              <div class="col">
                <input v-model.trim="visitor.nama" type="text" class="form-control" placeholder="Nama">
              </div>
            </div>
            <div class="row mb-4">
              <div class="col">
                <select v-model="visitor.keanggotaan" @change="checkMember" class="form-control form-select">
                  <option disabled value="">Keanggotaan</option>
                  <option v-for="(member, i) in members" :key="i" :value="member">{{ member.nama }}</option>
                </select>
              </div>
            </div>
            <div v-if="visitor?.keanggotaan?.id == '1'" class="row rowcols-3 mb-4">
              <div class="col">
                <select v-model="visitor.class.tingkat" @change="checkTingkat" class="form-control form-select">
                  <option disabled value="">Tingkat</option>
                  <option>X</option>
                  <option>XI</option>
                  <option>XII</option>
                </select>
              </div>
              <div class="col">
                <select v-model="visitor.class.jurusan" @change="checkJurusan" class="form-control form-select">
                  <option disabled value="">Jurusan</option>
                  <option>TJKT</option>
                  <option>PPLG</option>
                  <option>TSM</option>
                  <option>DKV</option>
                  <option>TOI</option>
                </select>
              </div>
              <div class="col">
                <select v-model="visitor.class.kelas" class="form-control form-select">
                  <option disabled value="">Kelas</option>
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                </select>
              </div>
            </div>
            <div class="row mb-4">
              <div class="col">
                <select v-model="visitor.keperluan" @change="checkNeeds" class="form-control form-select">
                  <option disabled value="">Keperluan</option>
                  <option v-for="(need, i) in needs" :key="i" :value="need">{{ need.nama }}</option>
                  <option :value="{ id: null, nama: 'Lainnya' }">Lainnya</option>
                </select>
              </div>
            </div>
            <div v-if="visitor?.keperluan?.id === null" class="row mb-4">
              <div class="col">
                <input v-model.trim="visitor.keperluan_lain" type="text" class="form-control" placeholder="Tulis Keperluan Kamu..">
              </div>
            </div>
            <div v-if="editStatus == 'error'" class="row">
              <div class="col">{{ editError.message }}</div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'layout'
})

const { id } = useRoute().params
const supabase = useSupabaseClient()

const { data: visitor, status, error } = await useAsyncData(
  'visitor',
  async () => {
    const { data, error } = await supabase.from('pengunjung').select(`*, keanggotaan ( * ), keperluan ( * )`).eq('id', id).maybeSingle()
    if (error) throw error
    if (data) {
      data.class = {}
      data.class.tingkat = data.kelas.split(' ')[0]
      data.class.jurusan = data.kelas.split(' ')[1]
      data.class.kelas = data.kelas.split(' ')[2]
      if (data.keperluan === null) data.keperluan = { id: null, nama: 'Lainnya' }
      return data
    }
  }
)

if (status.value == 'success') {
  visitor.value.kelas = computed(() => {
    if (visitor.value.keanggotaan.id == 1) return `${visitor.value.class.tingkat} ${visitor.value.class.jurusan} ${visitor.value.class.kelas}`
    else return ''
  })
}

const { data: members } = useAsyncData('members', async () => {
  const { data } = await supabase.from('keanggotaan').select()
  return data
})
const { data: needs } = useAsyncData('needs', async () => {
  const { data } = await supabase.from('keperluan').select()
  return data
})
const checkMember = e => {
  if (visitor.value.keanggotaan.id != 1) {
    visitor.value.class = Object.keys(visitor.value.class).reduce((acc, curr) => ({...acc, [curr]: ''}), {})
  }
}
const checkNeeds = e => {
  if (visitor.value.keperluan.id === null) {
    visitor.value.keperluan.nama = ''
  } else {
    visitor.value.keperluan_lain = ''
  }
}
const checkTingkat = e => {
  if (e.target.value == 'XII') {
    if (['DKV', 'TOI'].includes(visitor.value.class.jurusan)) {
      visitor.value.class.jurusan = ''
      visitor.value.class.kelas = ''
    } else if (visitor.value.class.kelas == '4') {
      visitor.value.class.kelas = ''
    }
  }
}
const checkJurusan = e => {
  if (['DKV', 'TOI'].includes(e.target.value) && (!['1', '2'].includes(visitor.value.class.kelas) || e.target.value == 'TOI')) visitor.value.class.kelas = ''
}
const disableButton = computed(() => {
  return !visitor.value.nama || (visitor.value.keanggotaan?.id == 1 ? !(visitor.value.class.tingkat && visitor.value.class.jurusan && visitor.value.class.kelas) : !visitor.value.keanggotaan.id) || (visitor.value.keperluan?.id === null ? !visitor.value.keperluan_lain : !visitor.value.keperluan?.id) || editStatus.value == 'pending'
})

const { status: editStatus, error: editError, execute: editKunjungan } = await useAsyncData(
    'editKunjungan',
    async () => {
      const { error } = await supabase.from('pengunjung').update({
        nama: visitor.value.nama,
        keanggotaan: visitor.value.keanggotaan.id,
        kelas: visitor.value.kelas,
        keperluan: visitor.value.keperluan.id,
        keperluan_lain: visitor.value.keperluan_lain
      }).eq('id', id)
      if (error) throw error
      else navigateTo('/pengunjung')
    },
    {
      immediate: false
    }
)
</script>

<style scoped>
@import url('~/assets/css/main.css');
.back {
  cursor: pointer;
  transition: .5s;

  &:hover {
    scale: 1.2;
    rotate: -10deg;
  }
}
</style>
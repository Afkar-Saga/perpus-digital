<template>
  <div class="container py-3 py-lg-5">
    <div class="row justify-content-center">
      <div class="col-md-8 col-sm-10">
        <Form @submit-event.once="isiKunjungan" button-value="Kirim" :button-disabled="disableButton">
          <Back to="/" />
          <div class="row py-2">
            <div class="col text-center">
              <h3>Silakan Isi Buku Kunjungan ✍🏻</h3>
            </div>
          </div>
          <div class="row mb-4">
            <div class="col">
              <input v-model.trim="form.nama" ref="nama" type="text" class="form-control" placeholder="Nama">
            </div>
          </div>
          <div class="row mb-4">
            <div class="col">
              <select :disabled="!form.nama" v-model="form.keanggotaan" @change="checkMember"
                class="form-control form-select" :class="{ 'text-muted': !form.keanggotaan }">
                <option disabled value="">Keanggotaan</option>
                <option class="text-black" v-for="(member, i) in members" :key="i" :value="member.id">{{ member.nama }}
                </option>
              </select>
            </div>
          </div>
          <div v-if="form.keanggotaan == '1'" class="row rowcols-3 mb-4">
            <div class="col">
              <select v-model="rombel.tingkat" :disabled="!form.keanggotaan" class="form-control form-select"
                :class="{ 'text-muted': !rombel.tingkat }">
                <option disabled value="">Tingkat</option>
                <option class="text-black">X</option>
                <option class="text-black">XI</option>
                <option class="text-black">XII</option>
              </select>
            </div>
            <div class="col">
              <select v-model="rombel.jurusan" :disabled="!rombel.tingkat" @change="checkJurusan"
                class="form-control form-select" :class="{ 'text-muted': !rombel.jurusan }">
                <option disabled value="">Jurusan</option>
                <option class="text-black">TJKT</option>
                <option class="text-black">PPLG</option>
                <option class="text-black">TSM</option>
                <option class="text-black">DKV</option>
                <option class="text-black">TOI</option>
              </select>
            </div>
            <div class="col">
              <select v-model="rombel.kelas" :disabled="!(rombel.jurusan) || rombel.jurusan == 'TOI'"
                class="form-control form-select" :class="{ 'text-muted': !rombel.kelas }">
                <option disabled value="">Kelas</option>
                <option class="text-black">1</option>
                <option class="text-black">2</option>
                <option class="text-black" v-if="rombel.jurusan != 'DKV'">3</option>
                <option class="text-black" v-if="rombel.jurusan != 'DKV'">4</option>
              </select>
            </div>
          </div>
          <div class="row mb-4">
            <div class="col">
              <select v-model="form.keperluan" :disabled="disableKeperluan" @change="checkNeeds"
                class="form-control form-select" :class="{ 'text-muted': !form.keperluan }">
                <option disabled value="">Keperluan</option>
                <option class="text-black" v-for="(objective, i) in needs" :key="i" :value="objective.id">{{
                  objective.nama }}</option>
                <option class="text-black">Lainnya</option>
              </select>
            </div>
          </div>
          <div v-if="form.keperluan == 'Lainnya'" class="row mb-4">
            <div class="col">
              <input v-model.trim="otherNeeds" type="text" :disabled="disableKeperluan" class="form-control"
                placeholder="Tulis Keperluan Kamu..">
            </div>
          </div>
          <div v-if="status == 'error'" class="row">
            <div class="col text-danger">{{ error.message }}</div>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script setup>
useHead({
  title: 'Isi Kunjungan'
})

const supabase = useSupabaseClient()

const { data: members } = useAsyncData('members', async () => {
  const { data } = await supabase.from('keanggotaan').select()
  return data
})
const { data: needs } = useAsyncData('needs', async () => {
  const { data } = await supabase.from('keperluan').select()
  return data
})
const rombel = ref({
  tingkat: '',
  jurusan: '',
  kelas: ''
})
const otherNeeds = ref('')
const form = ref({
  nama: '',
  keanggotaan: '',
  keperluan: ''
})
const kelas = computed(() => {
  return `${rombel.value.tingkat} ${rombel.value.jurusan} ${rombel.value.kelas}`
})
const checkMember = e => {
  if (e.target.value != '1') rombel.value = Object.keys(rombel.value).reduce((acc, curr) => ({ ...acc, [curr]: '' }), {})
}
const checkNeeds = e => {
  if (e.target.value != 'Lainnya') otherNeeds.value = ''
}
const checkJurusan = e => {
  if (['DKV', 'TOI'].includes(e.target.value) && (!['1', '2'].includes(rombel.value.kelas) || e.target.value == 'TOI')) rombel.value.kelas = ''
}
const disableButton = computed(() => {
  return !form.value.nama || (form.value.keanggotaan == '1' ? !(rombel.value.tingkat && rombel.value.jurusan && rombel.value.kelas) : !form.value.keanggotaan) || (form.value.keperluan == 'Lainnya' ? !otherNeeds.value : !form.value.keperluan) || status.value == 'pending'
})
const disableKeperluan = computed(() => form.value.keanggotaan == '1' ? (rombel.value.jurusan == 'TOI' ? false : !rombel.value.kelas) : !form.value.keanggotaan)

const { status, error, execute: isiKunjungan } = useAsyncData(
  'isiKunjungan',
  async () => {
    const { error } = await supabase.from('pengunjung').insert({
      nama: form.value.nama,
      keanggotaan: form.value.keanggotaan,
      kelas: kelas.value.trim(),
      keperluan: form.value.keperluan == 'Lainnya' ? null : form.value.keperluan,
      keperluan_lain: otherNeeds.value
    })
    if (error) throw error
    else navigateTo('/pengunjung')
  },
  {
    immediate: false
  }
)


const nama = ref()
onMounted(() => {
  nama.value.focus()
})
</script>

<style scoped>
@import url('~/assets/css/main.css');
</style>
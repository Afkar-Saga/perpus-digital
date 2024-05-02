<template>
  <div>
    <div class="container mt-4">
      <div class="row justify-content-center">
        <div class="col-md-8 col-sm-10">
          <Form @submit-event.once="isiKunjungan" button-value="Kirim" :button-disabled="disableButton">
            <div class="row py-4">
              <div class="col text-center">
                <h3>Silakan Isi Buku Kunjungan ✍🏻</h3>
              </div>
            </div>
            <div class="row mb-4">
              <div class="col">
                <input v-model="form.nama" ref="nama" type="text" class="form-control" placeholder="Nama">
              </div>
            </div>
            <div class="row mb-4">
              <div class="col">
                <select :disabled="!form.nama" v-model="form.keanggotaan" class="form-control form-select">
                  <option disabled value="">Keanggotaan</option>
                  <option v-for="(member, i) in members" :key="i" :value="member.id">{{ member.nama }}</option>
                </select>
              </div>
            </div>
            <div v-if="form.keanggotaan == '1'" class="row rowcols-3 mb-4">
              <div class="col">
                <select v-model="rombel.tingkat" :disabled="!form.keanggotaan" class="form-control form-select">
                  <option disabled value="">Tingkat</option>
                  <option>X</option>
                  <option>XI</option>
                  <option>XII</option>
                </select>
              </div>
              <div class="col">
                <select v-model="rombel.jurusan" :disabled="!rombel.tingkat" class="form-control form-select">
                  <option disabled value="">Jurusan</option>
                  <option>TJKT</option>
                  <option>PPLG</option>
                  <option>TSM</option>
                  <option>DKV</option>
                  <option>TOI</option>
                </select>
              </div>
              <div class="col">
                <select v-model="rombel.kelas" :disabled="!rombel.jurusan" class="form-control form-select">
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
                <select v-model="form.keperluan" :disabled="form.keanggotaan == '1' ? !rombel.kelas : !form.keanggotaan" class="form-control form-select">
                  <option disabled value="">Keperluan</option>
                  <option v-for="(objective, i) in needs" :key="i" :value="objective.id">{{ objective.nama }}</option>
                  <option>Lainnya</option>
                </select>
              </div>
            </div>
            <div v-if="form.keperluan == 'Lainnya'" class="row mb-4">
              <div class="col">
                <input v-model="otherNeeds" type="text" class="form-control" placeholder="Tulis Keperluan Kamu..">
              </div>
            </div>
            <div v-if="status == 'error'" class="row">
              <div class="col">{{ error.message }}</div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
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

const { status, error, execute: isiKunjungan } = useAsyncData(
  'isiKunjungan',
  async () => {
    const { error } = await supabase.from('pengunjung').insert({
      nama: form.value.nama,
      keanggotaan: form.value.keanggotaan,
      kelas: kelas.value,
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

const disableButton = computed(() => {
  return form.value.keperluan == 'Lainnya' ? !otherNeeds.value : !form.value.keperluan || status.value == 'pending'
})

// const getKeanggotaan = async () => {
//   const { data, error } = await supabase.from('keanggotaan').select('*')
//   if (data) members.value = data
// }

// const getKeperluan = async () => {
//   const { data, error } = await supabase.from('keperluan').select('*')
//   if (data) needs.value = data
// }

// const isiKunjungan = async () => {
//   const { error } = await supabase.from('pengunjung').insert({
//     nama: form.value.nama,
//     keanggotaan: form.value.keanggotaan,
//     kelas: kelas.value,
//     keperluan: form.value.keperluan == 'Lainnya' ? otherNeeds.value : form.value.keperluan
//   })
//   if (error) throw error
//   else navigateTo('/pengunjung')
// }

const nama = ref()
onMounted(() => {
  nama.value.focus()
})
</script>

<style scoped>

</style>
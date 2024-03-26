<template>
  <div>
    <div class="container mt-4">
      <div class="row justify-content-center">
        <div class="col-md-8 col-sm-10">
          <Form @submit-event.once="isiKunjungan" button-value="Kirim">
            <div class="row py-4">
              <div class="col text-center">
                <h3>Silakan Isi Buku Kunjungan ✍🏻</h3>
              </div>
            </div>
            <div class="row mb-4">
              <div class="col">
                {{ form.keanggotaan }}{{ form.nama }}{{ form.keperluan }}{{ form.kelas }}{{ otherObjectives }}
                <input v-model="form.nama" type="text" class="form-control" placeholder="Nama">
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
                <select @change="console.log(rombel.tingkat)" v-model="rombel.tingkat" :disabled="!form.keanggotaan" class="form-control form-select">
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
                <select @change="console.log(otherObjectives)" v-model="form.keperluan" :disabled="form.keanggotaan == '1' ? !rombel.kelas : !form.keanggotaan" class="form-control form-select">
                  <option disabled value="">Keperluan</option>
                  <option v-for="(objective, i) in objectives" :key="i" :value="objective.id">{{ objective.nama }}</option>
                  <option>Lainnya</option>
                </select>
              </div>
            </div>
            <div v-if="form.keperluan == 'Lainnya'" class="row mb-4">
              <div class="col">
                <input v-model="otherObjectives" type="text" class="form-control" placeholder="Tulis Keperluan Kamu..">
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
const supabase = useSupabaseClient();

const members: any = ref([])
const objectives: any = ref([''])
const rombel = ref({
  tingkat: '',
  jurusan: '',
  kelas: ''
})
const otherObjectives = ref('')
const form = ref({
  nama: "",
  keanggotaan: "",
  kelas: `${rombel.value.tingkat} ${rombel.value.jurusan} ${rombel.value.kelas}`,
  keperluan: ''
})

const getKeanggotaan = async () => {
  const { data, error } = await supabase.from('keanggotaan').select('*')
  if (data) members.value = data
}

const getKeperluan = async () => {
  const { data, error } = await supabase.from('keperluan').select('*')
  if (data) objectives.value = data
}

const isiKunjungan = async () => {
  const { error } = await supabase.from('pengunjung').insert({
    nama: form.value.nama,
    keanggotaan: form.value.keanggotaan,
    kelas: form.value.kelas,
    keperluan: form.value.keperluan == 'Lainnya' ? otherObjectives.value : form.value.keperluan
  })
  if (!error) navigateTo('/pengunjung')
}

onMounted(() => {
  getKeanggotaan()
  getKeperluan()
})
</script>

<style scoped>

</style>
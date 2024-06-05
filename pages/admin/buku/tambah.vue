<template>

  <div class="container py-3 py-lg-5">
    <div class="row justify-content-center">
      <div class="col-md-8 col-sm-10">
        <Form @submit-event.once="addBook" button-value="Tambah" :button-disabled="disableButton">
          <Back to="/admin/buku" />
          <div class="row py-2">
            <div class="col text-center">
              <h3>Tambah Buku 📖</h3>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col">
              <input v-model.trim="form.judul" ref="judul" type="text" class="form-control" placeholder="Judul">
            </div>
          </div>
          <div class="row mb-3">
            <div class="col">
              <input v-model.trim="form.penulis" type="text" class="form-control" placeholder="Penulis">
            </div>
          </div>
          <div class="row mb-3">
            <div class="col">
              <textarea v-model.trim="form.deskripsi" class="form-control" rows="3" placeholder="Deskripsi"></textarea>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col">
              <input v-model.number="form.tahun_terbit" type="number" min="1900" max="2099" class="form-control"
                placeholder="Tahun Terbit">
            </div>
          </div>
          <div class="row mb-3">
            <div class="col">
              <input v-model.trim="form.penerbit" type="text" class="form-control" placeholder="Penerbit">
            </div>
          </div>
          <div class="row mb-3">
            <div class="col">
              <select v-model="form.kategori" class="form-control form-select"
                :class="{ 'text-muted': !form.kategori }">
                <option value="" disabled>Kategori</option>
                <option class="text-black" v-for="category in categories" :key="category.id" :value="category.id">{{
                  category.nama }}</option>
              </select>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col">
              <select v-model="form.rak" class="form-control form-select" :class="{ 'text-muted': !form.rak }">
                <option value="" disabled>Rak</option>
                <option class="text-black" v-for="shelf in shelves" :key="shelf.id" :value="shelf.id">{{ shelf.kode_rak
                  }} | {{ shelf.nama }}</option>
              </select>
            </div>
          </div>
          <div class="row mb-3">
            <div class="col">
              <label for="cover" class="form-label">Cover: </label>
              <input type="file" accept="image/*" :disabled="!form.kategori" class="form-control" id="cover"
                @change="coverPicked">
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
definePageMeta({
  layout: 'admin',
  middleware: 'auth'
})
useHead({
  title: 'Tambah Buku'
})

const supabase = useSupabaseClient()

const form = ref({
  judul: '',
  penulis: '',
  deskripsi: '',
  tahun_terbit: '',
  penerbit: '',
  kategori: '',
  rak: '',
  cover: null
})
const coverImage = ref()

const { data: categories } = useAsyncData('categories', async () => {
  const { data, error } = await supabase.from('kategori_buku').select()
  if (error) throw error
  return data
})
const { data: shelves } = useAsyncData('shelves', async () => {
  const { data, error } = await supabase.from('rak').select()
  if (error) throw error
  return data
})

async function coverPicked(event) {
  const file = event.target.files[0]
  coverImage.value = file
  const { data, error } = await supabase.from('kategori_buku').select('nama').eq('id', form.value.kategori).maybeSingle()
  if (error) throw error
  form.value.cover = `${data.nama.replace(' ', '_').toLowerCase()}/${file.name}`
}

const disableButton = computed(() => {
  return !form.value.judul || !form.value.penulis || !form.value.tahun_terbit || !form.value.penerbit || !form.value.kategori || !form.value.rak || status.value == 'pending'
})

const { execute: addBook, status, error } = useAsyncData('addBook', async () => {
  if (coverImage.value) {
    const { error } = await supabase.storage.from('books').upload(`cover/${form.value.cover}`, coverImage.value)
    if (error) throw error
  }
  const { error } = await supabase.from('buku').insert(form.value)
  if (error) throw error
  else navigateTo('/admin/buku')
}, {
  immediate: false
})

const judul = ref()
onMounted(() => {
  judul.value.focus()
})
</script>

<style scoped>
@import url('~/assets/css/main.css');
</style>
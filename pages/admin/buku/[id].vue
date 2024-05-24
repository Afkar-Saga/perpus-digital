<template>
  <div>
    <div class="back d-inline-block ms-3 mt-4">
      <NuxtLink to="/admin/buku">
        <i class="bi bi-arrow-return-left text-black fs-2"></i>
      </NuxtLink>
    </div>
    <div class="container">
      <div v-if="status == 'pending'" class="row justify-content-center">
        <div class="col">Loading...</div>
      </div>
      <div v-if="status == 'error'" class="row justify-content-center">
        <div class="col">{{ error.message }}</div>
      </div>
      <div v-if="status == 'success'" class="row justify-content-center mb-3">
        <div class="col-8 col-lg-4 mb-3">
          <div class="card shadow-lg rounded-5">
            <img :src="book?.coverUrl?.publicUrl" alt="" class="card-img-top p-4">
          </div>
        </div>
        <div class="col-12 col-lg-8">
          <div class="row">
            <div class="col mb-3">
              <h5 class="text-muted">{{ book?.penulis }}</h5>
              <h2>{{ book?.judul }}</h2>
            </div>
          </div>
          <div class="row">
            <div class="col mb-3">
              <h4 class="fw-bold">Deskripsi Buku</h4>
              <p>{{ book?.deskripsi }}</p>
            </div>
          </div>
          <div class="row">
            <div class="col">
              <h4 class="fw-bold">Detail Buku</h4>
              <h6 class="text-muted">Penerbit</h6>
              <p>{{ book?.penerbit }}</p>
              <h6 class="text-muted">Tanggal Terbit</h6>
              <p>{{ book?.tahun_terbit }}</p>
            </div>
            <div class="col-3 bg-info bg-gradient bg-opacity-50 p-3 m-2 rounded shadow-md">
              <h5 class="text-success fw-bold">Rak</h5>
              <p class="fst-italic">{{ book?.rak?.kode_rak }} | {{ book?.rak?.nama }}</p>
            </div>
          </div>
        </div>
      </div>
      <div class="row justify-content-evenly mb-5">
        <div class="col-auto">
          <button class="btn btn-warning fs-3" @click="showEditForm = !showEditForm">📝 Edit</button>
        </div>
        <div class="col-auto">
          <button class="btn btn-danger fs-3" data-bs-toggle="modal" data-bs-target="#deleteModal">❌ Delete</button>
        </div>
      </div>
      <div v-if="showEditForm" class="row justify-content-center">
        <div class="col-md-8 col-sm-10">
          <Form @submit-event.once="editBook" button-value="Edit" :button-disabled="disableButton">
            <div class="row py-4">
              <div class="col text-center">
                <h3>Tambah Buku 📖</h3>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col">
                <input v-model.trim="book.judul" ref="judul" type="text" class="form-control" placeholder="Judul">
              </div>
            </div>
            <div class="row mb-3">
              <div class="col">
                <input v-model.trim="book.penulis" type="text" class="form-control" placeholder="Penulis">
              </div>
            </div>
            <div class="row mb-3">
              <div class="col">
                <textarea v-model.trim="book.deskripsi" class="form-control" rows="3"
                  placeholder="Deskripsi"></textarea>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col">
                <input v-model.number="book.tahun_terbit" type="number" min="1900" max="2099" class="form-control"
                  placeholder="Tahun Terbit">
              </div>
            </div>
            <div class="row mb-3">
              <div class="col">
                <input v-model.trim="book.penerbit" type="text" class="form-control" placeholder="Penerbit">
              </div>
            </div>
            <div class="row mb-3">
              <div class="col">
                <select v-model="book.kategori_buku" class="form-control form-select"
                  :class="{ 'text-muted': !book.kategori_buku }">
                  <option value="" disabled>Kategori</option>
                  <option class="text-black" v-for="category in categories" :key="category.id" :value="category">{{
                    category.nama }}</option>
                </select>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col">
                <select v-model="book.rak" class="form-control form-select" :class="{ 'text-muted': !book.rak }">
                  <option value="" disabled>Rak</option>
                  <option class="text-black" v-for="shelf in shelves" :key="shelf.id" :value="shelf">{{ shelf.kode_rak
                    }} | {{ shelf.nama }}</option>
                </select>
              </div>
            </div>
            <div class="row mb-3">
              <div class="col">
                <label for="cover" class="form-label">Cover: </label>
                <input type="file" accept="image/*" :disabled="!book.kategori" class="form-control" id="cover"
                  @change="coverPicked">
              </div>
            </div>
            <div v-if="editStatus == 'error'" class="row">
              <div class="col text-danger">{{ editError.message }}</div>
            </div>
          </Form>
        </div>
      </div>
      <div id="deleteModal" class="modal fade" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
        <div class="modal-dialog">
          <div class="modal-content bg-dark text-light">
            <div class="modal-header">
              <h1 class="modal-title fs-5" id="deleteModalLabel">Konfirmasi penghapusan buku {{ book?.judul }}</h1>
              <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
              <div class="bg-danger bg-opacity-25 fs-6 text-danger rounded p-3">
                Apakah anda yakin ingin menghapus buku ini? &#9432;
              </div>
              <div v-if="deleteStatus == 'error'" class="text-warning">{{ deleteError.message }}</div>
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
              <button type="button" class="btn btn-danger" data-bs-dismiss="modal" :disabled="deleteStatus == 'pending'" @click="deleteBook">Hapus Buku</button>
            </div>
          </div>
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

const { id } = useRoute().params
const supabase = useSupabaseClient()

const { data: book, status, error } = useLazyAsyncData('book', async () => {
  const { data, error } = await supabase.from('buku').select(`*, kategori_buku ( * ), rak ( * )`).eq('id', id).maybeSingle()
  if (error) throw error
  if (data) {
    const { data: url } = supabase.storage.from('books').getPublicUrl(`cover/${data.cover || 'book_cover_placeholder.png'}`)
    data.coverUrl = url
  }
  return data
})

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

const showEditForm = ref(false)

const coverImage = ref()

async function coverPicked(event) {
  const file = event.target.files[0]
  coverImage.value = file
  const { data, error } = await supabase.from('kategori_buku').select('nama').eq('id', book.value.kategori_buku.id).maybeSingle()
  if (error) throw error
  book.value.cover = `${data.nama.replace(' ', '_').toLowerCase()}/${file.name}`
}

const disableButton = computed(() => {
  return !book.value.judul || !book.value.penulis || !book.value.tahun_terbit || !book.value.penerbit || !book.value.kategori || !book.value.rak || editStatus.value == 'pending'
})

const { execute: editBook, status: editStatus, error: editError } = useAsyncData('editBook', async () => {
  if (coverImage.value) {
    let url = book.value.coverUrl.publicUrl
    if (book.value.cover == url.substr(url.indexOf('cover'))) {
      const { error } = await supabase.storage.from('books').update(`cover/${book.value.cover}`, coverImage.value)
      if (error) throw error
    } else {
      const { error } = await supabase.storage.from('books').upload(`cover/${book.value.cover}`, coverImage.value)
      if (error) throw error
      if (!(url.includes('book_cover_placeholder.png'))) {
        const { error } = await supabase.storage.from('books').remove(`cover/${url.substr(url.indexOf('cover'))}`)
        if (error) throw error
      }
    }
  }
  const { error } = await supabase.from('buku').update({
    judul: book.value.judul,
    penulis: book.value.penulis,
    deskripsi: book.value.deskripsi,
    tahun_terbit: book.value.tahun_terbit,
    penerbit: book.value.penerbit,
    kategori: book.value.kategori_buku.id,
    rak: book.value.rak.id,
    cover: book.value.cover
  }).eq('id', id)
  if (error) throw error
  else navigateTo('/admin/buku')
}, {
  immediate: false
})

const { execute: deleteBook, status: deleteStatus, error: deleteError } = useAsyncData('deleteBook', async () => {
  let url = book.value.coverUrl.publicUrl
  if (!(url.includes('book_cover_placeholder.png'))) {
    const { error } = await supabase.storage.from('books').remove(`cover/${url.substr(url.indexOf('cover'))}`)
    if (error) throw error
  }
  const { error } = await supabase.from('buku').delete().eq('id', id)
  if (error) throw error
  else navigateTo('/admin/buku')
}, {
  immediate: false
})
</script>

<style scoped>
@import url('~/assets/css/main.css');
</style>
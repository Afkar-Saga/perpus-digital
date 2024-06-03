<template>
  <div>
    <div class="container mt-4">
      <div class="row">
        <div class="col text-center">
          <h2>Pencarian Buku 🔍</h2>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <input type="text" v-model="search" class="form-control"
            placeholder="Cari buku berdasarkan judul atau pengarang" @input="refresh">
        </div>
      </div>
      <div class="row align-items-center my-2">
        <div class="col-lg-auto col-2">
          <label for="kode">Kode Rak: </label>
        </div>
        <div class="col-lg-3 col-4">
          <select v-model="shelf" id="kode" class="form-control form-select"
            @change="selectShelf">
            <option value="">None</option>
            <option v-for="shelf in shelves" :key="shelf.id" :value="shelf.id">{{ shelf.kode_rak }} | {{ shelf.nama }}
            </option>
          </select>
        </div>
        <div class="col-lg-auto col-2">
          <label for="kategori">Kategori: </label>
        </div>
        <div class="col-lg-3 col-4">
          <select v-model="category" id="kategori" class="form-control form-select" @change="refresh">
            <option value="">None</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.nama }}</option>
          </select>
        </div>
        <div class="col-lg-auto col-4 ms-auto">
          <label for="limit">Buku per Halaman: </label>
        </div>
        <div class="col-lg-1 col-2">
          <select v-model="limit" id="limit" class="form-control form-select" @change="refresh">
            <option :value="4">4</option>
            <option :value="8">8</option>
            <option :value="16">16</option>
            <option :value="32">32</option>
          </select>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <p class="text-black-70">Menampilkan {{ books?.length ? `${page * limit + 1}-${page * limit + books?.length}` : 0 }} dari {{ totalBooks }} buku</p>
        </div>
      </div>
      <div class="row gx-3 gy-4 justify-content-evenly">
        <div class="col-sm-6 col-md-4 col-lg-3 d-flex" v-for="book in books" :key="book.id">
          <CardBook :destination="`buku/${book.id}`" :judul="book.judul" :penulis="book.penulis" :image="book.coverUrl" />
        </div>
      </div>
      <div class="row justify-content-center my-4" v-if="status == 'error'">
        <div class="col-auto">
          {{ error.message }}
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
  </div>
</template>

<script setup>
definePageMeta({
  middleware: 'layout'
})

const supabase = useSupabaseClient()

const page = ref(0)
const limit = ref(8)
const pageLimit = computed(() => {
  return totalBooks.value == 0 ? 0 : Math.ceil(totalBooks.value / limit.value) - 1
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
const category = ref('')
const shelf = ref('')

const { data: books, status, error, refresh } = useAsyncData('books', async () => {
  const { from, to } = getPagination(page.value, limit.value)
  let query = supabase.from('buku').select()
  if (search.value) query = query.or(`judul.ilike.%${search.value}%, penulis.ilike.%${search.value}%`)
  if (category.value) query = query.eq('kategori', category.value)
  if (shelf.value) query = query.eq('rak', shelf.value)
  query = query.range(from, to)

  const { data, error } = await query
  if (error) throw error
  if (data) {
    data.forEach(book => {
      const { data: url } = supabase.storage.from('books').getPublicUrl(`cover/${book.cover || 'book_cover_placeholder.png'}`)
      book.coverUrl = url.publicUrl
    })
  }
  return data
}, {
  immediate: false
})

const { data: totalBooks } = useAsyncData('totalBooks', async () => {
  let query = supabase.from('buku').select('*', { count: 'exact', head: true })
  if (search.value) query = query.or(`judul.ilike.%${search.value}%, penulis.ilike.%${search.value}%`)
  if (category.value) query = query.eq('kategori', category.value)
  if (shelf.value) query = query.eq('rak', shelf.value)
  const { count, error } = await query
  if (error) throw error
  return count
}, {
  watch: [search, category, shelf]
})


const { data: categories, refresh: refreshCategory } = useAsyncData('categories', async () => {
  let query = supabase.from('kategori_buku').select()
  if (shelf.value) {
    const { data, error } = await supabase.from('buku').select('kategori').eq('rak', shelf.value)
    if (error) throw error
    if (data) {
      query = query.in('id', data.map(({ kategori }) => kategori))
    }
  }
  const { data, error } = await query
  if (error) throw error
  return data
})
const { data: shelves } = useAsyncData('shelves', async () => {
  const { data, error } = await supabase.from('rak').select()
  if (error) throw error
  return data
})

const selectShelf = () => {
  refresh()
    .then(() => refreshCategory())
    .then(() => {
      let categoryMap = categories.value.map(({ id }) => id)
      if (!(categoryMap.includes(category.value))) {
        category.value = ''
        refresh()
      }
    })
}

onMounted(() => {
  clearNuxtData('books')
  refresh()
})

watch([search, category, shelf, limit], () => {
  page.value = 0;
})
</script>

<style scoped></style>
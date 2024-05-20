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
          <input type="text" v-model="search" class="form-control" placeholder="Cari buku berdasarkan judul atau pengarang" @input="refresh">
          {{ search }}
        </div>
      </div>
      <div class="row align-items-center my-2">
        <div class="col-lg-1 col-2">
          <label for="kode">Kode Rak: </label>
        </div>
        <div class="col-lg-3 col-4">
          <select v-model="shelf" id="kode" class="form-control form-select" @change="refresh">
            <option value="">None</option>
            <option v-for="shelf in shelves" :key="shelf.id" :value="shelf.id">{{ shelf.kode_rak }} | {{ shelf.nama }}</option>
          </select>
        </div>
        <div class="col-lg-1 col-2">
          <label for="kategori">Kategori: </label>
        </div>
        <div class="col-lg-3 col-4">
          <select v-model="category" id="kategori" class="form-control form-select" @change="refresh">
            <option value="">None</option>
            <option v-for="category in categories" :key="category.id" :value="category.id">{{ category.nama }}</option>
          </select>
        </div>
      </div>
      <div class="row">
        <div class="col">
          <p class="text-black-70">Menampilkan {{ books?.length }} dari {{ totalBooks }} buku</p>
        </div>
      </div>
      <div class="row gx-2 gy-4 justify-content-evenly">
        <div class="col col-sm-6 col-md-4 col-lg-3 d-flex align-items-stretch justify-content-center"
          v-for="book in books" :key="book.id">
          <CardBook :id="book.id" :image="book.coverUrl.publicUrl" :penulis="book.penulis" :judul="book.judul" />
        </div>
      </div>
      <div class="row justify-content-center my-4" v-if="status == 'error'">
        <div class="col-auto">
          {{ error.message }}
        </div>
      </div>
      <div class="row justify-content-between my-4">
        <div class="col-auto">
          <button class="btn btn-dark" @click="changePage(-1)">Previous</button>
        </div>
        <div class="col-auto" v-if="status == 'pending'">
          Loading...
        </div>
        <div class="col-auto" v-else>
          {{ page + 1 }}
        </div>
        <div class="col-auto">
          <button class="btn btn-dark" @click="changePage(1)">Next</button>
        </div>
      </div>
      {{ category }} {{ typeof(category) }} {{ shelf }} {{ typeof shelf }}
    </div>
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()

const page = ref(0)

const changePage = (where) => {
  page.value += where
  refresh()
}

const search = ref('')
const category = ref('')
const shelf = ref('')

const { data: books, status, error, refresh } = useLazyAsyncData('books', async () => {
  const { from, to } = getPagination(page.value, 8)
  let query = supabase.from('buku').select()
  if (search.value) query = query.or(`judul.ilike.%${search.value}%, penulis.ilike.%${search.value}%`)
  if (category.value) query = query.eq('kategori', category.value)
  if (shelf.value) query = query.eq('rak', shelf.value)
  query = query.range(from, to).order('kategori')

  const { data, error } = await query
  if (error) throw error
  if (data) {
    data.forEach(book => {
      const { data: url } = supabase.storage.from('books').getPublicUrl(`cover/${book.cover || 'book_cover_placeholder.png'}`)
      book.coverUrl = url
    })
  }
  console.log(data)
  return data
})

const { data: totalBooks } = useAsyncData('totalBooks', async () => {
  const { count, error } = await supabase.from('buku').select('*', { count: 'exact', head: true })
  if (error) throw error
  return count
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

onMounted(() => {
  clearNuxtData('books')
  refresh()
})
</script>

<style scoped></style>
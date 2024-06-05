<template>
  <div>
    <div class="container mt-4 py-4">
      <div class="row mb-3">
        <div class="col">
          <h1 class="fw-bold text-center">Kelola Buku 📔</h1>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col d-grid d-lg-block">
          <button class="btn btn-success" @click="navigateTo('/admin/buku/tambah')">+ Tambah Buku</button>
        </div>
      </div>
      <div class="row mb-3">
        <div class="col">
          <input v-model="search" type="text" class="form-control" placeholder="Cari buku berdasarkan judul atau pengarang" @input="refresh">
        </div>
      </div>
      <div class="row justify-content-center my-4" v-if="status == 'error'">
        <div class="col-auto">
          {{ error.message }}
        </div>
      </div>
      <div class="row justify-content-center my-4" v-if="status == 'pending'">
        <div class="col-auto">
          <Loader />
        </div>
      </div>
      <div class="row gx-3 gy-4 justify-content-evenly">
        <div class="col-6 col-md-4 col-lg-3 d-flex" v-for="book in books" :key="book.id">
          <CardBook :destination="`/admin/buku/${book.id}`" :image="book.coverUrl?.publicUrl" :judul="book.judul" :penulis="book.penulis" />
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

const supabase = useSupabaseClient()

const search = ref('')

const { data: books, status, error, refresh } = useAsyncData('adminBooks', async () => {
  let query = supabase.from('buku').select()
  if (search.value) query = query.or(`judul.ilike.%${search.value}%, penulis.ilike.%${search.value}%`)
  const { data, error } = await query
  if (error) throw error
  if (data) {
    data.forEach(book => {
      const { data: url } = supabase.storage.from('books').getPublicUrl(`cover/${book.cover || 'book_cover_placeholder.png'}`)
      if (url) {
        book.coverUrl = url
      }
    })
  }
  return data
})
</script>

<style scoped>

</style>
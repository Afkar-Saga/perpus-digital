<template>
  <div class="container py-3 py-lg-5">
    <div v-if="status == 'pending'" class="row justify-content-center">
      <div class="col-auto">
        <Loader />
      </div>
    </div>
    <div v-if="status == 'error'" class="row justify-content-center">
      <div class="col-auto">{{ error.message }}</div>
    </div>
    <div v-if="status == 'success'" class="row justify-content-center">
      <Back to="/buku" />
      <div class="col-8 col-lg-4 mb-3">
        <div class="card shadow rounded-5">
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
          <div class="col col-lg-3 bg-info bg-gradient bg-opacity-50 p-3 m-2 rounded shadow-md">
            <h5 class="text-success fw-bold">Rak</h5>
            <p class="fst-italic">{{ book?.rak?.kode_rak }} | {{ book?.rak?.nama }}</p>
          </div>
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

const { data: book, status, error } = useLazyAsyncData('book', async () => {
  const { data, error } = await supabase.from('buku').select(`*, rak ( kode_rak, nama )`).eq('id', id).maybeSingle()
  if (error) throw error
  if (data) {
    const { data: url } = supabase.storage.from('books').getPublicUrl(`cover/${data.cover || 'book_cover_placeholder.png'}`)
    data.coverUrl = url
  }
  return data
})
</script>

<style scoped>
@import url('~/assets/css/main.css');
</style>
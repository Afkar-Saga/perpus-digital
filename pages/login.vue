<template>
  <div class="container position-relative">
    <div class="row justify-content-center">
      <div class="col-lg-6 col-md-10">
        <Form @submit-event="login()" button-value="LOGIN"
          :button-disabled="!email || !password || status == 'pending'">
          <Back to="/" />
          <div class="row py-4">
            <div class="col text-center">
              <h2 class="display-4">Perpus Digital</h2>
            </div>
          </div>
          <div class="row mb-4 justify-content-center">
            <div class="col-4">
              <NuxtImg src="/img/books.png" alt="Books" class="img-fluid" />
            </div>
          </div>
          <div class="row mb-4">
            <div class="col">
              <h3 class="fw-bold text-center">Login</h3>
            </div>
          </div>
          <div class="row mb-4">
            <div class="col">
              <input v-model.trim="email" type="email" class="form-control" placeholder="Email">
            </div>
          </div>
          <div class="row mb-4">
            <div class="col">
              <input v-model.trim="password" :disabled="!email" type="password" class="form-control"
                placeholder="Password">
            </div>
          </div>
          <div class="row mb-4" v-if="status == 'error'">
            <div class="col text-center text-danger">
              {{ error.message }}
            </div>
          </div>
        </Form>
      </div>
    </div>
  </div>
</template>

<script setup>
definePageMeta({
  layout: 'home',
  middleware: 'auth'
})

const supabase = useSupabaseClient()

const email = ref('')
const password = ref('')

const { status, error, execute: login } = useAsyncData('user', async () => {
  const { data, error } = await supabase.auth.signInWithPassword({
    email: email.value,
    password: password.value
  })
  if (error) throw 'Username atau Password salah'
  if (data) navigateTo('/admin')
}, {
  immediate: false
})
</script>

<style scoped>
@import url('~/assets/css/main.css');
</style>
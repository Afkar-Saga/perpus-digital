<template>
  <div>
    <div class="container position-relative">
      <div class="row justify-content-center py-5">
        <div class="col-lg-6 col-md-10">
          <Form @submit-event.once="login()" button-value="LOGIN">
            <div class="row py-4">
              <div class="col text-center">
                <h2 class="display-4">Perpus Digital</h2>
              </div>
            </div>
            <div class="row mb-4 justify-content-center">
              <div class="col-4">
                <img src="~/assets/img/books.png" alt="Books" class="img-fluid">
              </div>
            </div>
            <div class="row mb-4">
              <div class="col">
                <h3 class="fw-bold text-center">Login</h3>
              </div>
            </div>
            <div class="row rowcols-3 mb-4">
              <div class="col">
                <input type="text" class="form-control" placeholder="Email">
              </div>
            </div>
            <div class="row mb-4">
              <div class="col">
                <input type="text" class="form-control" placeholder="Password">
              </div>
            </div>
          </Form>
        </div>
      </div>
    </div>
  </div>
</template>

<script lang="ts" setup>
definePageMeta({
  layout: 'home'
})
function login() {
  navigateTo('/admin')
}
</script>

<style scoped>

</style>
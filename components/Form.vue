<template>
  <div class="form-container d-flex flex-column justify-content-between p-4">
    <div class="flex-fill">
      <form @submit.prevent="$emit('submitEvent')">
        <div class="container">
          <slot />
          <div class="row">
            <div class="col">
              <input type="submit" value="Kirim" class="form-control text-white fs-5">
            </div>
          </div>
        </div>
      </form>
    </div>
    <div class="mt-5">
      <NuxtLink to="/">
        <i class="bi bi-arrow-return-left text-black fs-2"></i>
      </NuxtLink>
    </div>
  </div>
</template>

<script lang="ts" setup>

</script>

<style scoped>
.form-container {
  background-color: white;
  min-height: 440px;
  border-radius: 50px;
}
:slotted(input), :slotted(select), input, select {
  width: 100%;
  height: 54px;
  border-radius: 15px;
}
input[type=submit] {
  background-color: #986433;
}
</style>
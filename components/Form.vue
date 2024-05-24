<template>
  <div class="form-container d-flex flex-column justify-content-between p-4">
    <div class="flex-fill">
      <form @submit.prevent="$emit('submitEvent')">
        <div class="container">
          <slot></slot>
          <div class="row">
            <div class="col">
              <input type="submit" :value="props.buttonValue" :disabled="props.buttonDisabled" class="btn text-white fs-5 form-control">
            </div>
          </div>
        </div>
      </form>
    </div>
  </div>
</template>

<script lang="ts" setup>
const props = defineProps({
  buttonValue: String,
  buttonDisabled: Boolean
})
</script>

<style scoped>
.form-container {
  background-color: white;
  min-height: 440px;
  border-radius: 50px;
}
input[type=submit] {
  background-color: #986433;

  &:hover {
    background-color: #7e5127;
  }
}
</style>
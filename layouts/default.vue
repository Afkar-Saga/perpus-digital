<template>
  <div class="wrapper">
    <Header>
      <div v-if="route.name == 'riwayat'">
        <NavPill name="SELESAI" color="linear-gradient(#5FAA68, #56A549)" border="1px solid green" destination="/" />
      </div>
    </Header>
    <slot />
  </div>
</template>

<script setup>
const route = useRoute()
</script>

<style scoped>
.wrapper {
  width: 100%;
  min-height: 100vh;
  background-color: #ECDDAE;
}
</style>
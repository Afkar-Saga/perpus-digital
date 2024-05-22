<template>
  <div class="fs-3 fw-bold text-danger">
    Logging out
  </div>
</template>

<script setup>
const supabase = useSupabaseClient()
try {
  const { error } = await supabase.auth.signOut()
  if (error) throw 'Logout gagal'
  else alert("Logout berhasil")
} catch (error) {
  alert(error)
} finally {
  navigateTo('/')
}
</script>

<style scoped>

</style>
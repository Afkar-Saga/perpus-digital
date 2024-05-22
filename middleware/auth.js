export default defineNuxtRouteMiddleware((to) => {
  const user = useSupabaseUser()
  if (to.name == 'login') {
    if (user.value) return navigateTo('/admin')
  } else {
    if (!user.value) return navigateTo('/login')
  }
})
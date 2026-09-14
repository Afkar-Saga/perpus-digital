export function useDelayedLoader(statusRef, delay = 300) {
  const showLoader = ref(false)
  let timeout = null

  watch(statusRef, (newStatus) => {
    if (newStatus == 'pending') {
      timeout = setTimeout(() => {
        if (statusRef.value == 'pending') showLoader.value = true
      }, delay)
    } else {
      showLoader.value = false
      if (timeout) clearTimeout(timeout)
    }
  })

  return showLoader
}
// Inlined in the head so it runs before Astro starts importing islands.
(() => {
  const reloadKey = `blog:chunk-reload:${window.location.pathname}`
  const reportedErrors = new Set()
  let reloading = false

  const reporterReady = new Promise((resolve) => {
    window.addEventListener('blog:chunk-reporter-ready', (event) => resolve(event.detail), {
      once: true
    })
  })

  function recover(error) {
    if (reloading) return true

    let canReload = false
    try {
      if (!sessionStorage.getItem(reloadKey)) {
        sessionStorage.setItem(reloadKey, '1')
        canReload = true
      }
    } catch {
      // Without sessionStorage a reload could loop.
    }

    if (canReload) {
      reloading = true
      window.location.reload()
      return true
    }

    if (!reportedErrors.has(error)) {
      reportedErrors.add(error)
      reporterReady.then((report) => report(error))
    }
    return false
  }

  window.addEventListener('vite:preloadError', (event) => {
    if (recover(event.payload)) event.preventDefault()
  })

  // Astro 2 emits bare import() calls inside its inlined hydration runtime.
  window.addEventListener(
    'unhandledrejection',
    (event) => {
      const error = event.reason
      if (
        !(error instanceof TypeError) ||
        !/^(Failed to fetch dynamically imported module|error loading dynamically imported module|Importing a module script failed)\b/i.test(
          error.message
        )
      ) {
        return
      }

      event.preventDefault()
      event.stopImmediatePropagation()
      recover(error)
    },
    true
  )
})()

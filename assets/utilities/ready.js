export function ready (callback) {
  if (['complete', 'interactive'].includes(document.readyState)) {
    // call on next available tick
    setTimeout(callback, 1)
    return
  }
  document.addEventListener('DOMContentLoaded', callback)
}

import { ready } from './utilities/ready'

ready(function () {
  document.dispatchEvent(new window.CustomEvent('init', { detail: document }))
})

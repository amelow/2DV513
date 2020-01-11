// CLIENT SCRIPT som körs i webbläsaren
function init () {
  window.removeEventListener('load', init)
  document.addEventListener('submit', myScript())
  function myScript () {
    console.log('works')
  }
  fetch('/book', {
    method: 'POST'
  })
    .then(result => result.json())
    .then(result => console.log(result))
}
window.addEventListener('load', init)

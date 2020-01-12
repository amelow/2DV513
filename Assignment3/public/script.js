
// CLIENT SCRIPT som körs i webbläsaren
function init () {
  window.removeEventListener('load', init)
  const form = document.getElementById('form')
  form.addEventListener('submit', fetchData)
  console.log('button pressed')
}
function fetchData (e) {
  e.preventDefault()
  // const name = document.getElementById('name').value
  // const age = document.getElementById('age').value
  const author = document.getElementById('author').value
  const bookTitle = document.getElementById('bookTitle').value
  const publisher = document.getElementById('publisher').value
  const year = document.getElementById('year').value
  const category = document.getElementById('bookCategory').value
  const price = document.getElementById('price').value
  const ratings = document.getElementById('bookRating').value
  const comment = document.getElementById('commentBox').value

  // const bookClubName = document.getElementById('bookClubName').value
  // const country = document.getElementById('country').value
  /*
   name,
    age,
    country,
    bookClubName, */
  const obj = {
    author,
    bookTitle,
    publisher,
    year,
    price,
    ratings,
    comment,
    category
  }
  console.log(obj)
  fetch('/book', {
    method: 'POST',
    body: JSON.stringify(obj),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(result => result.json())
    .then(result => console.log(result))
}
window.addEventListener('load', init)

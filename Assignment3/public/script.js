
// CLIENT SCRIPT som körs i webbläsaren
function init () {
  window.removeEventListener('load', init)
  const form = document.getElementById('addReview')
  form.addEventListener('submit', fetchData)
}
function fetchData (e) {
  e.preventDefault()
  const name = document.getElementById('name').value
  const age = document.getElementById('age').value
  const author = document.getElementById('author').value
  const bookTitle = document.getElementById('bookTitle').value
  const publisher = document.getElementById('publisher').value
  const year = document.getElementById('year').value
  const price = document.getElementById('price').value
  const ratings = document.getElementById('bookRating').value
  const comment = document.getElementById('commentBox').value
  const category = document.getElementById('category').value
  const bookClubName = document.getElementById('bookClubName').value
  const country = document.getElementById('country').value

  const obj = {
    name,
    age,
    country,
    bookClubName,
    author,
    bookTitle,
    publisher,
    year,
    price,
    ratings,
    comment,
    category
  }
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

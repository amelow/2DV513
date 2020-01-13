
// CLIENT SCRIPT som körs i webbläsaren
function init () {
  window.removeEventListener('load', init)
  document.getElementById('form1').style.display = 'none'
  document.getElementById('form2').style.display = 'none'
  var btn = document.createElement('button')
  btn.innerHTML = 'Join Bookclub'
  const div = document.getElementById('test')
  // btn.onclick = document.getElementById('form1').style.display = 'display'
  div.appendChild(btn)

  const form1 = document.getElementById('form1')
  form1.addEventListener('submit', fetchUserData)
  const form2 = document.getElementById('form2')
  form2.addEventListener('submit', fetchBookData)
}
function fetchUserData (e) {
  e.preventDefault()
  const name = document.getElementById('name').value
  const age = document.getElementById('age').value
  const bookClubName = document.getElementById('bookClubName').value
  const country = document.getElementById('country').value

  const userObj = {
    name,
    age,
    country,
    bookClubName
  }
  console.log(userObj)
  fetch('/book', {
    method: 'POST',
    body: JSON.stringify(userObj),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(result => result.json())
    .then(result => console.log(result))
}
function fetchBookData (e) {
  e.preventDefault()
  const author = document.getElementById('author').value
  const bookTitle = document.getElementById('bookTitle').value
  const publisher = document.getElementById('publisher').value
  const year = document.getElementById('year').value
  const category = document.getElementById('bookCategory').value
  const price = document.getElementById('price').value
  const ratings = document.getElementById('bookRating').value
  const comment = document.getElementById('commentBox').value

  const bookObj = {
    author,
    bookTitle,
    publisher,
    year,
    price,
    ratings,
    comment,
    category
  }
  console.log(bookObj)
  fetch('/book', {
    method: 'POST',
    body: JSON.stringify(bookObj),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(result => result.json())
    .then(result => console.log(result))
}
window.addEventListener('load', init)

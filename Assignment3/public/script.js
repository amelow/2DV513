
// CLIENT SCRIPT som körs i webbläsaren

function init () {
  window.removeEventListener('load', init)
  document.getElementById('form1').style.display = 'none'
  document.getElementById('form2').style.display = 'none'
  var joinClubBtn = document.createElement('button')
  joinClubBtn.innerHTML = 'Join Bookclub'
  joinClubBtn.type = 'click'
  var addReviewBtn = document.createElement('button')
  addReviewBtn.innerHTML = 'Add Review'
  addReviewBtn.type = 'click'
  const div = document.getElementById('buttonDiv')
  div.appendChild(joinClubBtn)
  div.appendChild(addReviewBtn)

  joinClubBtn.addEventListener('click', getClubForm)
  addReviewBtn.addEventListener('click', getBookForm)
}
function getClubForm () {
  console.log('CLUB PRESSED')
  const form1 = document.getElementById('form1')
  document.getElementById('form1').style.display = ''
  form1.addEventListener('submit', fetchUserData)
}
function getBookForm () {
  console.log('BOOK PRESSED')
  document.getElementById('form2').style.display = ''
  const form2 = document.getElementById('form2')
  form2.addEventListener('submit', fetchBookData)
}
function fetchUserData (e) {
  document.getElementById('form1').style.display = 'none'
  e.preventDefault()
  const name = document.getElementById('name').value
  const age = document.getElementById('age').value
  const country = document.getElementById('country').value
  // const bookClubName = document.getElementById('bookClubName').value


  const userObj = {
    name,
    age,
    country
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
  document.getElementById('form2').style.display = 'none'
  e.preventDefault()
  const author = document.getElementById('author').value
  const bookTitle = document.getElementById('bookTitle').value
  const publisher = document.getElementById('publisher').value
  const year = document.getElementById('year').value
  const category = document.getElementById('bookCategory').value
  // const price = document.getElementById('price').value
  const ratings = document.getElementById('bookRating').value
  // const comment = document.getElementById('commentBox').value

  const bookObj = {
    author,
    bookTitle,
    publisher,
    year,
    ratings,
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
    .then(result => console.log(result.body))
}
window.addEventListener('load', init)

// CLIENT SCRIPT som körs i webbläsaren

function init () {
  window.removeEventListener('load', init)
  createButtons()
  getBooks()
  getAmountOfReviews()
  getChildrensBookclubs()
  getAdultBookclubs()
  getSwedishClubs()
}
function getBooks () {
  fetch('/getAllBooks')
    .then(res => res.json())
    .then(res => displayBooks(res))
}
function getAmountOfReviews () {
  fetch('/countBookClubs')
    .then(res => res.json())
    .then(res => displayAmountOfClubs(res))
}
function getChildrensBookclubs () {
  fetch('/getCildrensClub')
    .then(res => res.json())
    .then(res => displayChildrensClub(res))
}
function getAdultBookclubs () {
  fetch('/getAdultClub')
    .then(res => res.json())
    .then(res => displayAdultClub(res))
}
function getSwedishClubs () {
  fetch('/swedishClubs')
    .then(res => res.json())
    .then(res => displaySwedishClub(res))
}

function createButtons () {
  document.getElementById('form1').style.display = 'none'
  document.getElementById('form2').style.display = 'none'
  var joinClubBtn = document.createElement('button')
  joinClubBtn.innerHTML = 'Join Bookclub'
  var addReviewBtn = document.createElement('button')
  addReviewBtn.innerHTML = 'Add Review'
  const div = document.getElementById('buttonDiv')
  div.appendChild(joinClubBtn)
  div.appendChild(addReviewBtn)
  joinClubBtn.addEventListener('click', getClubForm)
  addReviewBtn.addEventListener('click', getBookForm)
}
function displayBooks (data) {
  const parent = document.getElementById('bookContainer')
  data.map(book => {
    parent.innerHTML += `
    <table style="width:50%">
    <td>${book.rating}</td>
    <td>${book.genre}</td>
    <td>${book.author}</td>
    <td>${book.title}</td>
    <td>${book.comments}</td>
  </tr>
</table>
    `
  })
}
function displayAmountOfClubs (data) {
  console.log(data)
  const counter = document.createElement('h2')
  counter.innerText = data
  const container = document.getElementById('clubCount')
  container.appendChild(counter)
}
function displayChildrensClub (data) {
  console.log(data)
  const clubDiv = document.getElementById('childrensBookClub')
  data.map(club => {
    clubDiv.innerHTML += `
    <table style="width:50%">
    <td>${club.name}</td>
    <td>${club.country}</td> 
  </tr>
</table>
    `
  })
}
function displayAdultClub (data) {
  // console.log(data)
  const adultClub = document.getElementById('adultsBookClub')
  data.map(adultclub => {
    adultClub.innerHTML += `
    <table style="width:50%">
    <td>${adultclub.name}</td>
    <td>${adultclub.country}</td> 
  </tr>
</table>
   `
  })
}
function displaySwedishClub (data) {
  const swedishdDiv = document.getElementById('swedishClubs')
  data.map(swedishclub => {
    swedishdDiv.innerHTML += `
    <table style="width:50%">
    <td>${swedishclub.name}</td>
  </tr>
</table>
   `
  })
}
function getBookForm () {
  console.log('BOOK PRESSED')
  document.getElementById('form2').style.display = ''
  const form2 = document.getElementById('form2')
  form2.addEventListener('submit', fetchBookData)
}
function getClubForm () {
  console.log('CLUB PRESSED')
  const form1 = document.getElementById('form1')
  document.getElementById('form1').style.display = ''
  form1.addEventListener('submit', fetchUserData)
}

function fetchBookData (e) {
  document.getElementById('form2').style.display = 'none'
  e.preventDefault()
  const author = document.getElementById('author').value
  const bookTitle = document.getElementById('bookTitle').value
  const publisher = document.getElementById('publisher').value
  const year = document.getElementById('year').value
  const category = document.getElementById('bookCategory').value
  const ratings = document.getElementById('bookRating').value
  const userName = document.getElementById('userName').value
  const comment = document.getElementById('comment').value
  console.log('hello ' + comment)

  const bookObj = {
    author,
    bookTitle,
    publisher,
    year,
    category,
    ratings,
    comment,
    userName
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

function fetchUserData (e) {
  document.getElementById('form1').style.display = 'none'
  e.preventDefault()
  const name = document.getElementById('name').value
  const age = document.getElementById('age').value
  const country = document.getElementById('country').value

  const userObj = {
    name,
    age,
    country
  }
  console.log(userObj)
  fetch('/user', {
    method: 'POST',
    body: JSON.stringify(userObj),
    headers: {
      'Content-Type': 'application/json'
    }
  })
    .then(result => result.json())
    .then(result => console.log('hej' + result))
}
window.addEventListener('load', init)

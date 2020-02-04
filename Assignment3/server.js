
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
const mysql = require('mysql')
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('public'))

var con = mysql.createConnection({
  host: '127.0.0.1',
  port: 3306,
  user: 'root',
  password: 'Ulrik123456',
  database: 'sys'
})
con.connect(function (err) {
  if (err) {
    console.log('IT DIDNT WORK')
    throw err
  } else {
    console.log('Connected!')
  }
})
// INSERTING INTO THE TABLE
app.post('/book', (request, response) => {
  fetchReviewData(request)
})

app.post('/user', (request, response) => {
  fetchUserData(request)
})
// 5 QUERIES
app.get('/getAllBooks', (request, response) => {
  getAllBooks()
    .then(data => response.json(data))
    .catch(err => console.log(err))
})
app.get('/countBookClubs', (request, response) => {
  countBookClubs()
    .then(data => response.json(data))
    .catch(err => console.log(err))
})
app.get('/getCildrensClub', (request, response) => {
  getChildrenClubs()
    .then(data => response.json(data))
    .catch(err => console.log(err))
})
app.get('/getAdultClub', (request, response) => {
  getAdultClubs()
    .then(data => response.json(data))
    .catch(err => console.log(err))
})
app.get('/swedishClubs', (request, response) => {
  getSwedishClubs()
    .then(data => response.json(data))
    .catch(err => console.log(err))
})

function fetchReviewData (request) {
  const {
    author,
    bookTitle,
    publisher,
    year,
    category,
    ratings,
    comment,
    userName
  } = request.body
  console.log(request.body)
  const reviewTable = `INSERT INTO bookReviews(author, title,publisher, publishingYear,genre,rating, comments, userId) VALUES
  ('${author}','${bookTitle}','${publisher}',${year},'${category}', ${ratings},'${comment}', (SELECT userId FROM clubs WHERE name= '${userName}'));`
  console.log(reviewTable)
  con.query(reviewTable, function (err, result) {
    if (err) {
      console.log('Error at REVIEW insert')
      throw err
    }
  })
  console.log('step3')
}
function fetchUserData (request) {
  const {
    name,
    age,
    country
  } = request.body

  const userTable = `INSERT INTO clubs (name, age, country) VALUES ('${name}','${age}','${country}');`
  con.query(userTable, function (err, result) {
    if (err) {
      console.log('Error at USER TABLE insert')
      throw err
    }
  })
}
function getAllBooks () {
  return new Promise((resolve, reject) => {
    con.query('SELECT rating, genre, author,title, comments FROM bookReviews WHERE rating >= 3 ORDER BY rating DESC', function (err, rows) {
      if (err) reject(err)
      resolve(rows)
    })
  })
}
function countBookClubs () {
  return new Promise((resolve, reject) => {
    con.query('select COUNT(*) from sys.clubs', function (err, rows) {
      if (err) reject(err)
      const entries = rows[0]['COUNT(*)']
      resolve(entries)
    })
  })
}
function getChildrenClubs () {
  return new Promise((resolve, reject) => {
    con.query('SELECT DISTINCT clubs.name,clubs.country FROM sys.clubs INNER JOIN sys.bookReviews ON bookReviews.userId=clubs.userId WHERE clubs.age <18 ORDER BY clubs.country', function (err, rows) {
      if (err) reject(err)
      resolve(rows)
    })
  })
}
function getAdultClubs () {
  return new Promise((resolve, reject) => {
    con.query('SELECT DISTINCT clubs.name,clubs.country FROM sys.clubs INNER JOIN sys.bookReviews ON bookReviews.userId=clubs.userId WHERE clubs.age >= 18 ORDER BY clubs.country', function (err, rows) {
      if (err) reject(err)
      resolve(rows)
    })
  })
}
function getSwedishClubs () {
  return new Promise((resolve, reject) => {
    con.query('SELECT * FROM sys.swedishBookclubs', function (err, rows) {
      if (err) reject(err)
      resolve(rows)
    })
  })
}
app.listen(port, console.log('server starts'))

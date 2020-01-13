
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
var mysql = require('mysql')
var bookInformation = []
var userInformation = []
let values = {}

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
    // getUserQuery()
    // getGenreAndRatingQuery()
    // TestQuery()
  }
})
function getUserQuery () {
  con.query('SELECT name FROM users', function (err, rows) {
    if (!err) {
      var string = JSON.stringify(rows)
      var json = JSON.parse(string)
      values = Object.values(json)
      console.log(values)
    } else {
      console.log('Error while performing Query.')
    }
  })
}

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('public'))

app.post('/book', (request, response) => {
  console.log('DETTA FUNKAR')
  fetchData(request)
})

function fetchData (request) {
  console.log(request.body)
  bookInformation = [[request.body.author, request.body.bookTitle, request.body.publisher, request.body.year, request.body.category]]
  var sqlTable1 = 'INSERT IGNORE INTO books (name, title, publisher, publishingYear,genre, rating) VALUES ?'
  con.query(sqlTable1, [bookInformation], function (err, result) {
    if (err) throw err
  })
  userInformation = [[request.body.name, request.body.age, request.body.country]]
  var sqlTable2 = 'INSERT IGNORE INTO users (name, age, country) VALUES ?'
  con.query(sqlTable2, [userInformation], function (err, result) {
    if (err) throw err
  })
}
app.listen(port, console.log('server starts'))

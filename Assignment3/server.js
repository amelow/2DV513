// hämtar express bibl
const express = require('express')
// instans av express
const app = express()
// finns en environment variabel annars default port
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
var mysql = require('mysql')
var bookInformation = []
var userInformation = []

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
    getQueries()
  }
})
function getQueries () {
  con.query('SELECT userName,bookClubName FROM sys.UserInfo', function (err, rows) {
    // con.query('SELECT * FROM sys.BookInfo WHERE bookGenre= "Memoir" AND bookRating= "3";', function (err, rows) {
    if (!err) {
      var string = JSON.stringify(rows)
      var json = JSON.parse(string)
      const values = Object.values(json)
      // console.log(values)
    } else {
      console.log('Error while performing Query.')
    }
  })
}
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(express.static('public'))
app.post('/book', (request, response) => {
  fetchData(request)
})

function fetchData (request) {
  bookInformation = [[request.body.author, request.body.bookTitle, request.body.publisher, request.body.year, request.body.category, request.body.price, request.body.ratings, request.body.comment]]
  var sqlTable1 = 'INSERT IGNORE INTO BookInfo (authorName, bookTitle, publisherName, publishingYear, bookGenre, bookPrice, bookRating,comment) VALUES ?'
  con.query(sqlTable1, [bookInformation], function (err, result) {
    if (err) throw err
  })
  userInformation = [[request.body.name, request.body.age, request.body.country, request.body.bookClubName]]
  var sqlTable2 = 'INSERT IGNORE INTO UserInfo (userName, userAge, userCountry,bookClubName) VALUES ?'
  con.query(sqlTable2, [userInformation], function (err, result) {
    if (err) throw err
  })
}
app.listen(port, console.log('server starts'))

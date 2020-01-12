// hämtar express bibl
const express = require('express')
// instans av express
const app = express()
// finns en environment variabel annars default port
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
var mysql = require('mysql')
var bookInformation = []

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

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static('public'))

app.post('/book', (request, response) => {
  fetchData(request)
})
function fetchData (request) {
  bookInformation = [[request.body.bookTitle, request.body.author, request.body.ratings]]
  console.log('BOOK INFO ' + request.body)
  var sqlTable1 = 'INSERT IGNORE INTO BookInfo (bookTitle, authorName, bookRating ) VALUES ?'
  con.query(sqlTable1, [bookInformation], function (err, result) {
    if (err) throw err
    getQueries()
  })
  function getQueries () {
    con.query('SELECT * FROM sys.BookInfo WHERE authorName= "Amelie Löwe";', function (err, rows) {
      if (!err) {
        console.log('The solution is: ', rows)
      } else {
        console.log('Error while performing Query.')
      }
    })
  }
}
app.listen(port, console.log('server starts'))

// hämtar express bibl
const express = require('express')
// instans av express
const app = express()
// finns en environment variabel annars default port
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')
var mysql = require('mysql')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static('public'))

app.post('/book', (request, response) => {
  console.log(request.body)
  createConnection(request)
})
function createConnection (request) {
  var con = mysql.createConnection({
    host: 'localhost',
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
}
app.listen(port, console.log('server starts'))

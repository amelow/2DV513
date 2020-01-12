// hämtar express bibl
const express = require('express')
// instans av express
const app = express()
// finns en environment variabel annars default port
const port = process.env.PORT || 3000
const bodyParser = require('body-parser')

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(express.static('public'))

app.post('/book', (request, response) => {
  // response.json(request.body)
  console.log(request.body)
})
app.listen(port, console.log('server starts'))

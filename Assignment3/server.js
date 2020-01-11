// hämtar express bibl
const express = require('express')
// instans av express
const app = express()
// finns en environment variabel annars default port
const port = process.env.PORT || 3000

app.use(express.static('public'))

app.post('/book', (request, response) => {
  response.json({ key: 'hej' })
})

app.listen(port, console.log('server starts'))

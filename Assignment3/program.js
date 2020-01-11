'use strict'
var mysql = require('mysql')
function init () {
  document.querySelector('#SendBtn').addEventListener('click', function listeners (e) {
    this.removeEventListener('click', listeners)
    console.log('BUTTON CLICKED')
  })
}

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

window.addEventListener('load', init)

// const e = require('express')

// CLIENT SCRIPT som körs i webbläsaren
function init () {
  window.removeEventListener('load', init)
  const form = document.getElementById('form')
  form.addEventListener('submit', fetchData)

  function fetchData (e) {
    e.preventDefault()
    const name = document.getElementById('name').value
    const age = document.getElementById('age').value
    const author = document.getElementById('author').value
    const bookTitle = document.getElementById('bookTitle').value
    const publisher = document.getElementById('publisher').value
    const year = document.getElementById('year').value
    const price = document.getElementById('price').value
    // const ratings = document.getElementById('ratings').value
    const comment = document.getElementById('commentBox').value
    const obj = {
      Name: name,
      Age: age,
      Author: author,
      BookTitle: bookTitle,
      Publisher: publisher,
      Year: year,
      Price: price,
      // Rating: ratings,
      Comment: comment
    }
    console.log(obj)
    fetch('/book', {
      method: 'POST',
      data: JSON.stringify(obj)
    })
      .then(result => result.json())
      .then(result => console.log(result))
  }
}
window.addEventListener('load', init)

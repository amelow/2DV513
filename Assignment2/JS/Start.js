const { PerformanceObserver, performance } = require('perf_hooks')
var fileSystem = require('fs')
var mysql = require('mysql')
var fileReader = require('readline')
var comValues = []
var userValues = []
var subValues = []
var timer = performance.now()
// Source https://www.w3schools.com/nodejs/nodejs_mysql.asp
// https://www.w3schools.com/nodejs/nodejs_mysql_insert.asp

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
    fetchData('./RC_2007-10')
    // fetchData('./RC_2011-07')
  }
})

function fetchData (JsonFile) {
  var readline = fileReader.createInterface({ input: fileSystem.createReadStream(JsonFile) })
  readline.on('line', function (line) {
    const data = JSON.parse(line)
    saveFile(data)
  })
}
/* com_body: data.body,
   com_link: data.link_id,
   com_utc: data.created_utc,
   user_id: data.parent_id,
   user_name: data.name,
   user_author: data.author,
   user_score: data.score,
   sub_id: data.subreddit_id,
   sub_name: data.subreddit
 */
function saveFile (data) {
  comValues = [[data.id, data.author, data.body, data.created_utc, data.link_id, data.score, data.subreddit]]
  userValues = [[data.parent_id, data.name, data.author, data.score]]
  subValues = [[data.subreddit_id, data.subreddit]]

  var sqlTable1 = 'INSERT IGNORE INTO UserInfo (user_id, user_name, user_author,user_score) VALUES ?'
  con.query(sqlTable1, [userValues], function (err, result) {
    if (err) throw err
  //  console.log('UserInfo name: ' + data.author)
    // console.log('UserInfo ID: ' + data.id)
  })
  var sqlTable2 = 'INSERT IGNORE INTO Subreddit(sub_id,sub_name) VALUES ?'
  con.query(sqlTable2, [subValues], function (err, result) {
    if (err) throw err
  })
  var sqlTable3 = 'INSERT IGNORE INTO Comment (com_id, com_Author, com_body,com_utc, com_link, com_score, com_sub) VALUES ?'
  con.query(sqlTable3, [comValues], function (err, result) {
    if (err) throw err
    // console.log('Comment body: ' + data.body)
    var timerEnd = performance.now()
    console.log('The time in milliseconds is: ' + (timerEnd - timer))
  })
}

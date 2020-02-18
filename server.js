var express = require('express');
var bodyParser = require('body-parser');

var tasks = require('./routes/tasks');
var cors = require('cors');

var port = 3000;

var app = express();
// var apps = require('express')();
// apps.use(cors());
// var http = require('http').Server(app);
// var io = require('socket.io')(http, { origins: '*:*'});
// io.set('origins', 'http://localhost:8080');
// io.origins((origin, callback) => {
//   if (origin !== 'http://localhost:8080/#/') {
//       return callback('origin not allowed', false);
//   }
//   callback(null, true);
// });
// io.on('connection', socket => {
//   socket.on('newUser', () => {
//     console.log("Hadir");
//   })

//   socket.on('disconnect', () => {
//     console.log("Keluar");
//   })
// })

app.use(cors());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/api', tasks);

var server = app.listen(port, function() {
  console.log('Server started on port ' + port);
});

var io = require('socket.io').listen(server)
io.on('connection', socket => {
  socket.emit('loggedIn', () => {
    console.log("Login")
  })

  socket.on('task', task => {
    io.emit('task', task)
  })

  socket.on('newUser', () => {
    console.log("Hadir");
  })

  socket.on('disconnect', () => {
    console.log("Keluar");
  })
})
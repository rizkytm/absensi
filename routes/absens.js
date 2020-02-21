var express = require('express');
var router = express.Router();
const Absen = require('../model/Absen');

const ioClient = require('socket.io-client');
const socketClient = ioClient('http://localhost:3000');

// Get All Tasks
router.get('/absens', (req, res) => {
    Absen.findAll({
    where: {
      status: "Hadir"
    },
    order: [
      ['presence_time', 'ASC']
    ]
  })
    .then(absens => {
      res.json(absens);
    })
    .catch(err => {
      res.send('error: ' + err);
    });
});

// Add Task
router.post('/absen', (req, res) => {
  if (!req.body.no_konfirmasi) {
    res.status(400);
    res.json({
      error: 'Bad Data'
    });
  } else {
    Absen.create(req.body)
      .then(() => {
        socketClient.emit('absen', req.body);
        res.send('Absen Added');
      })
      .catch(err => {
        res.send('Error: ' + err);
      });
  }
});

// Delete Task
router.delete('/absen/:id', (req, res) => {
    Absen.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(() => {
      res.send('Absen Deleted!');
    })
    .catch(err => {
      res.send('error: ' + err);
    });
});

// Update Task
router.put('/absen/:no_konfirmasi', (req, res) => {
  if (!req.body.status) {
    res.status(400);
    res.json({
      error: 'Bad Data'
    });
  } else {
    let dateTime = new Date().toLocaleString("en-US", {timeZone: "Asia/Jakarta"})
    console.log(dateTime);
    dateTime = new Date(dateTime)
    console.log(dateTime);
    console.log(dateTime.toLocaleString());
    Absen.update({ status: req.body.status, presence_time : dateTime.toLocaleString() },
      // { presence_time : Date().toLocaleString() },
      { where: { no_konfirmasi: req.params.no_konfirmasi } },
    )
      .then(() => {
        socketClient.emit('absen', req.body.task_name);
        res.send('Absen Updated!');
      })
      .error(err => res.send(err));
    
  }
});

module.exports = router;

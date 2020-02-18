var express = require('express');
var router = express.Router();
const Task = require('../model/Task');

const ioClient = require('socket.io-client');
const socketClient = ioClient('http://localhost:3000');

// Get All Tasks
router.get('/tasks', (req, res) => {
  Task.findAll()
    .then(tasks => {
      var task = tasks.filter(tas => {
        return tas.status == "Hadir";
      })
      // console.log(task);
      // console.log(tasks);
      res.json(task);
    })
    .catch(err => {
      res.send('error: ' + err);
    });
});

// Add Task
router.post('/task', (req, res) => {
  if (!req.body.task_name) {
    res.status(400);
    res.json({
      error: 'Bad Data'
    });
  } else {
    Task.create(req.body)
      .then(() => {
        socketClient.emit('task', req.body);
        res.send('Task Added');
      })
      .catch(err => {
        res.send('Error: ' + err);
      });
  }
});

// Delete Task
router.delete('/task/:id', (req, res) => {
  Task.destroy({
    where: {
      id: req.params.id
    }
  })
    .then(() => {
      res.send('Task Deleted!');
    })
    .catch(err => {
      res.send('error: ' + err);
    });
});

// Update Task
router.put('/task/:id', (req, res) => {
  if (!req.body.status) {
    res.status(400);
    res.json({
      error: 'Bad Data'
    });
  } else {
    Task.update(
      { status: req.body.status },
      { where: { id: req.params.id } }
    )
      .then(() => {
        socketClient.emit('task', req.body.task_name);
        res.send('Task Updated!');
      })
      .error(err => res.send(err));
  }
});

module.exports = router;

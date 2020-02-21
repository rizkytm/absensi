<template>
  <div class="hello">
    <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
      <h5 class="my-0 mr-md-auto font-weight-normal">Introduction to Total Success</h5>
      <nav class="my-2 my-md-0 mr-md-3">
        <a class="p-2 text-dark" href="#">Features</a>
        <a class="p-2 text-dark" href="#">Enterprise</a>
      </nav>
      <a class="btn btn-outline-primary" href="#">Login</a>
    </div>
    <div id="todo-list-example" class="container">
      <div class="row">
        <div class="col-md-4 order-md-2 mb-4">
          <h1 class="text-center">TODO List App</h1>
          <form v-on:submit.prevent="addNewTask">
            <label for="tasknameinput">Task Name</label>
            <input v-model="taskName" type="text" id="tasknameinput" class="form-control" placeholder="Add New Task" />
            <button
              v-if="this.isEdit == false"
              type="submit"
              class="btn btn-success btn-block mt-3"
            >Submit</button>
            <button v-else v-on:click="updateTask()" type="button" class="btn btn-primary btn-block mt-3">Update</button>
          </form>

          <table class="table">
            <tr v-for="(todo) in todos" v-bind:key="todo.id" v-bind:title="todo.task_name">
              <td class="text-left" v-on:click="setActiveTask(todo.task_name)">{{todo.task_name}}</td>
              <td class="text-right">
                <button class="btn btn-info" v-on:click="editTask(todo.task_name, todo.id)">Edit</button>
                <button class="btn btn-danger" v-on:click="deleteTask(todo.id)">Delete</button>
              </td>
            </tr>
          </table>
        </div>

      <div class="col-md-8 order-md-1">
      <h4 class="mb-3">Billing address</h4>
      <form class="needs-validation" novalidate>
        <div class="row">
          <div class="col-md-12 mb-3">
            <table class="table table-striped table-hover">
              <thead>
                <tr>
                  <th scope="col">#</th>
                  <th scope="col">First</th>
                  <th scope="col">Last</th>
                  <th scope="col">Handle</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row">1</th>
                  <td>Mark</td>
                  <td>Otto</td>
                  <td>@mdo</td>
                </tr>
                <tr>
                  <th scope="row">2</th>
                  <td>Jacob</td>
                  <td>Thornton</td>
                  <td>@fat</td>
                </tr>
                <tr>
                  <th scope="row">3</th>
                  <td>Larry</td>
                  <td>the Bird</td>
                  <td>@twitter</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </form>
      </div>

      </div>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import io from 'socket.io-client'

export default {
  data () {
    return {
      activeTask: '',
      todos: [],
      id: '',
      taskName: '',
      isEdit: false,
      socket: io('http://localhost:3000')
    }
  },
  mounted () {
    this.getTasks()
    this.joinServer()
  },
  methods: {
    setActiveTask (task) {
      this.activeTask = task
    },
    joinServer: function () {
      this.socket.on('loggedIn', () => {
        console.log('Saya Hadir')
      })
      this.listen()
    },
    listen () {
      this.socket.on('task', task => {
        this.getTasks()
        // this.todos = task
      })
    },
    getTasks () {
      axios.get('/api/tasks').then(
        result => {
          console.log(result.data)
          this.todos = result.data
          // this.activeTask = this.todos[-1]
          this.setActiveTask(this.todos[this.todos.length - 1].task_name)
        },
        error => {
          console.error(error)
        }
      )
    },
    addNewTask () {
      axios
        .post('/api/task', { task_name: this.taskName })
        .then(res => {
          this.taskName = ''
          this.getTasks()
        })
        .catch(err => {
          console.log(err)
        })
    },
    editTask (title, id) {
      this.id = id
      this.taskName = title
      this.isEdit = true
    },
    updateTask () {
      axios
        .put(`/api/task/${this.id}`, { task_name: this.taskName })
        .then(res => {
          this.taskName = ''
          this.isEdit = false
          this.getTasks()
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        })
    },
    deleteTask (id) {
      axios.delete(`/api/task/${id}`)
        .then((res) => {
          this.task_name = ''
          this.getTasks()
          console.log(res)
        })
        .catch((err) => {
          console.log(err)
        }
        )
    }
  }
}
</script>

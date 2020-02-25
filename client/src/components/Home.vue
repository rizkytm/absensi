<template>
    <div>
        <!-- <div class="d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm">
            <h5 class="my-0 mr-md-auto font-weight-normal">Introduction to Total Success</h5>
            <nav class="my-2 my-md-0 mr-md-3">
                <a class="p-2 text-dark" href="#">Presence</a>
                <a class="p-2 text-dark" href="#">List</a>
            </nav>
            <a class="btn btn-outline-primary" href="#">Login</a>
        </div> -->
        <div class="container">
            <div class="row">
                <div class="col-md-8">
                    <h3>List Kehadiran</h3>
                    <table class="table table-striped table-hover">
                        <thead>
                            <tr>
                            <th scope="col">#</th>
                            <th scope="col">Nama</th>
                            <th scope="col">No Konfirmasi</th>
                            <th scope="col">Jenis Tiket</th>
                            <th scope="col">Program</th>
                            <th scope="col">Status</th>
                            <th scope="col">Presence Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr style="cursor: pointer;" v-on:click="setActiveAbsen(absen)" v-for="(absen, index) in absens" v-bind:key="absen.id" v-bind:title="absen.nama">
                            <th scope="row">{{index+1}}</th>
                            <td>{{absen.nama}}</td>
                            <td>{{absen.no_konfirmasi}}</td>
                            <td>{{absen.jenis_tiket}}</td>
                            <td>{{absen.program}}</td>
                            <td>{{absen.status}}</td>
                            <td>{{absen.presence_time}}</td>
                            </tr>
                        </tbody>
                        </table>
                </div>
                <div class="col-6 col-md-4">
                    <h3>Data Peserta</h3>
                    <div class="card">
                    <ul class="list-group list-group-flush">
                        <li class="list-group-item">Nama : {{activeAbsen.nama}}</li>
                        <li class="list-group-item">No Konfirmasi : {{activeAbsen.no_konfirmasi}}</li>
                        <li class="list-group-item">Jenis Tiket : {{activeAbsen.jenis_tiket}}</li>
                        <li class="list-group-item">Program : {{activeAbsen.program}}</li>
                        <li class="list-group-item">Status : {{activeAbsen.status}} </li>
                        <li class="list-group-item">Presence Time : {{activeAbsen.presence_time}} </li>
                    </ul>
                    </div>
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
      activeAbsen: '',
      absens: [],
      id: '',
      taskName: '',
      isEdit: false,
      socket: io('http://localhost:3000')
    }
  },
  mounted () {
    this.getAbsens()
    this.joinServer()
  },
  methods: {
    setActiveAbsen (absen) {
      this.activeAbsen = absen
    },
    joinServer: function () {
      this.socket.on('loggedIn', () => {
        console.log('Saya Hadir')
      })
      this.listen()
    },
    listen () {
      this.socket.on('absen', absen => {
        this.getAbsens()
        // this.todos = task
      })
    },
    getAbsens () {
      axios.get('/api/absens').then(
        result => {
          console.log(result.data)
          this.absens = result.data
          // this.activeTask = this.todos[-1]
          this.setActiveAbsen(this.absens[this.absens.length - 1])
        },
        error => {
          console.error(error)
        }
      )
    },
    addNewAbsen () {
      axios
        .post('/api/absen', { absen: this.taskName })
        .then(res => {
          this.taskName = ''
          this.getAbsens()
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
        .put(`/api/absen/${this.id}`, { absen: this.taskName })
        .then(res => {
          this.taskName = ''
          this.isEdit = false
          this.getAbsens()
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
          this.getAbsens()
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

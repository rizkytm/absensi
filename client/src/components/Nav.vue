<template>
    <div class='d-flex flex-column flex-md-row align-items-center p-3 px-md-4 mb-3 bg-white border-bottom shadow-sm'>
            <h5 class='my-0 mr-md-auto font-weight-normal'>Introduction to Total Success</h5>
            <nav class='my-2 my-md-0 mr-md-3'>
                <a class='p-2 text-dark' v-if='user.loggedIn'>
                    <router-link to='/'>Home</router-link>
                </a>
                <a class='p-2 text-dark' v-if='user.loggedIn'>
                    <router-link to='/all'>All Lists</router-link>
                </a>
                <a class='p-2 text-dark' v-if='user.loggedIn'>
                    {{user.data.displayName}}
                </a>
            </nav>
            <!-- <a class='btn btn-outline-primary' href='#' v-if='!user.loggedIn'>Login</a> -->
            <a class='btn btn-outline-primary' @click.prevent='signOut' v-if='user.loggedIn'>Logout</a>
        </div>
</template>

<script>
import { mapGetters } from 'vuex'
import firebase from 'firebase'
export default {
  name: 'Nav',
  computed: {
    ...mapGetters({
      user: 'user'
    })
  },
  methods: {
    signOut () {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.replace({
            name: 'Login'
          })
        })
    }
  }
}
</script>

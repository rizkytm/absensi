<template>
    <div class='col-md-4 offset-md-4 mt-5'>
    <div v-if='error' class='alert alert-danger'>{{error}}</div>
    <form class='form-signin' action='#' @submit.prevent='submit'>
        <img class='mb-4' src='/docs/4.4/assets/brand/bootstrap-solid.svg' alt='' width='72' height='72'>
        <h1 class='h3 mb-3 font-weight-normal'>Please sign in</h1>
        <label for='inputEmail' class='sr-only'>Email address</label>
        <input
                    placeholder='Email'
                    id='email'
                    type='email'
                    class='form-control'
                    name='email'
                    value
                    required
                    autofocus
                    v-model='form.email'
                  />
        <label for='inputPassword' class='sr-only'>Password</label>
        <input
                    placeholder='Password'
                    id='password'
                    type='password'
                    class='form-control'
                    name='password'
                    required
                    v-model='form.password'
                  />
        <button class='btn btn-lg btn-primary btn-block' type='submit'>Sign in</button>
    </form>
    </div>
</template>

<script>
import firebase from 'firebase'

export default {
  data () {
    return {
      form: {
        email: '',
        password: ''
      },
      error: null
    }
  },
  methods: {
    submit () {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.form.email, this.form.password)
        .then(() => {
          this.$router.replace({ name: 'Home' })
        })
        .catch(err => {
          this.error = err.message
        })
    }
  }
}
</script>

<template>
  <div class="home">
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <button @click="logout">Logout</button>
  </div>
</template>

<script>
//import firebase from 'firebase';
import { dataref, usersref, authentication } from '@/firebase.js'
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'

export default {
  name: 'home',
  components: {
    HelloWorld
  },
  firebase: {
     data: dataref,
    user: usersref
   },
  methods: {
    logout: function() {
      authentication.signOut().then(() => {
        this.$router.replace('login')
      })
    }
  }
}
</script>

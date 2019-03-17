<template>
  <div class="home">
    <Sidebar>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    <button @click="logout">Logout</button>
    </Sidebar>
  </div>
</template>

<script>
//import firebase from 'firebase';
import { dataref, usersref, authentication } from '@/firebase.js'
// @ is an alias to /src
import HelloWorld from '@/components/HelloWorld.vue'
import Sidebar from '@/components/layout/Sidebar.vue'

export default {
  name: 'home',
  components: {
    HelloWorld,
    Sidebar
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

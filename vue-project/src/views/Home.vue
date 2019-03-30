<template>
  <div class="home">
    <Sidebar>
      <b-container fluid>
      <b-row>
        <b-col md="4" class="my-3">
          <b-card title="Total Sales" style="text-align:center;">
            <h3>£{{Totalsales}}</h3>
          </b-card>
        </b-col>
        <b-col md="4" class="my-3">
          <b-card title="Total Profit" style="text-align:center;">
            <h3>£{{Totalprofit}}</h3>
          </b-card>
        </b-col>
        <b-col md="4" class="my-3">
          <b-card title="Sold Items" style="text-align:center;">
            <h3>{{Itemssold}}</h3>
          </b-card>
        </b-col>
      </b-row>
      </b-container>
    <HelloWorld msg="Welcome to Your Vue.js App"/>
    
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
  data() {
    return {
      Itemssold: 0,
      Totalsales: 0,
      Totalprofit: 0
    }
  },
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

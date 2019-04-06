<template>
  <div class="home">
    <Sidebar>
      <b-container>
      <b-row class="mb-3">
        <b-col md="4" class="my-3">
          <b-card title="Total Sales" style="text-align:center;">
            <h3>£{{$UID}}</h3>
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
      <b-container class="mb-3" fluid>
        <h3>Monthly Sales</h3>
        <Msales/>
      </b-container>
      <b-container fluid>
        <b-row class="mb-3">
          <b-col cols="6">
            <h3>Popular Items</h3>
          <PItems/>
          </b-col>
          <b-col cols="6">
            <h3>Sales by category</h3>
          <Csales/>
          </b-col>
        </b-row>
      </b-container>
      <b-container fluid>
        <h3>Discount recommendations</h3>
        <b-row class="mb-3">
          <b-col cols="6">
          <b-card title="Due to sale loss" style="text-align:center;">
            <h4>{{Itema}}</h4>
            <h5>From £{{Originalpa}} to £{{Recommenda}}</h5>
            <h4>Accept recommendation?</h4>
            <b-button variant="success">Yes</b-button>
            <b-button variant="danger">No</b-button>
          </b-card>
          </b-col>
          <b-col cols="6">
          <b-card title="Due to low sales" style="text-align:center;">
            <h4>{{Itemb}}</h4>
            <h5>From £{{Originalpb}} to £{{Recommendb}}</h5>
            <h4>Accept recommendation?</h4>
            <b-button variant="success">Yes</b-button>
            <b-button variant="danger">No</b-button>
          </b-card>
          </b-col>
        </b-row>
      </b-container>      
    
    </Sidebar>
  </div>
</template>

<script>
//import firebase from 'firebase';
import { dataref, usersref, authentication } from '@/firebase.js'
// @ is an alias to /src
//import HelloWorld from '@/components/HelloWorld.vue'
import Msales from '@/components/MonthlySales.vue'
import PItems from '@/components/PopularItems.vue'
import Csales from '@/components/SalesCategory.vue'
import Sidebar from '@/components/layout/Sidebar.vue'

export default {
  name: 'home',
  data() {
    return {
      Itemssold: 3206,
      Totalsales: 80117,
      Totalprofit: 40058,
      Recommenda: 19.99,
      Recommendb: 5.99,
      Originalpa: 24.99,
      Originalpb: 9.99,
      Itema: 'PRD81',
      Itemb: 'PRD167'
    }
  },
  components: {
    //HelloWorld,
    Sidebar,
    Msales,
    PItems,
    Csales
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

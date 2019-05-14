<template>

  <div class= "side-bar">
<div>
  <b-navbar fixed="top" type="dark" variant="dark">
    <b-navbar-nav>

      <!-- Navbar dropdowns -->
      <b-nav-item-dropdown id="dropdown-left" text="Left align" variant="link" size="lg" class="topleft" no-caret>
        <template slot="button-content"><i class="fa icons">&#xf0c9;</i></template>
        <b-dropdown-item><router-link to="/edit">Stock</router-link></b-dropdown-item>
        <b-dropdown-item><router-link to="/calendar">Calendar</router-link></b-dropdown-item>
        <b-dropdown-item><router-link to="/reports">Reports</router-link></b-dropdown-item>
      </b-nav-item-dropdown>

      <b-nav-item class="center"><router-link to="/home">Home</router-link></b-nav-item>

      <b-nav-item-dropdown id="dropdown-right" right text="Right align" variant="link" size="lg" class="topright" no-caret>
        <template slot="button-content"><i class="fa icons">&#xf2bd;</i><a @click="logout"></a></template>
        <b-dropdown-item><router-link to="/account">Account</router-link></b-dropdown-item>
        <b-dropdown-item><a @click="logout">Logout</a></b-dropdown-item>
      </b-nav-item-dropdown>
    </b-navbar-nav>
  </b-navbar>
</div>
		<slot/>
  </div>

</template>

<script>
import { authentication, usersref } from '@/firebase.js'

export default {
  data() {
      return {
        companyname: '',
        key: ''
      }
    },
    firebase:{
    users: usersref
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


<style scoped>
 a{
  text-decoration: none;
}  
.icons{
   float:left;
  margin-right:10px;

}
.topleft {
  bottom: 0px;
  left: 0px; 
}
.topleft a{
  color:black;
}
.topright {
  position: absolute;
  top: 4px;
  right: 16px;
}
.topright a{
  color:black;
}
.center {
  position: absolute;
  left: 50%;
  top: 2px;
  font-size: 18px;
  text-align: center;
}
.center a{
  color:rgba(255, 255, 255, 0.5);
}
</style>
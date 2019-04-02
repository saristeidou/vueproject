<template>

  <div class= "side-bar">
<!-- <div>
  <b-navbar toggleable type="light" variant="light">
    <b-navbar-toggle target="nav_text_collapse" />

    <b-navbar-brand><router-link to="/home">Sales-analysis</router-link></b-navbar-brand>

    <b-collapse is-nav id="nav_text_collapse">
      <b-navbar-nav>
        <b-nav-item><router-link to="/home"><i class="fa icons">&#xf3fd;</i>Dashboard</router-link></b-nav-item>
        <b-nav-item><router-link to="/branch"><i class="fa icons">&#xf1ad;</i>Branch</router-link></b-nav-item>
        <b-nav-item><router-link to="/sales"><i class="fa icons">&#xf080;</i>Sales</router-link></b-nav-item>
        <b-nav-item><router-link to="/products"><i class="fa icons">&#xf07a;</i>Product</router-link></b-nav-item>
        <b-nav-item><router-link to="/edit"><i class="fa icons">&#xf044;</i>Edit</router-link></b-nav-item>
        <b-nav-item><i class="fa icons">&#xf2bd;</i><a @click="logout">Logout</a></b-nav-item>
      </b-navbar-nav>
    </b-collapse>
    <b-dropdown variant="link" size="lg" >
      <template slot="button-content"><i class="fa icons">&#xf2bd;</i><a @click="logout"></a></template>
        <b-dropdown-item href="#">Account</b-dropdown-item>
         <b-dropdown-item><a @click="logout">Logout</a></b-dropdown-item>
      </b-dropdown>
  </b-navbar>
</div> -->
<div>
  <b-navbar type="dark" variant="dark">
    <b-navbar-nav>

      <!-- Navbar dropdowns -->
      <b-nav-item-dropdown id="dropdown-left" text="Left align" variant="link" size="lg" no-caret>
        <template slot="button-content"><i class="fa icons">&#xf0c9;</i></template>
        <b-dropdown-item href="#">EN</b-dropdown-item>
        <b-dropdown-item href="#">ES</b-dropdown-item>
        <b-dropdown-item href="#">RU</b-dropdown-item>
        <b-dropdown-item href="#">FA</b-dropdown-item>
      </b-nav-item-dropdown>

      <b-nav-item class="center"><router-link to="/home">Home</router-link></b-nav-item>

      <b-nav-item-dropdown id="dropdown-right" right text="Right align" variant="link" size="lg" class="topright" no-caret>
        <template slot="button-content"><i class="fa icons">&#xf2bd;</i><a @click="logout"></a></template>
        <b-dropdown-item href="#">Account</b-dropdown-item>
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
import firebase from 'firebase'
import debounce from 'lodash/debounce'

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
//   created: debounce(function () {
//     this.$nextTick(() => {
//         this.GetKey(); 
//     })
// }, 1500),
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
/* a{
color:rgba(255, 255, 255, 0.5) !important;
}  */
.icons{
   float:left;
  margin-right:10px;

}
.topleft {
  bottom: 8px;
  left: 16px;

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
/* .dropdown-menu{
background-color: coral !important;
} */


</style>
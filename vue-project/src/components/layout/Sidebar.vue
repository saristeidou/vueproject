<template>

  <div class= "side-bar">
<div>
  <b-navbar toggleable type="dark" variant="dark">
    <b-navbar-toggle target="nav_text_collapse" />

    <b-navbar-brand>Vue-project</b-navbar-brand>

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
  </b-navbar>
</div>
		<slot/>
  </div>

</template>

<script>
import { authentication } from '@/firebase.js';

export default {
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
color:rgba(255, 255, 255, 0.5) !important;
text-align:left;;
}
.icons{
   float:left;
  margin-right:10px;
  
}


</style>
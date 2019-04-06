<template>
  <div id="app">
    
<router-view/>
    
  </div>
  
</template>

<script>
import firebase from 'firebase';
import Vue from 'vue';
export default {
  created: function(){
    Vue.prototype.$UID = firebase.auth().currentUser.uid
  }
}
</script>


<style>
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
#nav {
  padding: 30px;
}

#nav a {
  font-weight: bold;
  color: #2c3e50;
}

#nav a.router-link-exact-active {
  color: #42b983;
}

html,body{
  margin: 0;
  font-family: 'lato',Arial;
  background-color: #F1F1F1;
   overflow: auto;
}



</style>

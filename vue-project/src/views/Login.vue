<template>
  <div class="login">
    <!-- Login page -->
    <LayoutLogin>
    <b-card>
      <h3>Sign In</h3>
        <b-row class="my-1">
          <b-col sm="3">
          </b-col>
            <b-col sm="6">
              <b-form-input id="input-default" placeholder="Enter your Email" v-model = "email" ></b-form-input>
            </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="3">
          </b-col>
          <b-col sm="6">
            <b-form-input id="input-default" type="password" placeholder="Enter your Password" v-model = "password"></b-form-input>
          </b-col>
        </b-row>
        <b-button variant="primary" @click="login">Login</b-button>
      <p>You don't have an account ? You can <router-link to="/sign-up">create one</router-link></p>
    </b-card>
    </LayoutLogin> 
  </div>
</template>

<script>
  import { authentication } from '@/firebase.js';
  import LayoutLogin from '@/components/layout/Login_layout.vue'
  import firebase from 'firebase';
  import Vue from 'vue';
  export default {
    name: 'login',
    data() {
      return {
        email: '',
        password: ''
      }
    },
    components:{
      LayoutLogin
    },
    methods: {
      login: function() {
        // valitates the input 
        authentication.signInWithEmailAndPassword(this.email, this.password).then(
          (user) => {
            Vue.prototype.$UID = firebase.auth().currentUser.uid
            this.$router.replace('home')
          },
          (err) => {
            alert('Oops. ' + err.message)
          }
        );
      }
    }
  }
</script>

<style scoped>  /* "scoped" attribute limit the CSS to this component only */
  .login {
    margin-top: 40px;
  }
  input {

    padding: 15px;
    margin: 10px 0;
  }
  /* button {
    margin-top: 20px;
    width: 10%;
    cursor: pointer;
  } */
  p {
    margin-top: 40px;
    font-size: 13px;
  }
  p a {
    text-decoration: underline;
    cursor: pointer;
  }
</style>
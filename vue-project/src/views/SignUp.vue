<template>
  <div class="sign-up">
    <p>Let's create a new account !</p>
    <input type="text" v-model="email" placeholder="Email"><br>
    <input type="password" v-model="password" placeholder="Password"><br>
    <b-alert
      :show="dismissCountDown"
      dismissible
      variant="danger"
      @dismissed="dismissCountDown=0"
      @dismiss-count-down="countDownChanged"
    >  
    Password does not much!
    </b-alert>
    <input type="password" v-model="confirmpassword" placeholder="Password"><br>
    <button @click="signUp">Sign Up</button>
    <span>or go back to <router-link to="/login">login</router-link>.</span>
  </div>
</template>

 <script>
  import { authentication, usersref } from '@/firebase.js';
  import firebase from 'firebase';
  import Vue from 'vue';

  export default {
    name: 'signUp',
    data() {
      return {
        email: '',
        password: '',
        confirmpassword: '',
        name: '',
        surname: '',
        company: '',
        dismissSecs: 2,
        dismissCountDown: 0,
        showDismissibleAlert: false
      }
    },
    firebase:{
      newuser: usersref
    },
    methods: {
      signUp: function() {
        if(this.password == this.confirmpassword){
        authentication.createUserWithEmailAndPassword(this.email, this.password).then(
          (user) => {
            Vue.prototype.$UID = firebase.auth().currentUser.uid
            usersref.push({UserId: firebase.auth().currentUser.uid, Name: this.name, 
            Surname: this.surname, Company: this.company});
            this.$router.replace('details')
          },
          (err) => {
            alert('Oops. ' + err.message)
          }
        );
        }else{
          this.showAlert();
        }
      },
      countDownChanged(dismissCountDown) {
        this.dismissCountDown = dismissCountDown
      },
      showAlert() {
        this.dismissCountDown = this.dismissSecs
      }
    }
  }
</script>

 <style scoped>
  .sign-up {
    margin-top: 40px;
  }
  input {
    margin: 10px 0;
    width: 20%;
    padding: 15px;
  }
  button {
    margin-top: 10px;
    width: 10%;
    cursor: pointer;
  }
  span {
    display: block;
    margin-top: 20px;
    font-size: 11px;
  }
</style>
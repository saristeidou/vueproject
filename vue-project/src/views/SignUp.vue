<template>
  <div class="sign-up">
    <LayoutLogin>
      <b-card>
        <!-- Sign up page where users can create an account -->
      <h3>Sign Up</h3>
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
        <b-row class="my-1">
          <b-col sm="3">
          </b-col>
          <b-col sm="6">
            <b-form-input id="input-default" type="password" placeholder="Renter your Password" v-model = "confirmpassword"></b-form-input>
          </b-col>
        </b-row>
        <b-row class="my-1">
          <b-col sm="3">
          </b-col>
          <b-col sm="6">
            <b-alert
              :show="dismissCountDown"
              dismissible
              variant="danger"
              @dismissed="dismissCountDown=0"
              @dismiss-count-down="countDownChanged"
            >  
            Password does not much!
            </b-alert>
          </b-col>
        </b-row>
        <b-button variant="primary" @click="signUp">Sign Up</b-button>
      <p>or go back to <router-link to="/login">login</router-link>.</p>
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
    created:function(){
      console.log(user)
    },
    methods: {
      signUp: function() {
        //creates a new account and send the user to the details page 
        //to the Add details page
        if(this.password == this.confirmpassword){
        authentication.createUserWithEmailAndPassword(this.email, this.password).then(
          (user) => {
            console.log(user)
            const id = firebase.auth().currentUser.uid
            Vue.prototype.$UID = id
            const us = firebase.database().ref('Data/4/users/' + id)
            us.update({UserId: id, Name: this.name, 
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
    padding: 15px;
  }
  button {
    margin-top: 10px;
    cursor: pointer;
  }
  p {
    display: block;
    margin-top: 20px;
  }
</style>
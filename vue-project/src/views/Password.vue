<template>
  <div class="password">
        <Sidebar>
        <b-container fluid>
    <b-card class="my-3">
        <b-row class="my-1">
            <b-col sm="4">
                <label for="input-default">Password:</label>
            </b-col>
            <b-col sm="8">
                <b-form-input id="oldpass" type="password"  placeholder="Enter your old password" v-model="password"></b-form-input>
            </b-col>
        </b-row>
        <b-row class="my-1">
            <b-col sm="4">
                <label for="input-default">New password:</label>
            </b-col>
            <b-col sm="8">
                <b-form-input type="password" id="input-default" placeholder="Enter your new password" v-model="npassword"></b-form-input>
            </b-col>
        </b-row>
        <b-row class="my-1">
            <b-col sm="4" class="mt-3">
                <label for="input-default">Confirm password:</label>
            </b-col>
            <b-col sm="8">
                <b-form-input :type="cptype" :state="State" id="input-default" placeholder="Confirm your new password" v-model="cpassword">
                    </b-form-input>  
            </b-col>       
        </b-row>
        <b-row class="my-4"/>
        <b-button variant="success" @click="Create">Change password</b-button>
     </b-card>
  </b-container>
  </Sidebar>
    </div>
</template>

<script>
import firebase from 'firebase';
import { usersref } from '@/firebase.js'
import Sidebar from '@/components/layout/Sidebar.vue'

export default {
name: 'password',
 computed: {
        State() {
         return this.npassword == this.cpassword ? null : false
       }
   },
data() {
      return {
        password: '',
        npassword: '',
        cpassword: '',
        ptype: 'password',
        nptype: 'password',
        cptype: 'password',
      }
    },
firebase:{
    users: usersref
    
},
components:{
    Sidebar
},
methods: {
    Look(){
this.passwordFieldType = this.passwordFieldType === 'password' ? 'text' : 'password'
  
    },
    test(user,credential,pass){
        var passed = 'false'
        user.reauthenticateAndRetrieveDataWithCredential(credential).then(function() {
                // User re-authenticated.
                user.updatePassword(pass).then(
                    passed = 'true'
                    
                    
                )
                .catch(function(error){
                    alert('Oops. ' + error.message)
                    //break
                })
                }).catch(function(error) {
                    alert('Oohh. ' + error.message)
                    //break
                })
                console.log('cont')
                if (passed==='true'){
                this.$router.replace('account')
            }
    },
    Create(){
        //creates the new password
        if(this.password != '' && this.npassword != '' && this.cpassword != ''){
            console.log("pass")
            const user = firebase.auth().currentUser
            const pass = this.cpassword
            var passed = 'false'
            const credential = firebase.auth.EmailAuthProvider.credential(
            user.email,pass)
            if (this.password != this.npassword){
            if(this.npassword == this.cpassword && this.npassword.length > 5){
                this.test(user,credential,pass)
            }else{
                console.log("cheack size and match")
            }
            }else{
                console.log("old and new password are not the same")
            }
             this.password = ''
             this.npassword = ''
             this.cpassword = ''
             
        }else{
            console.log("inputs empty")
        }
        
    }
}
}
</script>


<style scoped>

</style>
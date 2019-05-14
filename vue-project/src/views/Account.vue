<template>
  <div class="account">
        <Sidebar>
        <!-- includes the account data of the user name, surname company name 
        logo and also allows the user to change password -->
        <b-container fluid>
    <b-card class="my-3">
        <b-row class="my-1">
            <b-col sm="4">
                <label for="input-default">Name:</label>
            </b-col>
            <b-col sm="8">
                <b-form-input id="input-default" placeholder="Enter your name" v-model="name"></b-form-input>
            </b-col>
        </b-row>
        <b-row class="my-1">
            <b-col sm="4">
                <label for="input-default">Surname:</label>
            </b-col>
            <b-col sm="8">
                <b-form-input id="input-default" placeholder="Enter your surname" v-model="surname"></b-form-input>
            </b-col>
        </b-row>
        <b-row class="my-1">
            <b-col sm="4">
                <label for="input-default">Company name:</label>
            </b-col>
            <b-col sm="8">
                <b-form-input id="input-default" placeholder="Enter your company name" v-model="companyname"></b-form-input>
            </b-col>
        </b-row>
        <b-row class="my-1">
            <b-col sm="4">
                <b-button @click="onPickFile">Upload Image</b-button>
                <input type="file" style="display: none" ref="fileInput" accept="image/*" @change="onFilePicked">
            </b-col>
            <b-col sm="8">
                <img :src="imageUrl" height="150">
            </b-col>
        </b-row>
        <b-row class="my-4"/>
        <b-button variant="success" @click="Create">Save Changes</b-button>
        <b-row class="my-2">
        <b-col sm="4"/>
        <b-col sm="4">
        <div>
            <router-link to="/password">Change password</router-link>
        </div>
        </b-col>
        <b-col sm="4"/>
        </b-row>
        
        
        
     </b-card>
  </b-container>
  </Sidebar>
    </div>
</template>

<script>
import firebase from 'firebase';
import { usersref, storage } from '@/firebase.js';
import Sidebar from '@/components/layout/Sidebar.vue';
import debounce from 'lodash/debounce'

export default {
name: 'account',

data() {
      return {
        name: '',
        surname: '',
        companyname: '',
        imageUrl: '',
        image: null,
        key: ''
      }
    },
  firebase() {
      //reterives data from database
    return {
    users: {
      source: firebase.database().ref('Data/4/users').child(firebase.auth().currentUser.uid),
      asObject:true
    }
  }
   },
components:{
    Sidebar
},
mounted: debounce(function () {
    this.$nextTick(() => {
        this.GetKey(); // runs only once
    })
}, 1000),
methods: {
    GetKey(){
        //fills the textboxes and adds the logo
        let user = this.users

        this.key = user['.key']
        this.name =  user.Name,
        this.surname = user.Surname,
        this.companyname = user.Company,
        this.imageUrl = user.imageUrl
    },
    onPickFile(){
        this.$refs.fileInput.click()
    },
    onFilePicked (event){
        //picks the image form the users file
        const files = event.target.files
        let filename = files[0].name
        if (filename.lastIndexOf('.')<=0){
            return alert('Please add a valid file!')
        }
        const fileReader = new FileReader()
        fileReader.addEventListener('load',() =>{
            this.imageUrl = fileReader.result
        })
        fileReader.readAsDataURL(files[0])
        this.image = files[0]
    },
    Create(){
        //creates a new image and adds it to the database
        const id = firebase.auth().currentUser.uid
        const us = firebase.database().ref('Data/4/users/' + id)
        if(this.name != '' && this.surname != '' && this.companyname != ''){
            console.log("pass")
            if(this.image != null){
                const filename = this.image.name
                return storage.ref('logos/'+filename).put(this.image)
                    .then(uploadTaskSnapshot => {
                        return uploadTaskSnapshot.ref.getDownloadURL()
                    })
                    .then(imageUrl => {
                        return us.child(this.key).update({
                        Name: this.name,
                        Surname: this.surname,
                        Company: this.companyname,
                        imageUrl: imageUrl
                        })
                        
                        }
                    )    
                     
            }else{
                us.child(this.key).update({
                        Name: this.name,
                        Surname: this.surname,
                        Company: this.companyname
                        })
                this.$router.replace('home')
            }
        }else{
            console.log("fail")
        }
        this.$router.replace('home')
    }
}
}
</script>


<style scoped>

</style>
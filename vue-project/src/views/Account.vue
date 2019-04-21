<template>
  <div class="account">
        <Sidebar>
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
// computed: {
//       nameState() {
//         return this.name.length > 2 ? true : null
//       },
//       surnameState() {
//         return this.surname.length > 2 ? true : null
//       },
//       companynameState() {
//         return this.companyname.length > 2 ? true : null
//       }
//     },
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
    return {
    users: {
      source: firebase.database().ref('Data/4/users').child(firebase.auth().currentUser.uid),
      asObject: true
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
        let user = this.users['.value']
        for(let i = 0;i<this.users.length;i++){
            if(this.$UID == this.users[i].UserId){
                console.log('wow')
                this.key = user[i]['.key']
                this.name =  user[i]['Name'],
                this.surname = user[i]['Surname'],
                this.companyname = user[i]['Company'],
                this.imageUrl = user[i]['imageUrl']
            }
        }
    },
    onPickFile(){
        this.$refs.fileInput.click()
    },
    onFilePicked (event){
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
        if(this.name != '' && this.surname != '' && this.companyname != ''){
            console.log("pass")
            if(this.image != null){
                const filename = this.image.name
                return storage.ref('logos/'+filename).put(this.image)
                    .then(uploadTaskSnapshot => {
                        return uploadTaskSnapshot.ref.getDownloadURL()
                    })
                    .then(imageUrl => {
                        return usersref.child(this.key).update({
                        Name: this.name,
                        Surname: this.surname,
                        Company: this.companyname,
                        imageUrl: imageUrl
                        })
                        
                        }
                    )    
                     
            }else{
                usersref.child(this.key).update({
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
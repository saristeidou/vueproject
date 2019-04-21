<template>
  <div class="addDetails">
        <Sidebar>
        <b-container fluid>
    <b-card class="my-3">
        <b-row class="my-1">
            <b-col sm="4">
                <label for="input-default">Name:</label>
            </b-col>
            <b-col sm="8">
                <b-form-input id="input-default" placeholder="Enter your name" v-model = "name" :state="nameState"></b-form-input>
            </b-col>
        </b-row>
        <b-row class="my-1">
            <b-col sm="4">
                <label for="input-default">Surname:</label>
            </b-col>
            <b-col sm="8">
                <b-form-input id="input-default" placeholder="Enter your surname" v-model = "surname" :state="surnameState"></b-form-input>
            </b-col>
        </b-row>
        <b-row class="my-1">
            <b-col sm="4">
                <label for="input-default">Company name:</label>
            </b-col>
            <b-col sm="8">
                <b-form-input id="input-default" placeholder="Enter your company name" v-model = "companyname" :state="companynameState"></b-form-input>
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
        <b-button variant="success" @click="Create">Add</b-button>
        
     </b-card>
  </b-container>
  </Sidebar>
    </div>
</template>

<script>
import { usersref, storage } from '@/firebase.js';
import Sidebar from '@/components/layout/Sidebar.vue';
import firebase from 'firebase';
import debounce from 'lodash/debounce'

export default {
name: 'addDetails',
computed: {
      nameState() {
        return this.name.length > 2 ? true : null
      },
      surnameState() {
        return this.surname.length > 2 ? true : null
      },
      companynameState() {
        return this.companyname.length > 2 ? true : null
      }
    },
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
created: debounce(function () {
    this.$nextTick(() => {
        this.GetKey(); // runs only once
    })
}, 1000),
methods: {
    GetKey(){
         let user = this.users['.value']
        for(let i = 0;i<user.length;i++){
            if(firebase.auth().currentUser.uid == user[i].UserId){
                this.key = user[i]['.key']
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
                        //note for later
                        //usersref.child($UID).child(this.key)
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
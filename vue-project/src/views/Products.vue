<template>
  <div class="products">
    <h2>HTML Table</h2>

    <tr>
      <td><input type="text" placeholder="ProductId" v-model="ProductId"></td>
      <td><input type="text" placeholder="Brand" v-model="Brand"></td>
      <td><input type="text" placeholder="Name" v-model="Name"></td>
      <td><input type="text" placeholder="Price" v-model="Price"></td>
      <td><input type="text" placeholder="Type" v-model="Type"></td>
      <td><button @click="CreateProduct">Add</button></td>
    </tr>

    <table>
        <thead>
         <tr>
            <th>Product Id</th>
             <th>Brand</th>
            <th>Name</th>
            <th>Price</th>
            <th>Type</th>
            <th>Edit</th>
        </tr>
        </thead>
        <tbody>
     <tr v-for="i in product" v-bind:key="i['.key']" v-bind:class="{active: isActive}">
    <td>{{i.ProductId}}</td>
    <td>{{i.Brand}}</td>
    <td>{{i.Name}}</td>
    <td>{{i.Price}}</td>
    <td>{{i.Type}}</td>
    <td>
      <button @click="EditProduct()">Edit</button>
      <button @click="RemoveProduct(i['.key'])">Remove</button>
    </td>
  </tr>
  </tbody>
</table>
  </div>
</template>

<script>
import { productref } from '@/firebase.js';

export default {
    name: 'products',
    data(){
      return{
     ProductId: '',
     Brand: '',
     Name: '',
     Price: '',
     Type: '',
     isActive: true
      }
    },
  firebase: {
     product: productref
   },
   
   methods:{
      CreateProduct(){
        productref.push({ProductId: this.ProductId, Brand: this.Brand, 
        Name: this.Name, Price: this.Price, Type: this.Type});
      },
      RemoveProduct(key){
        productref.child(key).remove();
      },
      EditProduct(){
        this.isActive = !this.isActive;
      }
   }
}
</script>
<style scoped>
table {
  font-family: arial, sans-serif;
  border-collapse: collapse;
  width: 100%;
}

td, th {
  border: 1px solid #dddddd;
  text-align: left;
  padding: 8px;
}

tr:nth-child(even) {
  background-color: #dddddd;
}
</style>
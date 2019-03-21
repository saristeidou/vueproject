<template>
  <div class="tableproducts">
        <h1>{{ msg }}</h1>
    
        <b-form-group label-cols-sm="3" label="Filter" class="mb-0" align="center">
          <b-input-group>
            <b-form-input v-model="filter" placeholder="Type to Search" />
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      

    <b-table
      id="myTable"
      stacked="md"
      :items="product"
      :fields="fields"
      :filter="filter"
      :per-page= 20
      :current-page="currentPage"
      small
    />

    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      aria-controls="myTable"
      align="center"
    />
  </div>
</template>

<script>
import { productref } from '@/firebase.js';

export default {
    name: 'tableproducts',
    data(){
      return{
     fields: [
          {
            key: 'ProductId',
            sortable: true
          },
          {
            key: 'OriginalPrice',
            sortable: true
          },
          {
            key: 'Type',
            sortable: true
          }
        ],
     filter: null,
     currentPage: 1
      }
    },
    computed: {
      rows() {
        return this.product.length
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
   },
  props: {
    msg: String
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
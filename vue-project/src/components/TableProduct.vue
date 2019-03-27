<template>
  <div class="tableproducts">
        <h1>{{ msg }}</h1>
    <b-row>
      <b-col md="10" class="my-1">
        <b-form-group label-cols-sm="3" label="Filter" class="mb-0" align="center">
          <b-input-group>
            <b-form-input v-model="filter" placeholder="Type to Search" />
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>

      <b-col md="2" class="my-1">
        <b-button v-b-toggle.collapse1 variant="primary">Add</b-button>
      </b-col>
    </b-row>
           <b-collapse id="collapse1" class="mt-2">
            <b-card>
              <b-input-group>
              <b-form-input placeholder="ProductId" v-model="ProductId"/>
              </b-input-group>
              <b-input-group>
              <b-form-input placeholder="OriginalPrice" v-model="OriginalPrice"/>
              </b-input-group>
              <b-input-group>
              <b-form-input placeholder="Type" v-model="Type"/>
              </b-input-group>
               <b-button v-b-toggle.collapse1 variant="success" @click="CreateProduct">Add</b-button>
            </b-card>
          </b-collapse>

    <b-table
      id="myTable"
      stacked="md"
      :items="product"
      :fields="fields"
      :filter="filter"
      :per-page= 20
      :current-page="currentPage"
      small 
      >
      <template slot="Edit" slot-scope="row">
        <b-button size="sm" @click="row.toggleDetails" class="mr-2">
          {{ row.detailsShowing ? 'Cancel' : 'Edit content'}}
        </b-button>
      </template>

      <template slot="row-details" slot-scope="row">
        <b-card>
          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Product Id:</b></b-col>
            <b-col><input type="text" v-model="row.item.ProductId"></b-col>
          </b-row>

          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Original Price:</b></b-col>
            <b-col><input type="text" v-model="row.item.OriginalPrice"></b-col>
          </b-row>

          <b-row class="mb-2">
            <b-col sm="3" class="text-sm-right"><b>Type:</b></b-col>
            <b-col><input type="text" v-model="row.item.Type"></b-col>
          </b-row>

          <b-button variant="danger" size="sm" @click="RemoveProduct(row.item['.key'])">Delete</b-button>
          <b-button variant="primary" size="sm" @click="EditProduct(row.item)">Edit</b-button>
        </b-card>
      </template>
    </b-table>

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
          }, 'Edit'
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
        productref.push({ProductId: this.ProductId, OriginalPrice: this.OriginalPrice, 
        Type: this.Type});
      }, 
      RemoveProduct(key){
        productref.child(key).remove();
      },
      EditProduct(product){
        const key = product['.key'];
        productref.child(key).set({ ProductId: product.ProductId,
        OriginalPrice: product.OriginalPrice, Type: product.Type })
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
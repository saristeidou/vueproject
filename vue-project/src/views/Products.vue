<template>
  <div class="products">
    <Sidebar> 
      
    <b-col md="6" class="my-1">
        <b-form-group label-cols-sm="3" label="Filter" class="mb-0">
          <b-input-group>
            <b-form-input v-model="filter" placeholder="Type to Search" />
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>

    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      aria-controls="myTable"
      align="center"
    />
      

    <b-table
      id="myTable"
      stacked="md"
      :items="product"
      :fields="table"
      :filter="filter"
      :per-page= 20
      :current-page="currentPage"
      small
    >
    <template slot=".key" thClass = "d-none" tdClass = "d-none">
      </template>
      </b-table>
    </Sidebar> 
  </div>
</template>

<script>
import { productref } from '@/firebase.js';
import Sidebar from '@/components/layout/Sidebar.vue'

export default {
    name: 'products',
    data(){
      return{
     table: ['ProductId', 'OriginalPrice', 'Type'],
     filter: null,
     currentPage: 1,
     isActive: true
      }
    },
    components: {
    Sidebar
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
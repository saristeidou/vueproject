<template>
  <div class="products">
    <Sidebar> 
      
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      aria-controls="myTable"
      align="center"
    />
      

    <b-table
      id="myTable"
      :items="product"
      :per-page= 20
      :current-page="currentPage"
      small
    />
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
     ProductId: '',
     Brand: '',
     Name: '',
     Price: '',
     Type: '',
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
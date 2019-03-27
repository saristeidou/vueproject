<template>
  <div class="products">
    <Sidebar> 
      <b-form-group label="Select Table">
          <b-form-select :options="tableOption" v-model="selected" />
        </b-form-group>
       
      <TableProduct msg="Products" v-if="selected === 'Products'"></TableProduct>
      
      <TableType msg="Type" v-if="selected === 'Type'"></TableType>
            
      <TableStock msg="Stock" v-if="selected === 'Stock'"></TableStock>         
        
    </Sidebar> 
  </div>
</template>

<script>
import { productref } from '@/firebase.js';
import Sidebar from '@/components/layout/Sidebar.vue';
import TableProduct from '@/components/TableProduct.vue';
import TableType from '@/components/TableType.vue';
import TableStock from '@/components/TableStock.vue';

export default {
    name: 'products',
    data(){
      return{
      tableOption: ['Products', 'Type', 'Stock'],
     table: ['ProductId', 'OriginalPrice', 'Type'],
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
     currentPage: 1,
     selected: 'Products',
     isActive: true
      }
    },
    components: {
    Sidebar,
    TableProduct,
    TableType,
    TableStock
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
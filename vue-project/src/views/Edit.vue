<template>
  <div class="edit">
    <Sidebar> 
      
    <b-form-group label="Stelect table">
      <b-form-select :options="tableOption" v-model="selected" />
    </b-form-group>

    <TableProduct msg="Products" v-if="selected === 'Product'"></TableProduct>
    <TableStock msg="Stock" v-if="selected === 'Stock'"></TableStock>
    <TableType msg="Type" v-if="selected === 'Type'"></TableType>

    </Sidebar> 
  </div>
</template>

<script>
import Sidebar from '@/components/layout/Sidebar.vue';
import TableProduct from '@/components/TableProduct.vue';
import TableStock from '@/components/TableStock.vue';
import TableType from '@/components/TableType.vue';

export default {
    name: 'edit',
    data(){
      return{
      tableOption:['Product','Stock','Type'],
     selected: 'Product'
      }
    },
    components: {
    Sidebar,
    TableProduct,
    TableStock,
    TableType
    },
    computed: {
      rows() {
        return this.stock.length
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
<template>
  <div class="edit">
    <Sidebar> 

    <TableStock></TableStock>

    </Sidebar> 
  </div>
</template>

<script>
import Sidebar from '@/components/layout/Sidebar.vue';
import TableStock from '@/components/TableStock.vue';


export default {
    name: 'edit',
    data(){
      return{

      }
    },
    components: {
    Sidebar,
    TableStock
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
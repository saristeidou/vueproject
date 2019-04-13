<template>
  <div class="reports">
    <Sidebar> 
      <tr v-for="i in u" v-bind:key="i['.key']">
    <td>{{i.Name}}</td>
  </tr> 
  {{total}}
    </Sidebar> 
  </div>
</template>

<script>
import { usersref } from '@/firebase.js';
import Sidebar from '@/components/layout/Sidebar.vue';
import firebase from 'firebase';
import debounce from 'lodash/debounce'

export default {
    name: 'reports',
    data(){
      return{
        total: 0,
        length: 0,
        tables: [],
        sells: 0,
        selectedtable:[]
    //   tableOption: ['Products', 'Type', 'Stock'],
    //  table: ['ProductId', 'OriginalPrice', 'Type'],
    //  filter: null,
    //  currentPage: 1,
    //  selected: 'Products',
    //  isActive: true
      }
    },
    components: {
    Sidebar
    },
    
    mounted:debounce(function () {
    this.$nextTick(() => {
        this.GetKey();
        })
}, 2000),
    // computed: {
    //   rows() {
    //     return this.product.length
    //   }
    // },
  firebase: {
     //dataset: db,
     //ws: db.ref('Data/5/users'),//Data/1/Weeklysales + $UID
      u: usersref,
      stock: firebase.database().ref('Data/4/Stock'),
      week: firebase.database().ref('Data/1/Weeklysales')
      //dataset: db
     },
   methods:{
     GetKey(){
       var tot = 0
       var sell = 0
       var table = this.week
       this.length = table.length
       console.log(table.length)
       for(let i = 0;i<table.length;i++){
         if(table[i].WsalesId == 1){
           tot = tot + table[i].Sellings
           var valObj = this.stock.filter(function(elem){
           if(elem.StockId == table[i].StockId) return elem
            });
           sell = sell + (valObj[0].SellingPrice * table[i].Sellings)
         }
        }
        this.total = tot
        this.sells = sell.toFixed(2)
        console.log(tot)
        console.log(this.sells)
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
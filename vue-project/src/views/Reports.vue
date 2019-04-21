<template>
  <div class="reports">
    <Sidebar> 
      <b-container fluid>
      <h2>Reports</h2>
    <b-row>
      <b-col md="1" class="my-1"></b-col>
      <b-col md="5" class="my-1">
        <b-form-group label-cols-sm="3" label="Filter" class="mb-0">
          <b-input-group>
            <b-form-input v-model="filter" placeholder="Type to Search" />
            <b-input-group-append>
              <b-button :disabled="!filter" @click="filter = ''">Clear</b-button>
            </b-input-group-append>
          </b-input-group>
        </b-form-group>
      </b-col>
      <b-col md="5" class="my-1">
        <b-form-group label-cols-sm="3" label="Per page" class="mb-0">
          <b-form-select v-model="perPage" :options="pageOptions"></b-form-select>
        </b-form-group>
      </b-col>
      <b-col md="1" class="my-1">
      </b-col>
    </b-row>
    <b-row>
      <b-col md="5" class="my-1">
        <b-form-select v-model="selected" @change="changetable">
            <option v-for="tp in SelectTable" 
            v-bind:key="tp['key']">{{ tp.label }}</option>
        </b-form-select>
      </b-col>
      <b-col md="2" class="my-1">
        <button class="btn btn-primary pl-5 pr-5" @click="download">Download PDF</button>
      </b-col>
    </b-row>
    <b-row>
     <b-col md="1" class="my-1">
      </b-col>
    <b-col md="10" class="my-1">
  <b-table small
      :items="display"
      :filter="filter"
      :per-page="perPage"
      :current-page="currentPage"
    ></b-table>
    </b-col>
    </b-row>
    {{currentTable}}
    {{selected}}
    <b-pagination
      v-model="currentPage"
      :total-rows="rows"
      aria-controls="myTable"
      align="center"
    />
      </b-container> 
      {{total}}
    </Sidebar> 
  </div>
</template>

<script>
import Sidebar from '@/components/layout/Sidebar.vue';
import firebase from 'firebase';
import debounce from 'lodash/debounce';
import jsPDF from 'jspdf';

export default {
    name: 'reports',
    data(){
      return{
        total: 0,
        sells: 0,
        perPage: 20,
        pageOptions: [20, 30, 40],
        SelectTable:[],
        tables: [],
        filter: null,
        currentPage: 1,
        currentTable: 0,
        selected:''
      }
    },
    components: {
    Sidebar
    },
    computed: {
       rows() {
         return this.tables[this.currentTable].data.length
       },
       display() {
         return this.tables[this.currentTable].data
       }
     },
     firebase() {
    return {
    week: {
      source: firebase.database().ref('Data/0/Weeklysales').child(firebase.auth().currentUser.uid),
      asObject: true
    },
    stock: {
      source: firebase.database().ref('Data/3/Stock').child(firebase.auth().currentUser.uid),
      asObject: true
    },
    user: {
      source: firebase.database().ref('Data/4/users').child(firebase.auth().currentUser.uid),
      asObject: true
    }
  }
   },
    
    mounted:debounce(function () {
    this.$nextTick(() => {
        this.Createtable()
        })
}, 2000),
     
   methods:{
     changetable(){
       const select = this.selected
       var Obj = this.SelectTable.filter(function(el){
        if(el.label == select) return el
        })
        this.currentTable = Obj[0].key
        
     },
     Createtable(){
       const table = this.week['.value']
       var tot = 0
       var date = ''
       var sell = 0
       var currentweek = 1
       var tb = []
       var sum = 0
       var temptable = []
       this.length = table.length
       console.log(table.length)
       for(let i = 0;i<table.length;i++){
         if(table[i].WsalesId != currentweek ){
           date = table[i-1].Date
           temptable.push({id: currentweek, data: tb,
           total: tot, sales: sell.toFixed(2), date: date})
           currentweek = table[i].WsalesId
           tb = []
           tot = 0
           sell = 0
         }else if(i == table.length-1){
           date = table[i].Date
           temptable.push({id: currentweek, data: tb,
           total: tot, sales: sell.toFixed(2), date: date})
           currentweek = table[i].WsalesId
         }
           var Obj = this.stock.filter(function(el){
            if(el.StockId == table[i].StockId) return el
             })
          tot = tot + table[i].Sellings
          sum = Obj[0].SellingPrice * table[i].Sellings
          sell = sell + sum
          tb.push({id: table[i].StockId, sellings: table[i].Sellings,
          price: Obj[0].SellingPrice, total: sum.toFixed(2)})
        }
        this.total = tot
        this.sells = sell.toFixed(2)
        for(let i = 0;i<temptable.length;i++){
          this.SelectTable.push({key: i, label: temptable[i].date})
        }
        this.tables = temptable
        this.currentTable = temptable.length-1
        this.selected = temptable[this.currentTable].date
    },
    download(){ 
      const id = this.$UID;
       var Obj = this.user.filter(function(el){
        if(id == el.UserId) return el
        })
      //var imgData = btoa(Obj[0].imageUrl)
      const data = this.tables[this.currentTable].data
      const total = this.tables[this.currentTable].total
      let number = 10
      let pdfName = Obj[0].Company +' '+this.selected
      var doc = new jsPDF()
      doc.setFontSize(22)
      doc.setFontType('bold')
      doc.text(Obj[0].Company, 10, number)
      //doc.addImage(imgData, 'JPEG', 160, 10, 45, 40);
      number = number + 10
      doc.text(this.selected, 10, number)
      number = number + 20
      doc.text(10, number, 'Id')
      doc.text(60, number, 'Sellings')
      doc.text(110, number, 'Price')
      doc.text(160, number, 'Total')
      doc.setFontType('normal')
      number = number + 10
      for (let i = 0;i<data.length;i++){
        doc.text(10, number, data[i].id)

        doc.text(60, number, data[i].sellings.toString())

        doc.text(110, number, '£ '+data[i].price)
        
        doc.text(160, number, '£ '+data[i].total)
        number = number + 10
        if (number >= 270){
          doc.setFontType('bold')
          doc.text(110, number, 'Total: ')
          doc.text(160, number, '£ '+total)
          doc.addPage()
          number = 10
        }
      }
      doc.save(pdfName + '.pdf');
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
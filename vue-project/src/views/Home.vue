<template>
  <div class="home">
    <Sidebar>
      <b-container>
      <b-row class="mb-3">
        <!-- Total sales until now -->
        <b-col md="4" class="my-3">
          <b-card title="Total Sales" style="text-align:center;">
            <h3>£{{Totalsales}}</h3>
          </b-card>
        </b-col>
        <b-col md="4" class="my-3">
          <!-- Total profit until now -->
          <b-card title="Total Profit" style="text-align:center;">
            <h3>£{{Totalprofit}}</h3>
          </b-card>
        </b-col>
        <b-col md="4" class="my-3">
          <!-- Total items sold until now -->
          <b-card title="Sold Items" style="text-align:center;">
            <h3>{{Itemssold}}</h3>
          </b-card>
        </b-col>
      </b-row>
      </b-container>
       <!-- The next 2 container contain the charts used -->
      <b-container class="mb-3" fluid>
        <h3>Weekly Sales</h3>
        <GChart
    type="AreaChart"
    :data="barData"
    :options="barOptions"
  />
      </b-container>
      <b-container fluid>
        <b-row class="mb-3">
          <b-col md="6" class="my-3">
            <h3>Popular Items</h3>
          <GChart
    type="ColumnChart"
    :data="ColumnData"
    :options="ColumnOptions"
  />
          </b-col>
          <b-col md="6" class="my-3">
            <h3>Sales by category</h3>
          <GChart
    type="PieChart"
    :data="pieData"
    :options="pieOptions"
  />
          </b-col>
        </b-row>
      </b-container>
      <b-container fluid>
        <h3>Discount recommendations</h3>
        <b-row class="mb-3">
          <!-- <b-col cols="6" class="my-3">
          <b-card title="Due to sale loss" style="text-align:center;">
            <h4>{{Itema}}</h4>
            <h5>From £{{Originalpa}} to £{{Recommenda}}</h5>
            <h4>Accept recommendation?</h4>
            <b-button variant="success">Yes</b-button>
            <b-button variant="danger">No</b-button>
          </b-card>
          </b-col> -->
          <b-col cols="1" class="my-3"/>
          <b-col cols="10" class="my-3">
            <!-- Gives sales recommendations base on the sales -->
          <b-card title="Due to low sales" style="text-align:center;">
            <h4>{{Itemb}}</h4>
            <b-form-group label-cols-sm="7" label="Sale percentage" class="mb-0">
              <b-form-input  v-model="Sale" placeholder="Enter discount %" type="number" min="5" max="100" :state="discountState"></b-form-input>
            </b-form-group>
            <h5>From £{{Originalpb}} to £{{Newpriceb}}</h5>
            <h4>Accept recommendation?</h4>
            <b-button variant="success" @click="AddDiscount()">Yes</b-button>
            <b-button variant="danger" @click="RemoveDiscount()">No</b-button>
          </b-card>
          </b-col>
        </b-row>
      </b-container>      
    
    </Sidebar>
  </div>
</template>

<script>
//import firebase from 'firebase';
import { authentication } from '@/firebase.js'
import firebase from 'firebase';
import debounce from 'lodash/debounce'
//import { GoogleCharts } from 'vue-google-charts'
// @ is an alias to /src
import Sidebar from '@/components/layout/Sidebar.vue'

export default {
  name: 'home',
  data() {
    return {
      barData: [
        ['Week', 'Sales'],
        ['sample', 10]
      ],
      barOptions: {
        chart: {
          title: 'Company Performance',
          subtitle: 'Sales',
        }
      },pieData: [
        ['Week', 'Sales'],
        ['sample', 10]
      ],
      pieOptions: {
        chart: {
          title: 'Sales by category',
          subtitle: 'Sales',
        }
      },ColumnData: [
        ['Week', 'Sales'],
        ['sample', 10]
      ],
      newtable: [],
      ColumnOptions: {
        chart: {
          title: 'Popular Items',
          subtitle: 'Sales',
        }
      },
      Itemssold: 0,
      Totalsales: 0,
      Totalprofit: 0,
      Recommenda: 0,
      Recommendb: 0,
      Originalpa: 0,
      Originalpb: 0,
      Itema: 'PRD81',
      Itemb: 'PRD167',
      w:'',
      Sale: 5,
      keyb:'',
      currentDate:''
    }
  },
  components: {
    Sidebar
  },
  computed: {
    //change the price of item when discount is applied
    Newpriceb(){
      return (this.Originalpb - (this.Originalpb*(this.Sale/100))).toFixed(2)
    },
    //validates the sale typed
    discountState() {
        return this.Sale > 5 && this.Sale < 100 ? true : false
      }
  },
  //import data from database
  firebase() {
    return {
    week: {
      source: firebase.database().ref('Data/0/Weeklysales').child(firebase.auth().currentUser.uid)
    },
    product: {
      source: firebase.database().ref('Data/1/Product').child(firebase.auth().currentUser.uid)
    },
    stype: {
      source: firebase.database().ref('Data/2/Type').child(firebase.auth().currentUser.uid)
    },
    stock: {
      source: firebase.database().ref('Data/3/Stock').child(firebase.auth().currentUser.uid)
    }
  }
   },
   //waits for 2 seconds then calls the Createtable function
   mounted:debounce(function () {
    this.$nextTick(() => {
      
        this.Createtable()
        
        })
}, 2000),
  methods: {
    //creates a table including all the data needed for the homepage
    Createtable(){
            let week = this.week
            let stck = this.stock
            let prd = this.product
            let tp = this.stype
            let length = this.week.length
            this.currentDate = week[length-1].WsalesId
            var Sales = 0
            var Profit = 0
            var Loss = 0 
            var Items = 0
            var tbl = []
         for(let i = 0;i<length;i++){
              //filters through the database to find the needed object
             var valObj = stck.filter(function(elem){
             if(elem.StockId == week[i].StockId) return elem
               });
               var Obj = prd.filter(function(elem){
             if(elem.ProductId == valObj[0].ProductId) return elem
               });
               var typeObj = tp.filter(function(elem){
             if(elem.TypeId == Obj[0].Type) return elem
               });
               Sales = Sales + parseFloat(valObj[0].SellingPrice)
               Loss=Loss + parseFloat(Obj[0].OriginalPrice)              
               Items = Items + week[i].Sellings
               //new table
              tbl.push({key: valObj[0]['.key'],
              Stock: valObj[0].StockId,
              OriginalPrice: Obj[0].OriginalPrice,
              SellingPrice: valObj[0].SellingPrice,
              SoldItems: week[i].Sellings,
              Date: week[i].Date,
              WeekId: week[i].WsalesId,
              TypeId: typeObj[0].TypeId,
              Type_Name: typeObj[0].Type_Name,
              ProductId: Obj[0].ProductId})
           }
           Profit = Sales - Loss
           //filling the watchers
           this.Itemssold= Items
           this.Totalsales= Sales.toFixed(2)
           this.Totalprofit= Profit.toFixed(2)
           this.newtable = tbl
           //calling the functions for charts and recommendations
           this.weeklysales()
           this.typechart()
           this.popularchart()
           this.FindSales()
          },
    weeklysales(){
      //calculates and creates the bar chart
      var arr = new Array()
      var data = this.newtable
      var totalsales = 0

      arr[0]=['Week', 'Sales']
      var weeksplit = data[data.length-1].WeekId
      if(weeksplit>10){
        var loop = 10
      }else{
         loop = data[data.length-1].WeekId
      }

      for(let i = data.length-1;i>=0;i--){
        if(loop == 0){
          break;
        }
        else if(data[i].WeekId!=weeksplit){
          var date = data[i+1].Date
          arr[loop]=[date, parseFloat(totalsales)]
          totalsales = 0
          weeksplit = weeksplit - 1
          loop = loop -1
        }else if(i == 0){
         date = data[i].Date
          arr[weeksplit]=[date, parseFloat(totalsales)]
        }
        
        totalsales = totalsales + data[i].SoldItems
      }
      this.barData = arr 
      
    },
    typechart(){
      //calculates and creates the pie chart
      var arr = new Array()
      var data = this.newtable
      let tp = this.stype
      var temparr = []
      var sales = 0

      for(let i = 0;i<tp.length;i++){
        temparr.push({id: tp[i].TypeId,
        name: tp[i].Type_Name,
        sales: sales})
      }

      arr[0]=['Type', 'Sales']

      for(let i = 0;i<data.length;i++){
        var objIndex = temparr.findIndex((obj => obj.id == data[i].TypeId))
        temparr[objIndex].sales = temparr[objIndex].sales + data[i].SoldItems
      }

      for(let i = 0;i<temparr.length;i++){
        arr[i+1]=[tp[i].Type_Name, temparr[i].sales]
      }

      this.pieData = arr 
      
    },
    popularchart(){
      //calculates and creates the column chart
      var arr = new Array()
      var data = this.newtable
      let prd = this.product
      var temparr = []
      var temparr2 = []
      var sales = 0
      var total = this.Itemssold

      for(let i = 0;i<prd.length;i++){
        temparr.push({id: prd[i].ProductId,
        sales: sales})
      }

      arr[0]=['Product', 'Percentage']

       for(let i = 0;i<data.length;i++){
         var objIndex = temparr.findIndex((obj => obj.id == data[i].ProductId))
         temparr[objIndex].sales = temparr[objIndex].sales + data[i].SoldItems
       }
      
       temparr.sort(function(a, b){return b.sales - a.sales})

       for(let i = 0;i<10;i++){
         temparr2.push({id: temparr[i].id,
        sales: temparr[i].sales})
       }

       for(let i = 0;i<temparr2.length;i++){
         var persentage = (100*temparr2[i].sales)/total
         arr[i+1]=[temparr2[i].id, persentage]
       }
        this.ColumnData = arr 
        
    },
    logout: function() {
      //logout 
      authentication.signOut().then(() => {
        this.$router.replace('login')
      })
    },
    FindSales() {
      //creates the recommendations
      let stck = this.stock
      var data = this.newtable
      var temparr = []
      var temparr2 = []
      var sales = 0
      var price = 0      
      
      //ceates a temporary array with the data needed
      for(let i = 0;i<stck.length;i++){
        temparr.push({id: stck[i].StockId,
        price: price,
        sales: sales,
        key: stck[i]['.key'],
        OnSale: stck[i].OnSale})
      }
      for(let i = 0;i<data.length;i++){
         var objIndex = temparr.findIndex((obj => obj.id == data[i].Stock))
         temparr[objIndex].sales = temparr[objIndex].sales + data[i].SoldItems
         temparr[objIndex].price = data[i].SellingPrice
       }
      
       for(let i = 0;i<temparr.length;i++){
        if (temparr[i].OnSale === null ||temparr[i].OnSale === undefined) {
         temparr2.push({id: temparr[i].id,
         price: temparr[i].price,
         key: temparr[i].key,
         sales: temparr[i].sales})
         }
       }

      temparr2.sort(function(a, b){return a.sales - b.sales})
      this.Itemb = temparr2[1].id
      this.keyb = temparr2[1].key
      this.Originalpb = temparr2[1].price
    },
    AddDiscount(){
      //validates add changes the price from the recommentation
      const key = this.keyb
      const price = this.Newpriceb
      const id = firebase.auth().currentUser.uid
      const stck = firebase.database().ref('Data/3/Stock/' + id)
      if(this.Sale > 5 && this.Sale < 100){
      stck.child(key).update({ SellingPrice: price, OnSale: true })
      this.FindSales()
      }
    },
    RemoveDiscount(){
      //remove the item from the recommentation array
      const key = this.keyb
      const price = this.Newpriceb
      const id = firebase.auth().currentUser.uid
      const stck = firebase.database().ref('Data/3/Stock/' + id)
      stck.child(key).update({ SellingPrice: price, OnSale: false })
      this.FindSales()
    }
  }
}
</script>

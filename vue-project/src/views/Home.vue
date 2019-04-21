<template>
  <div class="home">
    <Sidebar>
      <b-container>
      <b-row class="mb-3">
        <b-col md="4" class="my-3">
          <b-card title="Total Sales" style="text-align:center;">
            <h3>£{{Totalsales}}</h3>
          </b-card>
        </b-col>
        <b-col md="4" class="my-3">
          <b-card title="Total Profit" style="text-align:center;">
            <h3>£{{Totalprofit}}</h3>
          </b-card>
        </b-col>
        <b-col md="4" class="my-3">
          <b-card title="Sold Items" style="text-align:center;">
            <h3>{{Itemssold}}</h3>
          </b-card>
        </b-col>
      </b-row>
      </b-container>
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
          <b-col cols="6">
          <b-card title="Due to sale loss" style="text-align:center;">
            <h4>{{Itema}}</h4>
            <h5>From £{{Originalpa}} to £{{Recommenda}}</h5>
            <h4>Accept recommendation?</h4>
            <b-button variant="success">Yes</b-button>
            <b-button variant="danger">No</b-button>
          </b-card>
          </b-col>
          <b-col cols="6">
          <b-card title="Due to low sales" style="text-align:center;">
            <h4>{{Itemb}}</h4>
            <h5>From £{{Originalpb}} to £{{Recommendb}}</h5>
            <h4>Accept recommendation?</h4>
            <b-button variant="success">Yes</b-button>
            <b-button variant="danger">No</b-button>
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
      SalesArraya: [],
      SalesArrayb: [],
      w:''
    }
  },
  components: {
    //HelloWorld,
    Sidebar
  },
  firebase() {
    return {
    week: {
      source: firebase.database().ref('Data/0/Weeklysales').child(firebase.auth().currentUser.uid),
      asObject: true
    },
    product: {
      source: firebase.database().ref('Data/1/Product').child(firebase.auth().currentUser.uid),
      asObject: true
    },
    stype: {
      source: firebase.database().ref('Data/2/Type').child(firebase.auth().currentUser.uid),
      asObject: true
    },
    stock: {
      source: firebase.database().ref('Data/3/Stock').child(firebase.auth().currentUser.uid),
      asObject: true
    }
  }
   },
   mounted:debounce(function () {
    this.$nextTick(() => {
      
        this.Createtable()
        
        })
}, 2000),
  methods: {
    Createtable(){
            let week = this.week['.value']
            let stck = this.stock['.value']
            let prd = this.product['.value']
            let tp = this.stype['.value']
            let length = this.week['.value'].length
            var Sales = 0
            var Profit = 0
            var Loss = 0
            var Items = 0
            var tbl = []
         for(let i = 0;i<length;i++){
           //console.log(week[i])
             var valObj = stck.filter(function(elem){
             if(elem.StockId == week[i].StockId) return elem
               });
               var Obj = prd.filter(function(elem){
             if(elem.ProductId == valObj[0].ProductId) return elem
               });
               var typeObj = tp.filter(function(elem){
             if(elem.TypeId == Obj[0].Type) return elem
               });
               Sales = Sales + valObj[0].SellingPrice
               Loss = Loss + Obj[0].OriginalPrice
               Items = Items + week[i].Sellings
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
           this.Itemssold= Items
           this.Totalsales= Sales.toFixed(2)
           this.Totalprofit= Profit.toFixed(2)
           this.newtable = tbl
           this.weeklysales()
           this.typechart()
           this.popularchart()
           this.drawPieChart()
          },
    weeklysales(){
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
      var arr = new Array()
      var data = this.newtable
      let tp = this.stype['.value']
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
      console.log(temparr[1].sales)
      for(let i = 0;i<temparr.length;i++){
        arr[i+1]=[tp[i].Type_Name, temparr[i].sales]
      }

      this.pieData = arr 
      
    },
    popularchart(){
      var arr = new Array()
      var data = this.newtable
      let prd = this.product['.value']
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
      authentication.signOut().then(() => {
        this.$router.replace('login')
      })
    },
    drawPieChart() {
      let stck = this.stock['.value']
      var data = this.newtable
      var temparr = []
      var temparr2 = []
      var totalmin = 0
      // var totalmax = 0
      var sales = 0
      var price = 0
      var total = this.Itemssold
      

      for(let i = 0;i<stck.length;i++){
        temparr.push({id: stck[i].StockId,
        price: price,
        sales: sales})
      }
      for(let i = 0;i<data.length;i++){
         var objIndex = temparr.findIndex((obj => obj.id == data[i].Stock))
         temparr[objIndex].sales = temparr[objIndex].sales + data[i].SoldItems
         temparr[objIndex].price = data[i].SellingPrice
       }
       var average = total/temparr.length
      
      for(let i = 0;i<temparr.length;i++){
        if(temparr[i].sales<average){
         temparr2.push({id: temparr[i].id,
         price: temparr[i].price,
        sales: temparr[i].sales})
        totalmin = totalmin + temparr[i].sales
        }
      }
      average = totalmin/temparr.length
      temparr.sort(function(a, b){return a.sales - b.sales})

      this.SalesArrayb = temparr2
      this.Itemb = temparr2[1].id
      this.Originalpb = temparr2[1].price
      this.Recommendb = (temparr2[1].price - (temparr2[1].price*0.15)).toFixed(2)

    }
  }
}
</script>

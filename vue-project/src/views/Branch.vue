<template>
    <div class = "branch">
        <Sidebar> 
            {{atotal}}
            <GChart
    type="AreaChart"
    :data="chartData"
    :options="chartOptions"
  />
        </Sidebar> 
    </div>
</template>

<script>
import { dailyref } from '@/firebase.js';
import Sidebar from '@/components/layout/Sidebar.vue';

export default {
name: 'branch',
data () {
    return {
      // Array will be automatically processed with visualization.arrayToDataTable function
      chartData: [
        ['Year', 'Sales', 'Expenses', 'Profit'],
        ['2014', 1000, 400, 200],
        ['2015', 1170, 460, 250],
        ['2016', 660, 1120, 300],
        ['2017', 1030, 540, 350]
      ],
      chartOptions: {
        chart: {
          title: 'Company Performance',
          subtitle: 'Sales, Expenses, and Profit: 2014-2017',
        }
      },
      atotal: 0,
      perweek: []
    }
  },
firebase:{
    branch: dailyref
},
components: {
    Sidebar
},
created: function () {
  this.$nextTick(function () {
    this.method1();
  })
},
  methods:{
     method1:function(){
         //maths
         let total = 0;
         let number = 1;
         let sum = 0;
         let date;
         for(let i = 0;i<this.branch.length;i++){
             if(number == this.branch[i].WsalesId){
                 sum = sum + this.branch[i].Sellings;
                 date = this.branch[i].Date;
                 }else{
                     number = this.branch[i].WsalesId;
                     this.perweek.push(sum)

                 }
             total = total + this.branch[i].Sellings;
         } 
            this.atotal = total;
         console.log(this.atotal);
      }
  }
//  beforeUpdate: function () {
//    this.$nextTick(function () {
//      console.log(this.branch.length);
//    })
// }
}
</script>

<style scoped>

</style>
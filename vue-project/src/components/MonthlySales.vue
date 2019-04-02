<template>
    <div class = "msales"> 
            
            <GChart
    type="AreaChart"
    :data="chartData"
    :options="chartOptions"
  />
    </div>
</template>

<script>


export default {
name: 'msales',
data () {
    return {
      // Array will be automatically processed with visualization.arrayToDataTable function
      chartData: [
        ['Month', 'Sales'],
        ['Janury', 1000],
        ['February', 1170],
        ['March', 660],
        ['April', 1030],
        ['May', 725],
        ['June', 760],
        ['July', 800],
        ['August', 1578],
        ['September', 1030],
        ['Octomber', 900],
        ['November', 630],
        ['December', 2030]
      ],
      chartOptions: {
        chart: {
          title: 'Company Performance',
          subtitle: 'Sales',
        }
      },
      atotal: 0,
      perweek: []
    }
  },
// firebase:{
//     branch: dailyref
// },

// created: function () {
//   this.$nextTick(function () {
//     this.method1();
//   })
// }
}
</script>

<style scoped>

</style>
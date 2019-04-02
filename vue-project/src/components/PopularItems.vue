<template>
    <div class = "msales"> 
            
            <GChart
    type="ColumnChart"
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
        ['Product', 'Percentage'],
        ['PRD34', 5],
        ['PRD65', 4],
        ['PRD145', 4],
        ['PRD5', 3],
        ['PRD233', 3],
        ['PRD250', 3],
        ['PRD20', 2],
        ['PRD56', 1],
        ['PRD144', 1],
        ['PRD150', 1]
      ],
      chartOptions: {
        chart: {
          title: 'Products by sales',
          subtitle: 'Persantage',
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
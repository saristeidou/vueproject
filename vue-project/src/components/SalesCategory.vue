<template>
    <div class = "msales"> 
            
            <GChart
    type="PieChart"
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
        ['Type', 'Sales'],
        ['Tops', 454],
        ['Accessories', 782],
        ['Shorts', 145],
        ['Hoodies&Sweetshirts', 272],
        ['Shirts&Blouses', 368],
        ['Jeans&Trousers', 256],
        ['Jacket&Coats', 115],
        ['Dress', 209],
        ['T-shirts', 407],
        ['Shirts', 198]
      ],
      chartOptions: {
        chart: {
          title: 'Products by type',
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
<template>
  <div class="apex-wrap">
    <div ref="areaChart" class="chart-area"></div>
    <div ref="barChart" class="chart-bar"></div>
  </div>
</template>

<script>
import ApexCharts from 'apexcharts'

function generateDayWiseTimeSeries(baseval, count, yrange) {
  const series = []
  let i = 0
  while (i < count) {
    const y = Math.floor(Math.random() * (yrange.max - yrange.min + 1)) + yrange.min
    series.push([baseval, y])
    baseval += 86400000
    i++
  }
  return series
}

export default {
  name: 'ApexChartDetail',
  props: {
    min: { type: Number, default: 30 },
    max: { type: Number, default: 180 }
  },
  data() {
    return {
      areaChart: null,
      barChart: null
    }
  },
  mounted() {
    this.render()
  },
  beforeDestroy() {
    if (this.areaChart) this.areaChart.destroy()
    if (this.barChart) this.barChart.destroy()
  },
  methods: {
    render() {
      const data = generateDayWiseTimeSeries(new Date('01 June 2020').getTime(), 365, {
        min: this.min,
        max: this.max
      })

      const options1 = {
        chart: {
          id: 'chart2',
          type: 'area',
          height: 240,
          foreColor: '#ccc',
          toolbar: { autoSelected: 'pan', show: false }
        },
        colors: ['#00BAEC'],
        stroke: { width: 3 },
        grid: { borderColor: '#555' },
        dataLabels: { enabled: false },
        fill: {
          gradient: { enabled: true, opacityFrom: 0.55, opacityTo: 0 }
        },
        markers: {
          size: 5,
          colors: ['#000524'],
          strokeColor: '#00BAEC',
          strokeWidth: 3
        },
        series: [{ data }],
        tooltip: { theme: 'dark' },
        xaxis: { type: 'datetime' },
        yaxis: { min: 0, tickAmount: 4 }
      }

      const options2 = {
        chart: {
          id: 'chart1',
          height: 180,
          type: 'bar',
          foreColor: '#ccc',
          brush: { target: 'chart2', enabled: true },
          selection: {
            fill: { color: '#fff', opacity: 0.4 },
            xaxis: {
              min: new Date('1 Jul 2020 10:00:00').getTime(),
              max: new Date('30 Jul 2020 10:00:00').getTime()
            }
          }
        },
        colors: ['#FF0080'],
        series: [{ data }],
        stroke: { width: 2 },
        grid: { borderColor: '#444' },
        markers: { size: 0 },
        xaxis: { type: 'datetime', tooltip: { enabled: false } },
        yaxis: { tickAmount: 2 }
      }

      this.areaChart = new ApexCharts(this.$refs.areaChart, options1)
      this.barChart = new ApexCharts(this.$refs.barChart, options2)
      this.areaChart.render()
      this.barChart.render()
    }
  }
}
</script>

<style scoped>
.apex-wrap {
  height: 100%;
  padding: 10px;
  box-sizing: border-box;
}
.chart-area,
.chart-bar {
  width: 100%;
}
</style>

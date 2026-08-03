<template>
  <div class="apex-wrap">
    <div v-if="hasData" ref="areaChart" class="chart-area"></div>
    <div v-if="hasData" ref="barChart" class="chart-bar"></div>
    <div v-else class="chart-empty">暂无历史数据</div>
  </div>
</template>

<script>
import ApexCharts from 'apexcharts'

export default {
  name: 'ApexChartDetail',
  props: {
    // 历史数据：[ [时间戳毫秒, 数值], ... ]
    data: {
      type: Array,
      default: () => []
    },
    min: { type: Number, default: 30 },
    max: { type: Number, default: 180 }
  },
  data() {
    return {
      areaChart: null,
      barChart: null,
      chartRenderId: 0
    }
  },
  computed: {
    hasData() {
      return this.points.length > 0
    },
    // 有效数据点：将 ISO 时间串转换为毫秒时间戳
    points() {
      if (!Array.isArray(this.data) || this.data.length === 0) {
        return []
      }
      return this.data
        .map(([time, value]) => {
          const ts = time instanceof Date ? time.getTime() : new Date(String(time)).getTime()
          const v = Number(value)
          return Number.isFinite(ts) && Number.isFinite(v) ? [ts, v] : null
        })
        .filter(Boolean)
    }
  },
  watch: {
    points() {
      this.render()
    }
  },
  mounted() {
    this.render()
  },
  beforeDestroy() {
    this.chartRenderId += 1
    if (this.areaChart) this.areaChart.destroy()
    if (this.barChart) this.barChart.destroy()
    this.areaChart = null
    this.barChart = null
  },
  methods: {
    render() {
      const renderId = ++this.chartRenderId
      if (this.areaChart) {
        this.areaChart.destroy()
        this.areaChart = null
      }
      if (this.barChart) {
        this.barChart.destroy()
        this.barChart = null
      }

      const data = this.points
      if (data.length === 0) {
        return
      }

      // 动态 brush 初始选区：取数据最后 25%
      const firstTime = data[0][0]
      const lastTime = data[data.length - 1][0]
      const range = lastTime - firstTime
      const selectionMin = range > 0 ? lastTime - range * 0.25 : firstTime
      const selectionMax = lastTime

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
        yaxis: {
          min: this.min,
          max: this.max,
          tickAmount: 4
        }
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
              min: selectionMin,
              max: selectionMax
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

      this.$nextTick(() => {
        if (renderId !== this.chartRenderId) {
          return
        }
        const areaElement = this.$refs.areaChart
        const barElement = this.$refs.barChart
        if (!areaElement || !barElement) {
          return
        }
        this.areaChart = new ApexCharts(areaElement, options1)
        this.barChart = new ApexCharts(barElement, options2)
        this.areaChart.render()
        this.barChart.render()
      })
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
.chart-empty {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #bac0c0;
  font-size: 16px;
}
</style>
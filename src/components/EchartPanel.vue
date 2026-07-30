<template>
  <div ref="chart" class="charts"></div>
</template>

<script>
import * as echarts from 'echarts'

export default {
  name: 'EchartPanel',
  props: {
    option: {
      type: Object,
      required: true
    }
  },
  data() {
    return {
      chart: null
    }
  },
  mounted() {
    this.initChart()
  },
  beforeDestroy() {
    if (this.chart) {
      this.chart.dispose()
      this.chart = null
    }
  },
  methods: {
    initChart() {
      if (!this.$refs.chart) return
      this.chart = echarts.init(this.$refs.chart)
      this.chart.setOption(this.option)
      window.addEventListener('resize', this.resizeChart)
    },
    resizeChart() {
      this.chart && this.chart.resize()
    }
  }
}
</script>

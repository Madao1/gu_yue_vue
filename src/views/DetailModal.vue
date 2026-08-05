<template>
  <div class="detail-modal">
    <div class="container">
      <section class="tabs">
        <div class="history-label">{{ config.labels[0] }}</div>
        <div class="bttxt">{{ config.title }}</div>
        <div class="clear-shadow"></div>

        <div class="content">
          <div class="content-1">
            <div v-if="!config.numeric" class="chart-placeholder">
              该指标为状态量，暂无历史趋势图
            </div>
            <div v-else-if="historyLoading" class="chart-placeholder">
              历史数据加载中...
            </div>
            <div v-else-if="historyError" class="chart-placeholder">
              {{ historyError }}
            </div>
            <ApexChartDetail
              v-else
              :data="historyChartData"
              :min="chartMin"
              :max="chartMax"
            />
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { getDetailConfig, resolveMetricKey } from '@/data/detailData'
import { getEnvironmentHistory } from '@/api/environment'
import ApexChartDetail from '@/components/ApexChartDetail.vue'

export default {
  name: 'DetailModal',
  components: {
    ApexChartDetail
  },
  props: {
    type: {
      type: String,
      default: 'temperature'
    }
  },
  data() {
    return {
      historyPoints: [],
      historyLoading: false,
      historyError: '',
      historyRequestId: 0
    }
  },
  watch: {
    metricKey() {
      this.loadHistory()
    }
  },
  created() {
    this.loadHistory()
  },
  beforeDestroy() {
    this.historyRequestId += 1
  },
  computed: {
    historyChartData() {
      return this.historyPoints.map(point => [point.timestamp, point.value])
    },
    config() {
      return getDetailConfig(this.type)
    },
    chartMin() {
      return this.config.chart ? this.config.chart.min : 30
    },
    chartMax() {
      return this.config.chart ? this.config.chart.max : 180
    },
    metricKey() {
      return resolveMetricKey(this.type)
    }
  },
  methods: {
    async loadHistory() {
      const requestId = ++this.historyRequestId
      const key = this.metricKey
      if (!key || !this.config.numeric) {
        this.historyPoints = []
        this.historyError = ''
        this.historyLoading = false
        return
      }

      this.historyLoading = true
      this.historyError = ''
      try {
        const data = await getEnvironmentHistory(key, { limit: 2000 })
        if (requestId !== this.historyRequestId) {
          return
        }
        this.historyPoints = data.points || []
      } catch (err) {
        if (requestId !== this.historyRequestId) {
          return
        }
        this.historyPoints = []
        this.historyError = err && err.message ? err.message : '历史数据加载失败'
      } finally {
        if (requestId === this.historyRequestId) {
          this.historyLoading = false
        }
      }
    }
  }
}
</script>

<style scoped>
.detail-modal {
  width: 100%;
  height: 100%;
  background: #010e50;
  padding: 20px;
  box-sizing: border-box;
  overflow: auto;
}

.container {
  width: 100%;
  height: 100%;
}

.tabs {
  position: relative;
  width: 100%;
  height: 100%;
}

.history-label {
  display: inline-block;
  padding: 8px 20px;
  color: #fff;
  background: #0258f0;
  border: 1px solid rgba(100, 162, 255, 0.3);
  margin-right: 5px;
  border-radius: 4px 4px 0 0;
}

.bttxt {
  position: absolute;
  top: 0;
  right: 0;
  color: #fff;
  font-size: 18px;
  font-weight: bold;
  padding: 8px 15px;
}

.clear-shadow {
  clear: both;
}

.content {
  height: calc(100% - 45px);
  background: rgba(0, 35, 120, 0.3);
  border: 1px solid rgba(100, 162, 255, 0.3);
  border-top: none;
  padding: 15px;
  box-sizing: border-box;
  overflow: auto;
}

.content-1 {
  height: 100%;
}

.chart-placeholder {
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #bac0c0;
  font-size: 16px;
}

</style>
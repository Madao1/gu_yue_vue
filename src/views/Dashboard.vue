<template>
  <div class="data">
    <LayoutHeader />
    <div v-if="statusText" class="connection-status" :class="statusClass">{{ statusText }}</div>
    <div class="data-content">
      <!-- 左侧 -->
      <div class="con-left fl">
        <div class="left-top">
          <BoxPanel title="实时环境状况" class="info">
            <EnvStatus :environment="environment" @open-detail="openDetail" />
          </BoxPanel>
          <BoxPanel title="环境设备状况" class="top-bottom">
            <EquipStatus
              :devices="devices"
              :pending-key="deviceTogglePending"
              @toggle-device="toggleDevice"
            />
          </BoxPanel>
        </div>
      </div>

      <!-- 中间 -->
      <div class="con-center fl">
        <SafetyDays />
        <div class="sgqyb-wrap">
          <WeatherCalendar />
        </div>
        <BoxPanel title="24H扬尘状况" class="cen-bottom">
          <EchartPanel v-if="dustOption" :option="dustOption" />
          <div v-if="dustLoading" class="dust-state">数据加载中...</div>
          <div v-else-if="dustError" class="dust-state error">{{ dustError }}</div>
          <div v-else-if="!dustHasData" class="dust-state">暂无近24小时扬尘数据</div>
        </BoxPanel>
      </div>

      <!-- 右侧 -->
      <div class="con-right fr">
        <BoxPanel title="近31日雨水量" class="right-top">
          <EchartPanel v-if="rainOption" :option="rainOption" />
          <div v-if="rainLoading" class="dust-state">数据加载中...</div>
          <div v-else-if="rainError" class="dust-state error">{{ rainError }}</div>
          <div v-else-if="!rainHasData" class="dust-state">暂无近31日降水数据</div>
        </BoxPanel>
        <BoxPanel title="24H温度状况" class="right-center">
          <EchartPanel v-if="tempOption" :option="tempOption" />
          <div v-if="tempLoading" class="dust-state">数据加载中...</div>
          <div v-else-if="tempError" class="dust-state error">{{ tempError }}</div>
          <div v-else-if="!tempHasData" class="dust-state">暂无近24小时温度数据</div>
        </BoxPanel>
        <BoxPanel title="24H噪声状况" class="right-bottom">
          <EchartPanel v-if="noiseOption" :option="noiseOption" />
          <div v-if="noiseLoading" class="dust-state">数据加载中...</div>
          <div v-else-if="noiseError" class="dust-state error">{{ noiseError }}</div>
          <div v-else-if="!noiseHasData" class="dust-state">暂无近24小时噪声数据</div>
        </BoxPanel>
      </div>
    </div>

    <!-- 弹窗详情 -->
    <div v-if="modalVisible" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content">
        <button class="close-btn" @click="closeModal">×</button>
        <DetailModal :type="modalType" />
      </div>
    </div>
  </div>
</template>

<script>
import {
  getCurrentSnapshot,
  getDailyPrecipitationHistory,
  getHourlyEnvironmentHistory,
  isCurrentSnapshot,
  toggleDevice as requestDeviceToggle
} from '@/api/environment'
import { createEnvironmentClient } from '@/api/websocket'
import LayoutHeader from '@/components/LayoutHeader.vue'
import BoxPanel from '@/components/BoxPanel.vue'
import EnvStatus from '@/components/EnvStatus.vue'
import EquipStatus from '@/components/EquipStatus.vue'
import SafetyDays from '@/components/SafetyDays.vue'
import WeatherCalendar from '@/components/WeatherCalendar.vue'

const EchartPanel = () => import('@/components/EchartPanel.vue')
const DetailModal = () => import('@/views/DetailModal.vue')

export default {
  name: 'Dashboard',
  components: {
    LayoutHeader,
    BoxPanel,
    EnvStatus,
    EquipStatus,
    SafetyDays,
    WeatherCalendar,
    EchartPanel,
    DetailModal
  },
  data() {
    return {
      dustOption: null,
      rainOption: null,
      tempOption: null,
      noiseOption: null,
      dustLoading: true,
      dustError: '',
      dustHasData: false,
      rainLoading: true,
      rainError: '',
      rainHasData: false,
      tempLoading: true,
      tempError: '',
      tempHasData: false,
      noiseLoading: true,
      noiseError: '',
      noiseHasData: false,
      modalVisible: false,
      modalType: 'temperature',
      environment: null,
      devices: null,
      loading: true,
      error: null,
      connected: false,
      client: null,
      deviceTogglePending: ''
    }
  },
  computed: {
    statusText() {
      if (this.loading) return '数据加载中...'
      if (this.error) return this.error
      return this.connected ? '实时数据已连接' : '实时数据已断开'
    },
    statusClass() {
      if (this.loading) return 'loading'
      if (this.error) return 'error'
      return this.connected ? 'ok' : 'error'
    }
  },
  mounted() {
    this.loadSnapshot()
    this.loadChartOptions()
    this.client = createEnvironmentClient({
      onMessage: this.handleSnapshot,
      onConnect: () => { this.connected = true; this.error = null },
      onDisconnect: () => { this.connected = false },
      onError: (err) => { this.error = err.message }
    })
    this.client.start()
  },
  beforeDestroy() {
    if (this.client) {
      this.client.stop()
    }
  },
  methods: {
    async loadChartOptions() {
      try {
        const [dustChart, rainChart, tempChart, noiseChart] = await Promise.all([
          import('@/charts/chartDust24h'),
          import('@/charts/chartRainMonth'),
          import('@/charts/chartTemp24h'),
          import('@/charts/chartNoise24h')
        ])
        const getDustOption = dustChart.default
        const getRainOption = rainChart.default
        const getTempOption = tempChart.default
        const getNoiseOption = noiseChart.default
        this.dustOption = getDustOption([])
        this.rainOption = getRainOption([])
        this.tempOption = getTempOption([])
        this.noiseOption = getNoiseOption([])
        await Promise.all([
          this.loadDustHistory(getDustOption),
          this.loadRainHistory(getRainOption),
          this.loadMetricHistory(
            'temperature',
            getTempOption,
            'tempOption',
            'tempLoading',
            'tempError',
            'tempHasData',
            '温度数据加载失败'
          ),
          this.loadMetricHistory(
            'noise',
            getNoiseOption,
            'noiseOption',
            'noiseLoading',
            'noiseError',
            'noiseHasData',
            '噪声数据加载失败'
          )
        ])
      } catch (e) {
        const message = e.message || '图表加载失败'
        this.dustHasData = false
        this.dustLoading = false
        this.dustError = message
        this.rainHasData = false
        this.rainLoading = false
        this.rainError = message
        this.tempHasData = false
        this.tempLoading = false
        this.tempError = message
        this.noiseHasData = false
        this.noiseLoading = false
        this.noiseError = message
      }
    },
    async loadDustHistory(getDustOption) {
      this.dustLoading = true
      this.dustError = ''
      try {
        const data = await getHourlyEnvironmentHistory('dust')
        const points = Array.isArray(data.points) ? data.points : []
        this.dustHasData = points.some(point => {
          return point && point.value !== null && point.value !== undefined && Number.isFinite(Number(point.value))
        })
        this.dustOption = getDustOption(points)
      } catch (e) {
        this.dustHasData = false
        this.dustOption = getDustOption([])
        this.dustError = e.message || '扬尘数据加载失败'
      } finally {
        this.dustLoading = false
      }
    },
    async loadRainHistory(getRainOption) {
      this.rainLoading = true
      this.rainError = ''
      try {
        const data = await getDailyPrecipitationHistory()
        const points = Array.isArray(data.points) ? data.points : []
        this.rainHasData = points.some(point => {
          return point && point.value !== null && point.value !== undefined && Number.isFinite(Number(point.value))
        })
        this.rainOption = getRainOption(points)
      } catch (e) {
        this.rainHasData = false
        this.rainOption = getRainOption([])
        this.rainError = e.message || '降水数据加载失败'
      } finally {
        this.rainLoading = false
      }
    },
    async loadMetricHistory(metric, getOption, optionKey, loadingKey, errorKey, hasDataKey, errorMessage) {
      this[loadingKey] = true
      this[errorKey] = ''
      try {
        const data = await getHourlyEnvironmentHistory(metric)
        const points = Array.isArray(data.points) ? data.points : []
        this[hasDataKey] = points.some(point => {
          return point && point.value !== null && point.value !== undefined && Number.isFinite(Number(point.value))
        })
        this[optionKey] = getOption(points)
      } catch (e) {
        this[hasDataKey] = false
        this[optionKey] = getOption([])
        this[errorKey] = e.message || errorMessage
      } finally {
        this[loadingKey] = false
      }
    },
    async loadSnapshot() {
      this.loading = true
      this.error = null
      try {
        const snapshot = await getCurrentSnapshot()
        this.handleSnapshot(snapshot)
      } catch (e) {
        this.error = e.message || '数据加载失败'
      } finally {
        this.loading = false
      }
    },
    handleSnapshot(snapshot) {
      if (!isCurrentSnapshot(snapshot)) {
        this.error = '收到无效的环境数据'
        return
      }
      this.environment = snapshot.environment
      this.devices = snapshot.devices
      this.error = null
    },
    async toggleDevice(deviceKey) {
      if (this.deviceTogglePending) {
        return
      }

      this.deviceTogglePending = deviceKey
      this.error = null
      try {
        this.devices = await requestDeviceToggle(deviceKey)
      } catch (e) {
        this.error = e.message || '设备操作失败'
      } finally {
        this.deviceTogglePending = ''
      }
    },
    openDetail(type) {
      this.modalType = type
      this.modalVisible = true
    },
    closeModal() {
      this.modalVisible = false
    }
  }
}
</script>

<style scoped>
.sgqyb-wrap {
  position: absolute;
  top: 95px;
  left: 0;
  width: 100%;
  height: 510px;
  z-index: 1;
  display: flex;
  justify-content: center;
}

.modal-overlay {
  position: fixed;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: rgba(0, 0, 0, 0.8);
  z-index: 1000;
  display: flex;
  align-items: center;
  justify-content: center;
}

.modal-content {
  position: relative;
  width: 90vw;
  height: 85vh;
  background: #010e50;
  border: 1px solid rgba(100, 162, 255, 0.5);
  border-radius: 8px;
  overflow: hidden;
}

.close-btn {
  position: absolute;
  top: 10px;
  right: 15px;
  z-index: 10;
  background: transparent;
  color: #fff;
  font-size: 32px;
  line-height: 1;
  cursor: pointer;
  border: none;
}

.connection-status {
  position: fixed;
  top: 8px;
  right: 12px;
  z-index: 1001;
  padding: 4px 10px;
  border-radius: 4px;
  font-size: 12px;
  color: #fff;
  background: rgba(0, 0, 0, 0.5);
}

.connection-status.ok {
  background: rgba(40, 167, 69, 0.8);
}

.connection-status.loading {
  background: rgba(255, 193, 7, 0.9);
  color: #000;
}

.connection-status.error {
  background: rgba(220, 53, 69, 0.8);
}

.dust-state {
  position: absolute;
  top: 35px;
  right: 0;
  bottom: 0;
  left: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  color: rgba(255, 255, 255, 0.65);
  font-size: 14px;
  background: rgba(1, 14, 80, 0.2);
  pointer-events: none;
}

.dust-state.error {
  color: #ffb3b3;
}
</style>

<template>
  <div class="data">
    <LayoutHeader />
    <div class="data-content">
      <!-- 左侧 -->
      <div class="con-left fl">
        <div class="left-top">
          <BoxPanel title="实时环境状况" class="info">
            <EnvStatus @open-detail="openDetail" />
          </BoxPanel>
          <BoxPanel title="环境设备状况" class="top-bottom">
            <EquipStatus @open-detail="openDetail" />
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
          <EchartPanel :option="dustOption" />
        </BoxPanel>
      </div>

      <!-- 右侧 -->
      <div class="con-right fr">
        <BoxPanel title="月雨水量" class="right-top">
          <EchartPanel :option="rainOption" />
        </BoxPanel>
        <BoxPanel title="24H温度状况" class="right-center">
          <EchartPanel :option="tempOption" />
        </BoxPanel>
        <BoxPanel title="24H噪声状况" class="right-bottom">
          <EchartPanel :option="noiseOption" />
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
import LayoutHeader from '@/components/LayoutHeader.vue'
import BoxPanel from '@/components/BoxPanel.vue'
import EnvStatus from '@/components/EnvStatus.vue'
import EquipStatus from '@/components/EquipStatus.vue'
import SafetyDays from '@/components/SafetyDays.vue'
import WeatherCalendar from '@/components/WeatherCalendar.vue'
import EchartPanel from '@/components/EchartPanel.vue'
import DetailModal from '@/views/DetailModal.vue'
import getDustOption from '@/charts/chartDust24h'
import getRainOption from '@/charts/chartRainMonth'
import getTempOption from '@/charts/chartTemp24h'
import getNoiseOption from '@/charts/chartNoise24h'

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
      dustOption: getDustOption(),
      rainOption: getRainOption(),
      tempOption: getTempOption(),
      noiseOption: getNoiseOption(),
      modalVisible: false,
      modalType: '1'
    }
  },
  methods: {
    openDetail(type) {
      this.modalType = String(type)
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
  left: -35px;
  width: 970px;
  height: 510px;
  z-index: 1;
  transform: scale(0.95);
  transform-origin: top left;
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
</style>

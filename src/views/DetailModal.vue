<template>
  <div class="detail-modal">
    <div class="container">
      <section class="tabs">
        <div v-for="(label, index) in config.labels" :key="index">
          <input
            :id="'tab-' + index"
            v-model="activeTab"
            type="radio"
            name="radio-set"
            :value="index"
          />
          <label :for="'tab-' + index">{{ label }}</label>
        </div>
        <div class="bttxt">{{ config.title }}</div>
        <div class="clear-shadow"></div>

        <div class="content">
          <div v-show="activeTab === 0" class="content-1">
            <ApexChartDetail :min="chartMin" :max="chartMax" />
          </div>

          <div v-show="activeTab === 1" class="content-2">
            <h2>
              <h3 v-for="(v, i) in currentValues" :key="i">{{ v }}</h3>
            </h2>
          </div>

          <div v-show="activeTab === 2 || activeTab === 3" class="content-3">
            <div v-for="region in config.regions" :key="region.key">
              <h1>{{ region.name }}</h1>
              <table>
                <thead>
                  <tr>
                    <th v-for="c in 5" :key="c">日期</th>
                    <th v-for="c in 5" :key="'t-' + c">发生时间</th>
                    <th v-for="c in 5" :key="'s-' + c">感应器号</th>
                    <th v-for="c in 5" :key="'v-' + c">{{ config.metricName }}</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="r in region.rows" :key="r">
                    <td v-for="c in 5" :key="c">2021-01-01</td>
                    <td v-for="c in 5" :key="'t-' + c">00：00：00</td>
                    <td v-for="c in 5" :key="'s-' + c">01</td>
                    <td v-for="c in 5" :key="'v-' + c">{{ sampleValue }}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>
    </div>
  </div>
</template>

<script>
import { getDetailConfig, resolveMetricKey } from '@/data/detailData'
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
    },
    environment: {
      type: Object,
      default: null
    }
  },
  data() {
    return {
      activeTab: 0
    }
  },
  computed: {
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
    },
    currentValue() {
      if (!this.environment) {
        return null
      }
      const key = this.metricKey || this.type
      const raw = this.environment[key]
      if (raw == null) {
        return null
      }
      if (this.config.numeric && this.config.decimals != null) {
        const number = Number(raw)
        return Number.isFinite(number) ? number.toFixed(this.config.decimals) : raw
      }
      return raw
    },
    currentValues() {
      const display = this.currentValue == null ? '--' : String(this.currentValue) + (this.config.unit || '')
      return [display]
    },
    sampleValue() {
      return this.currentValue == null ? '--' : String(this.currentValue)
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

.tabs input {
  position: absolute;
  opacity: 0;
  z-index: -1;
}

.tabs label {
  display: inline-block;
  padding: 8px 20px;
  color: #fff;
  cursor: pointer;
  background: rgba(0, 35, 120, 0.5);
  border: 1px solid rgba(100, 162, 255, 0.3);
  margin-right: 5px;
  border-radius: 4px 4px 0 0;
}

.tabs input:checked + label {
  background: #0258f0;
  border-bottom-color: #0258f0;
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

.content-2 h2 {
  display: flex;
  justify-content: space-around;
  align-items: center;
  height: 100%;
  color: #fff;
  font-size: 24px;
}

.content-2 h3 {
  font-size: 28px;
  font-weight: bold;
  color: #40a9ff;
}

.content-3 h1 {
  color: #fff;
  font-size: 16px;
  margin: 10px 0;
}

.content-3 table {
  width: 100%;
  color: #fff;
  font-size: 12px;
  border: 1px solid rgba(255, 255, 255, 0.2);
}

.content-3 th,
.content-3 td {
  border: 1px solid rgba(255, 255, 255, 0.2);
  padding: 4px 6px;
  text-align: center;
}

.content-3 th {
  background: rgba(2, 88, 240, 0.3);
}
</style>
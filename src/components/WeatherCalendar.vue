<template>
  <div class="weather-calendar">
    <div class="header">
      <h2>施工现场晴雨表</h2>
      <div class="controls">
        <span class="threshold-tip">降雨量 ≥ {{ rainThreshold }}mm 记为雨天</span>
        <select v-model="year" :disabled="loading">
          <option v-for="y in years" :key="y" :value="y">{{ y }}年</option>
        </select>
        <select v-model="month" :disabled="loading">
          <option v-for="m in 12" :key="m" :value="m">{{ m }}月</option>
        </select>
        <button @click="renderCalendar" :disabled="loading">查询</button>
      </div>
    </div>

    <div v-if="loading" class="status-box">加载中...</div>
    <div v-else-if="error" class="status-box">
      <span>{{ error }}</span>
      <button @click="renderCalendar">重试</button>
    </div>
    <table v-else class="calendar-table">
      <thead>
        <tr>
          <th>周一</th>
          <th>周二</th>
          <th>周三</th>
          <th>周四</th>
          <th>周五</th>
          <th class="weekend">周六</th>
          <th class="weekend">周日</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(row, rIndex) in calendarRows" :key="rIndex">
          <td v-for="(cell, cIndex) in row" :key="cIndex" :class="{ empty: !cell.day }">
            <div v-if="cell.day" class="day-cell" :class="{ highlight: cell.isToday }">
              <div class="date-num">{{ cell.day }}</div>
              <div class="weather-icon">{{ weatherIcon(cell.weather) }}</div>
              <div class="temp">{{ formatTemp(cell.temperature) }}</div>
            </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import { getWeatherCalendar } from '@/api/weatherCalendar'

const WEATHER_ICONS = {
  晴: '☀️',
  雨: '🌧️'
}

export default {
  name: 'WeatherCalendar',
  data() {
    const today = new Date()
    return {
      year: today.getFullYear(),
      month: today.getMonth() + 1,
      calendarRows: [],
      rainThreshold: '--',
      loading: false,
      error: ''
    }
  },
  computed: {
    years() {
      const y = new Date().getFullYear()
      return [y, y - 1, y - 2]
    }
  },
  mounted() {
    this.renderCalendar()
  },
  methods: {
    async renderCalendar() {
      this.loading = true
      this.error = ''
      try {
        const data = await getWeatherCalendar(this.year, this.month)
        this.rainThreshold = data.rainThreshold
        this.buildRows(data.days)
      } catch (e) {
        this.error = e.message || '加载失败'
        this.calendarRows = []
      } finally {
        this.loading = false
      }
    },
    buildRows(days) {
      const firstDayOfWeek = new Date(this.year, this.month - 1, 1).getDay()
      const startOffset = firstDayOfWeek === 0 ? 6 : firstDayOfWeek - 1
      const daysInMonth = new Date(this.year, this.month, 0).getDate()
      const today = new Date()
      const isCurrentMonth = this.year === today.getFullYear() && this.month === today.getMonth() + 1
      const dayMap = new Map(days.map((d) => [d.day, d]))

      const cells = []
      for (let i = 0; i < startOffset; i++) {
        cells.push({ day: null })
      }
      for (let day = 1; day <= daysInMonth; day++) {
        const rec = dayMap.get(day)
        const weather = rec && rec.weather ? rec.weather : '--'
        const temperature = rec && typeof rec.temperature === 'number' ? rec.temperature : null
        cells.push({
          day,
          isToday: isCurrentMonth && day === today.getDate(),
          weather,
          temperature
        })
      }

      const rows = []
      for (let i = 0; i < cells.length; i += 7) {
        const row = cells.slice(i, i + 7)
        while (row.length < 7) {
          row.push({ day: null })
        }
        rows.push(row)
      }
      this.calendarRows = rows
    },
    weatherIcon(weather) {
      return WEATHER_ICONS[weather] || '❓'
    },
    formatTemp(temperature) {
      if (temperature === null || temperature === undefined) {
        return '--'
      }
      return `${Math.round(temperature)}°`
    }
  }
}
</script>

<style scoped>
.weather-calendar {
  width: 100%;
  max-width: 900px;
  height: 500px;
  border-radius: 8px;
  padding: 15px 20px;
  box-sizing: border-box;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
  display: flex;
  flex-direction: column;
  color: #ffffff;
  background: transparent;
}

.header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 10px;
  border-bottom: 1px solid rgba(255, 255, 255, 0.2);
  padding-bottom: 10px;
}

.header h2 {
  margin: 0;
  color: #ffffff;
  font-size: 20px;
  font-weight: normal;
}

.controls {
  display: flex;
  gap: 10px;
  align-items: center;
}

.threshold-tip {
  font-size: 12px;
  color: #8caed8;
}

.controls select {
  padding: 5px 10px;
  font-size: 13px;
  background-color: #1e3a6f;
  color: #fff;
  border: 1px solid #3a5a9f;
  border-radius: 3px;
  cursor: pointer;
}

.controls select:disabled,
.controls button:disabled {
  opacity: 0.5;
  cursor: not-allowed;
}

.controls button {
  padding: 6px 15px;
  background: #1890ff;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 13px;
}

.controls button:hover:not(:disabled) {
  background: #40a9ff;
}

.status-box {
  flex-grow: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 12px;
  color: #b0c4de;
  font-size: 14px;
}

.status-box button {
  padding: 6px 15px;
  background: #1890ff;
  color: #fff;
  border: none;
  border-radius: 3px;
  cursor: pointer;
  font-size: 13px;
}

.status-box button:hover {
  background: #40a9ff;
}

.calendar-table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  flex-grow: 1;
}

.calendar-table th {
  padding: 8px 0;
  text-align: center;
  color: #8caed8;
  font-weight: normal;
  font-size: 13px;
  border-bottom: 1px solid #2a4170;
}

.calendar-table th.weekend {
  color: #4a9eff;
}

.calendar-table td {
  border: 1px solid #1e3a6f;
  padding: 0;
  vertical-align: middle;
  transition: background 0.2s;
}

.calendar-table td:hover {
  background: #1e3a6f;
}

.calendar-table td.empty {
  background: transparent;
  border-color: transparent;
}

.day-cell {
  padding: 4px;
  height: 100%;
  box-sizing: border-box;
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-around;
  position: relative;
  font-size: 12px;
}

.day-cell.highlight {
  border: 2px solid #ff7a45;
  box-shadow: 0 0 8px rgba(255, 122, 69, 0.5);
  border-radius: 4px;
}

.date-num {
  font-size: 14px;
  color: #fff;
  font-weight: bold;
  width: 25%;
  text-align: center;
}

.weather-icon {
  font-size: 22px;
  width: 25%;
  text-align: center;
}

.temp {
  font-size: 12px;
  color: #b0c4de;
  width: 50%;
  text-align: center;
}
</style>
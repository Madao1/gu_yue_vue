// 环境指标详情配置，key 与 EnvStatus.vue 中的环境指标 key 一一对应
export const detailTypes = {
  noise: {
    title: '噪声查询',
    numeric: true,
    chart: { min: 40, max: 120 },
    labels: ['历史日均噪声']
  },
  pm10: {
    title: 'PM10 查询',
    numeric: true,
    chart: { min: 0, max: 300 },
    labels: ['历史日均PM10']
  },
  pm25: {
    title: 'PM2.5 查询',
    numeric: true,
    chart: { min: 0, max: 250 },
    labels: ['历史日均PM2.5']
  },
  tsp: {
    title: 'TSP 查询',
    numeric: true,
    chart: { min: 0, max: 5 },
    labels: ['历史日均TSP']
  },
  dust: {
    title: '扬尘查询',
    numeric: true,
    chart: { min: 0, max: 1 },
    labels: ['历史日均扬尘']
  },
  windSpeed: {
    title: '风速查询',
    numeric: true,
    chart: { min: 0, max: 20 },
    labels: ['历史日均风速']
  },
  windDirection: {
    title: '风向查询',
    numeric: false,
    chart: { min: 0, max: 360 },
    labels: ['历史日均风向']
  },
  precipitation: {
    title: '雨量查询',
    numeric: true,
    chart: { min: 0, max: 50 },
    labels: ['历史日均雨量']
  },
  airPressure: {
    title: '气压查询',
    numeric: true,
    chart: { min: 95, max: 105 },
    labels: ['历史日均气压']
  },
  temperature: {
    title: '室内温度查询',
    numeric: true,
    chart: { min: -10, max: 45 },
    labels: ['历史日均温度']
  },
  humidity: {
    title: '室内湿度查询',
    numeric: true,
    chart: { min: 10, max: 100 },
    labels: ['历史日均湿度']
  },
  smoke1: {
    title: '烟雾1查询',
    numeric: false,
    chart: { min: 0, max: 100 },
    labels: ['历史日均烟雾1']
  },
  smoke2: {
    title: '烟雾2查询',
    numeric: false,
    chart: { min: 0, max: 100 },
    labels: ['历史日均烟雾2']
  }
}

// 兼容旧路由 /detail/:type 的数字类型（1-6）
const legacyMap = {
  '1': 'temperature',
  '2': 'humidity',
  '4': 'pm25',
  '5': 'windSpeed'
}

// 旧配置中存在的指标（CO₂、化学气体），环境中暂无对应实时数据
const legacyOnlyTypes = {
  '3': {
    title: 'CO₂二氧化碳查询',
    numeric: true,
    chart: { min: 1, max: 2 },
    labels: ['历史日均二氧化碳']
  },
  '6': {
    title: '化学气体查询',
    numeric: true,
    chart: { min: 0, max: 10 },
    labels: ['历史日均气体']
  }
}

// 将任意 type（指标 key 或旧数字类型）解析为环境快照中的字段 key
export function resolveMetricKey(type) {
  if (type == null) {
    return 'temperature'
  }
  const key = String(type)
  if (detailTypes[key]) {
    return key
  }
  if (legacyMap[key]) {
    return legacyMap[key]
  }
  // CO₂ / 化学气体 等旧类型在 real_time_environment 表中无对应字段
  return null
}

export function getDetailConfig(type) {
  if (type == null) {
    return detailTypes.temperature
  }
  const key = String(type)
  if (detailTypes[key]) {
    return detailTypes[key]
  }
  if (legacyMap[key]) {
    return detailTypes[legacyMap[key]]
  }
  if (legacyOnlyTypes[key]) {
    return legacyOnlyTypes[key]
  }
  return detailTypes.temperature
}

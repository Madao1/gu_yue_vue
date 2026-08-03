// 环境指标详情配置，key 与 EnvStatus.vue 中的环境指标 key 一一对应
export const detailTypes = {
  noise: {
    title: '噪声查询',
    unit: 'dB',
    metricName: '噪声',
    numeric: true,
    decimals: 0,
    chart: { min: 40, max: 120 },
    labels: ['历史日均噪声', '当前噪声状况', '区域噪声表', '报警记录'],
    regions: [
      { name: '1区', key: 'zone1', rows: 6 },
      { name: '2区', key: 'zone2', rows: 6 }
    ]
  },
  pm10: {
    title: 'PM10 查询',
    unit: 'μg/m³',
    metricName: 'PM10',
    numeric: true,
    decimals: 2,
    chart: { min: 0, max: 300 },
    labels: ['历史日均PM10', '当前PM10状况', '区域PM10表', '报警记录'],
    regions: [
      { name: '1区', key: 'zone1', rows: 6 },
      { name: '2区', key: 'zone2', rows: 6 }
    ]
  },
  pm25: {
    title: 'PM2.5 查询',
    unit: 'μg/m³',
    metricName: 'PM2.5',
    numeric: true,
    decimals: 2,
    chart: { min: 0, max: 250 },
    labels: ['历史日均PM2.5', '当前PM2.5状况', '区域PM2.5表', '报警记录'],
    regions: [
      { name: '1区', key: 'zone1', rows: 6 },
      { name: '2区', key: 'zone2', rows: 6 }
    ]
  },
  tsp: {
    title: 'TSP 查询',
    unit: 'mg/m³',
    metricName: 'TSP',
    numeric: true,
    decimals: 2,
    chart: { min: 0, max: 5 },
    labels: ['历史日均TSP', '当前TSP状况', '区域TSP表', '报警记录'],
    regions: [
      { name: '1区', key: 'zone1', rows: 6 },
      { name: '2区', key: 'zone2', rows: 6 }
    ]
  },
  dust: {
    title: '扬尘查询',
    unit: 'mg/m³',
    metricName: '扬尘',
    numeric: true,
    decimals: 3,
    chart: { min: 0, max: 1 },
    labels: ['历史日均扬尘', '当前扬尘状况', '区域扬尘表', '报警记录'],
    regions: [
      { name: '1区', key: 'zone1', rows: 6 },
      { name: '2区', key: 'zone2', rows: 6 }
    ]
  },
  windSpeed: {
    title: '风速查询',
    unit: 'm/s',
    metricName: '风速',
    numeric: true,
    decimals: 1,
    chart: { min: 0, max: 20 },
    labels: ['历史日均风速', '当前风速状况', '区域风速表', '报警记录'],
    regions: [
      { name: '1区', key: 'zone1', rows: 6 },
      { name: '2区', key: 'zone2', rows: 6 }
    ]
  },
  windDirection: {
    title: '风向查询',
    unit: '',
    metricName: '风向',
    numeric: false,
    chart: { min: 0, max: 360 },
    labels: ['历史日均风向', '当前风向状况', '区域风向表', '报警记录'],
    regions: [
      { name: '1区', key: 'zone1', rows: 6 },
      { name: '2区', key: 'zone2', rows: 6 }
    ]
  },
  precipitation: {
    title: '雨量查询',
    unit: 'mm',
    metricName: '雨量',
    numeric: true,
    decimals: 1,
    chart: { min: 0, max: 50 },
    labels: ['历史日均雨量', '当前雨量状况', '区域雨量表', '报警记录'],
    regions: [
      { name: '1区', key: 'zone1', rows: 6 },
      { name: '2区', key: 'zone2', rows: 6 }
    ]
  },
  airPressure: {
    title: '气压查询',
    unit: 'kPa',
    metricName: '气压',
    numeric: true,
    decimals: 2,
    chart: { min: 95, max: 105 },
    labels: ['历史日均气压', '当前气压状况', '区域气压表', '报警记录'],
    regions: [
      { name: '1区', key: 'zone1', rows: 6 },
      { name: '2区', key: 'zone2', rows: 6 }
    ]
  },
  temperature: {
    title: '室内温度查询',
    unit: '°C',
    metricName: '温度',
    numeric: true,
    decimals: 1,
    chart: { min: -10, max: 45 },
    labels: ['历史日均温度', '当前温度状况', '区域温度表', '报警记录'],
    regions: [
      { name: '1区', key: 'zone1', rows: 6 },
      { name: '2区', key: 'zone2', rows: 6 }
    ]
  },
  humidity: {
    title: '室内湿度查询',
    unit: '%RH',
    metricName: '湿度',
    numeric: true,
    decimals: 1,
    chart: { min: 10, max: 100 },
    labels: ['历史日均湿度', '当前湿度状况', '区域湿度表', '报警记录'],
    regions: [
      { name: '1区', key: 'zone1', rows: 6 },
      { name: '2区', key: 'zone2', rows: 6 }
    ]
  },
  smoke1: {
    title: '烟雾1查询',
    unit: '',
    metricName: '烟雾1',
    numeric: false,
    chart: { min: 0, max: 100 },
    labels: ['历史日均烟雾1', '当前烟雾1状况', '区域烟雾1表', '报警记录'],
    regions: [
      { name: '1区', key: 'zone1', rows: 6 },
      { name: '2区', key: 'zone2', rows: 6 }
    ]
  },
  smoke2: {
    title: '烟雾2查询',
    unit: '',
    metricName: '烟雾2',
    numeric: false,
    chart: { min: 0, max: 100 },
    labels: ['历史日均烟雾2', '当前烟雾2状况', '区域烟雾2表', '报警记录'],
    regions: [
      { name: '1区', key: 'zone1', rows: 6 },
      { name: '2区', key: 'zone2', rows: 6 }
    ]
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
    unit: 'g/L',
    metricName: '二氧化碳',
    numeric: true,
    decimals: 2,
    chart: { min: 1, max: 2 },
    labels: ['历史日均二氧化碳', '区域二氧化碳状况', '环境二氧化碳表', '报警数据'],
    regions: [
      { name: '区域1', key: 'zone1', rows: 6 },
      { name: '区域2', key: 'zone2', rows: 6 }
    ]
  },
  '6': {
    title: '化学气体查询',
    unit: 'ppm',
    metricName: '气体',
    numeric: true,
    decimals: 2,
    chart: { min: 0, max: 10 },
    labels: ['历史日均气体', '区域气体状况', '环境气体记录表', '报警详细数据'],
    regions: [
      { name: '区域1', key: 'zone1', rows: 6 },
      { name: '区域2', key: 'zone2', rows: 6 }
    ]
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

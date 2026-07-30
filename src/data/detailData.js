export const detailTypes = {
  '1': {
    title: '室内温度查询',
    unit: '°',
    labels: ['历史日均温度', '室内温度状况', '报警记录'],
    regions: [
      { name: '1区', key: 'zone1', rows: 6 },
      { name: '2区', key: 'zone2', rows: 6 }
    ],
    values: ['12 °', '20 °', '26 °', '24 °', '21 °']
  },
  '2': {
    title: '室内湿度查询',
    unit: '%',
    labels: ['历史日均湿度', '区域湿度状况', '环境湿度表', '报警记录'],
    regions: [
      { name: '区域1', key: 'zone1', rows: 6 },
      { name: '区域2', key: 'zone2', rows: 6 }
    ],
    values: ['55%', '56%', '55%', '55%', '54%']
  },
  '3': {
    title: 'CO₂二氧化碳查询',
    unit: 'g/L',
    labels: ['历史日均二氧化碳', '区域二氧化碳状况', '环境二氧化碳表', '报警数据'],
    regions: [
      { name: '区域1', key: 'zone1', rows: 6 },
      { name: '区域2', key: 'zone2', rows: 6 }
    ],
    values: ['1.29g/L', '1.32g/L', '1.30g/L', '1.28g/L', '1.25g/L']
  },
  '4': {
    title: 'PM2.5 查询',
    unit: 'μg/m³',
    labels: ['历史日均PM2.5', '区域PM2.5状况', '环境PM2.5表', '报警数据'],
    regions: [
      { name: '区域1', key: 'zone1', rows: 6 },
      { name: '区域2', key: 'zone2', rows: 6 }
    ],
    values: ['35μg/m³', '36μg/m³', '34μg/m³', '33μg/m³', '32μg/m³']
  },
  '5': {
    title: '风速查询',
    unit: 'm/s',
    labels: ['历史日均风速', '区域风速状况', '环境风速表', '报警数据'],
    regions: [
      { name: '区域1', key: 'zone1', rows: 6 },
      { name: '区域2', key: 'zone2', rows: 6 }
    ],
    values: ['5m/s', '6m/s', '5m/s', '4m/s', '5m/s']
  },
  '6': {
    title: '化学气体查询',
    unit: 'ppm',
    labels: ['历史日均气体', '区域气体状况', '环境气体记录表', '报警详细数据'],
    regions: [
      { name: '区域1', key: 'zone1', rows: 6 },
      { name: '区域2', key: 'zone2', rows: 6 }
    ],
    values: ['0.00ppm', '0.00ppm', '0.00ppm', '0.00ppm', '0.00ppm']
  }
}

export function getDetailConfig(type) {
  return detailTypes[type] || detailTypes['1']
}

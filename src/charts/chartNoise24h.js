const raw = [
  { month: '0', value: 5 },
  { month: '2', value: 5 },
  { month: '4', value: 6 },
  { month: '6', value: 8 },
  { month: '8', value: 18 },
  { month: '10', value: 29 },
  { month: '12', value: 28 },
  { month: '14', value: 30 },
  { month: '16', value: 28 },
  { month: '18', value: 26 },
  { month: '20', value: 19 },
  { month: '22', value: 3 }
]

const xAxisMonth = []
const barData = []
const lineData = []
raw.forEach(item => {
  xAxisMonth.push(item.month)
  barData.push({ name: item.month, value: item.value })
  lineData.push({ name: item.month, value: item.value })
})

export default function getOption() {
  return {
    title: '',
    grid: {
      top: '10%',
      left: 30,
      bottom: 0,
      right: 10,
      containLabel: true
    },
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'none' },
      formatter(params) {
        return params[0].data.name + '<br/>' + '次数: ' + params[1].data.value + '次'
      }
    },
    xAxis: [
      {
        type: 'category',
        show: false,
        data: xAxisMonth,
        axisLabel: {
          textStyle: { color: '#b6b5ab' }
        }
      },
      {
        type: 'category',
        position: 'bottom',
        data: xAxisMonth,
        axisPointer: { type: 'none' },
        axisLine: {
          lineStyle: { color: 'rgba(255,255,255,0.2)' }
        },
        axisTick: { show: false },
        axisLabel: {
          interval: 0,
          textStyle: { color: '#b6b5ab', fontSize: 12 }
        }
      }
    ],
    yAxis: [
      {
        show: true,
        offset: 15,
        splitLine: { show: false },
        axisTick: { show: false },
        axisLine: {
          show: true,
          lineStyle: { color: 'rgba(255,255,255,0.1)' }
        },
        axisLabel: { color: '#b6b5ab' }
      },
      {
        show: false,
        type: 'value',
        nameTextStyle: { color: '#ccc' },
        axisLabel: { color: '#ccc' },
        splitLine: { show: false },
        axisLine: { show: true },
        axisTick: { show: true }
      }
    ],
    color: ['#e54035'],
    series: [
      {
        name: '次',
        type: 'pictorialBar',
        xAxisIndex: 1,
        barCategoryGap: '-40%',
        symbol: 'path://M150 50 L130 130 L170 130 Z',
        itemStyle: {
          color(params) {
            const colorList = [
              'rgba(13,177,205,0.8)',
              'rgba(29,103,182,0.6)',
              'rgba(13,177,205,0.8)',
              'rgba(29,103,182,0.6)',
              'rgba(13,177,205,0.8)',
              'rgba(29,103,182,0.6)'
            ]
            return colorList[params.dataIndex % colorList.length]
          }
        },
        emphasis: { opacity: 1 },
        data: barData
      },
      {
        symbol: 'circle',
        symbolSize: 12,
        type: 'line',
        yAxisIndex: 1,
        data: lineData,
        itemStyle: {
          color: {
            type: 'linear',
            x: 0,
            y: 0,
            x2: 1,
            y2: 0,
            colorStops: [
              { offset: 0, color: '#821eff' },
              { offset: 1, color: '#204fff' }
            ]
          }
        }
      }
    ]
  }
}

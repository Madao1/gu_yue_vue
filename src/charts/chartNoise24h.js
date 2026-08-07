function formatHour(timestamp) {
  const match = String(timestamp || '').match(/T(\d{2}):(\d{2})/)
  return match ? `${match[1]}:${match[2]}` : '--:--'
}

function normalizeValue(value) {
  if (value === null || value === undefined) {
    return null
  }
  const number = Number(value)
  return Number.isFinite(number) ? number : null
}

export default function getOption(points = []) {
  const normalizedPoints = Array.isArray(points)
    ? points.filter(point => point && typeof point === 'object')
    : []
  const xAxisMonth = normalizedPoints.map(point => formatHour(point.timestamp))
  const xAxisLabelInterval = Math.max(Math.ceil(xAxisMonth.length / 8) - 1, 0)
  const barData = normalizedPoints.map(point => ({
    name: formatHour(point.timestamp),
    value: normalizeValue(point.value)
  }))
  const lineData = barData.map(point => ({ ...point }))

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
        if (!params || params.length === 0) {
          return ''
        }
        const point = params.find(item => {
          return item && item.data && item.data.value !== null && item.data.value !== undefined
        })
        const hour = params[0].axisValue || '--:--'
        if (!point) {
          return `${hour}<br/>暂无数据`
        }
        return `${hour}<br/>噪声：${Number(point.data.value).toFixed(2)} dB`
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
          interval: xAxisLabelInterval,
          hideOverlap: true,
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
        name: 'dB',
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

function formatDay(timestamp) {
  const match = String(timestamp || '').match(/-(\d{2})-(\d{2})T/)
  return match ? `${match[1]}-${match[2]}` : '--'
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
  const xData = normalizedPoints.map(point => formatDay(point.timestamp))
  const data = normalizedPoints.map(point => normalizeValue(point.value))
  const labelInterval = Math.max(Math.ceil(xData.length / 8) - 1, 0)

  return {
    tooltip: {
      trigger: 'axis',
      axisPointer: { type: 'shadow' },
      formatter(params) {
        if (!params || params.length === 0) {
          return ''
        }
        const item = params.find(param => param.value !== null && param.value !== undefined)
        const day = params[0].axisValue || '--'
        if (!item) {
          return `${day}<br/>暂无数据`
        }
        return `${day}<br/>降水量：${Number(item.value).toFixed(2)} mm`
      }
    },
    grid: {
      left: '8%',
      right: '5%',
      top: '10%',
      bottom: '12%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      data: xData,
      axisTick: { show: false },
      axisLine: {
        lineStyle: { color: 'rgba(255,255,255,0.2)' }
      },
      axisLabel: {
        interval: labelInterval,
        hideOverlap: true,
        color: '#b6b5ab',
        fontSize: 10
      }
    },
    yAxis: {
      type: 'value',
      min: 0,
      name: 'mm',
      nameTextStyle: { color: '#b6b5ab', fontSize: 10 },
      axisTick: { show: false },
      axisLine: {
        lineStyle: { color: 'rgba(255,255,255,0.2)' }
      },
      axisLabel: { color: '#b6b5ab', fontSize: 10 },
      splitLine: {
        lineStyle: { color: 'rgba(255,255,255,0.1)' }
      }
    },
    series: [
      {
        name: '降水量',
        type: 'bar',
        barMaxWidth: 16,
        itemStyle: {
          color: '#20b9cf',
          borderRadius: [4, 4, 0, 0]
        },
        data
      }
    ]
  }
}

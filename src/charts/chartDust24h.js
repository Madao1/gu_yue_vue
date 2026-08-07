import * as echarts from 'echarts'

function formatHour(timestamp) {
  const match = String(timestamp || '').match(/T(\d{2}):(\d{2})/)
  return match ? `${match[1]}:${match[2]}` : '--:--'
}

export default function getOption(points = []) {
  const normalizedPoints = Array.isArray(points)
    ? points.filter(point => point && typeof point === 'object')
    : []
  const xData = normalizedPoints.map(point => formatHour(point.timestamp))
  const data = normalizedPoints.map(point => {
    if (point.value === null || point.value === undefined) {
      return null
    }
    const value = Number(point.value)
    return Number.isFinite(value) ? value : null
  })

  return {
    tooltip: {
      trigger: 'axis',
      formatter(params) {
        if (!params || params.length === 0) {
          return ''
        }
        const item = params.find(param => param.value !== null && param.value !== undefined)
        if (!item) {
          return `${params[0].axisValue}<br/>暂无数据`
        }
        return `${item.axisValue}<br/>扬尘：${Number(item.value).toFixed(2)} mg/m³`
      }
    },
    grid: {
      left: '3%',
      right: '5%',
      top: '8%',
      bottom: '8%',
      containLabel: true
    },
    xAxis: {
      type: 'category',
      axisTick: { show: false },
      boundaryGap: false,
      axisLine: {
        lineStyle: {
          color: 'rgba(255,255,255,.1)'
        }
      },
      axisLabel: {
        color: 'rgba(255,255,255,.6)',
        fontSize: 12,
        interval: 2
      },
      data: xData
    },
    yAxis: {
      min: 0,
      type: 'value',
      name: 'mg/m³',
      nameTextStyle: {
        color: 'rgba(255,255,255,.6)',
        fontSize: 11
      },
      axisLabel: {
        color: '#ccc',
        fontSize: 12
      },
      axisLine: {
        lineStyle: {
          color: 'rgba(160,160,160,0.2)'
        }
      },
      splitLine: {
        lineStyle: {
          color: 'rgba(160,160,160,0.2)'
        }
      }
    },
    series: [
      {
        name: '扬尘',
        type: 'line',
        lineStyle: {
          color: '#72b0f9'
        },
        itemStyle: {
          color: '#72b0f9'
        },
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 0.8, [
            { offset: 0, color: 'rgba(129,197,255,.6)' },
            { offset: 1, color: 'rgba(129,197,255,.0)' }
          ])
        },
        smooth: true,
        connectNulls: false,
        data
      }
    ]
  }
}

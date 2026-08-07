import * as echarts from 'echarts'

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
  const xData = normalizedPoints.map(point => formatHour(point.timestamp))
  const data = normalizedPoints.map(point => normalizeValue(point.value))

  return {
    tooltip: {
      show: true,
      trigger: 'item',
      backgroundColor: 'rgba(0,0,0,0.4)',
      padding: [8, 10],
      formatter(params) {
        if (!params || params.value === null || params.value === undefined) {
          return `${params && params.name ? params.name : '--:--'}<br/>暂无数据`
        }
        return `${params.name}：${Number(params.value).toFixed(2)} ℃`
      }
    },
    grid: {
      borderWidth: 0,
      top: 20,
      bottom: 35,
      left: 40,
      right: 10,
      textStyle: {
        color: '#fff'
      }
    },
    xAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        axisLine: {
          show: true,
          lineStyle: {
            color: 'rgba(255,255,255,0.2)'
          }
        },
        axisLabel: {
          inside: false,
          textStyle: {
            color: '#bac0c0',
            fontWeight: 'normal',
            fontSize: 10
          }
        },
        data: xData
      },
      {
        type: 'category',
        axisLine: { show: false },
        axisTick: { show: false },
        axisLabel: { show: false },
        splitArea: { show: false },
        splitLine: { show: false },
        data: xData
      }
    ],
    yAxis: {
      min: 10,
      type: 'value',
      axisTick: { show: false },
      axisLine: {
        show: true,
        lineStyle: {
          color: 'rgba(255,255,255,0.2)'
        }
      },
      splitLine: {
        show: true,
        lineStyle: {
          color: 'rgba(255,255,255,0.1)'
        }
      },
      axisLabel: {
        textStyle: {
          color: '#bac0c0',
          fontWeight: 'normal',
          fontSize: 12
        },
        formatter: '{value}'
      }
    },
    series: [
      {
        type: 'bar',
        itemStyle: {
          show: true,
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            { offset: 0, color: '#00c0e9' },
            { offset: 1, color: '#3b73cf' }
          ]),
          borderRadius: 50,
          borderWidth: 0
        },
        emphasis: {
          shadowBlur: 15,
          shadowColor: 'rgba(105,123,214,0.7)'
        },
        zlevel: 2,
        barWidth: '20%',
        data
      }
    ]
  }
}

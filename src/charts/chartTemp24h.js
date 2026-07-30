import * as echarts from 'echarts'

export default function getOption() {
  const xData = ['0', '2', '4', '6', '8', '10', '12', '14', '16', '18', '20', '22']
  const data = [25, 24, 23, 24, 26, 30, 32, 31, 33, 30, 28, 26]

  return {
    tooltip: {
      show: true,
      trigger: 'item',
      backgroundColor: 'rgba(0,0,0,0.4)',
      padding: [8, 10],
      formatter(params) {
        if (params.seriesName !== '') {
          return params.name + ' ：  ' + params.value + ' 度'
        }
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
      },
      {
        name: '',
        type: 'bar',
        xAxisIndex: 1,
        zlevel: 1,
        itemStyle: {
          color: 'transparent',
          borderWidth: 0,
          shadowBlur: 10,
          shadowColor: 'rgba(255,255,255,0.31)',
          shadowOffsetX: 0,
          shadowOffsetY: 2
        },
        barWidth: '20%',
        data: [30, 30, 30, 30, 30]
      }
    ]
  }
}

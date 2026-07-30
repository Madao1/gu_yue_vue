import * as echarts from 'echarts'

export default function getOption() {
  return {
    tooltip: {
      trigger: 'axis'
    },
    grid: {
      left: '3%',
      right: '5%',
      top: '8%',
      bottom: '5%',
      containLabel: true
    },
    color: ['#a4d8cc', '#25f3e6'],
    xAxis: [
      {
        type: 'category',
        axisTick: { show: false },
        boundaryGap: false,
        axisLabel: {
          textStyle: {
            color: 'rgba(255,255,255,.6)',
            fontSize: 12
          },
          lineStyle: {
            color: 'rgba(255,255,255,.1)'
          },
          interval: 0,
          formatter(params) {
            return params.length > 4 ? params.substring(0, 4) + '...' : params
          }
        },
        data: [
          '0', '1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14', '15', '16', '17', '18', '19', '20',
          '21', '22', '23', '24', '25', '26', '27', '28', '29', '30', '31'
        ]
      }
    ],
    yAxis: {
      min: 0,
      type: 'value',
      axisLabel: {
        textStyle: {
          color: '#ccc',
          fontSize: 12
        }
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
        lineStyle: {
          color: '#72b0f9'
        },
        type: 'line',
        areaStyle: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 0.8, [
            { offset: 0, color: 'rgba(129,197,255,.6)' },
            { offset: 1, color: 'rgba(129,197,255,.0)' }
          ])
        },
        smooth: true,
        data: [25, 26, 23, 20, 15, 16, 25, 23, 24, 20, 15, 16, 25, 26, 23, 20, 15, 16, 25, 23, 24, 20, 15, 16, 25]
      }
    ]
  }
}

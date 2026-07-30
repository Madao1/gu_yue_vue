export default function getOption() {
  const data = []
  for (let i = 1; i <= 31; i++) {
    const v = [130, 120, 180, 110, 100, 180, 200, 210, 170, 100, 110, 130, 120, 180, 110, 100, 180, 200, 210, 170, 100, 110, 130, 180, 110, 100, 180, 200, 210, 170, 100][i - 1]
    data.push({ value: v, name: i + '日' })
  }
  return {
    tooltip: {
      trigger: 'item',
      formatter: '{b}: <br/>  {c} ({d}%)'
    },
    calculable: true,
    series: [
      {
        name: '比例',
        type: 'pie',
        color: ['#33b565', '#20cc98', '#20b9cf', '#2089cf', '#205bcf'],
        radius: [20, 70],
        center: ['50%', '50%'],
        roseType: 'area',
        data
      }
    ]
  }
}

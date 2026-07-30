<template>
  <div class="data-title">
    <div class="timeti">{{ nowTime }}</div>
    <div class="title-center">正远智慧绿色工地管控系统</div>
    <div class="pdfmc">
      <img src="/icons/blue.png" alt="" />220kV古苑变建筑工程
    </div>
    <div class="gkgwd">
      大屏幕温度：<img src="/images/wd.png" height="24" alt="" />25 °
    </div>
  </div>
</template>

<script>
export default {
  name: 'LayoutHeader',
  data() {
    return {
      nowTime: '',
      timer: null
    }
  },
  mounted() {
    this.getTime()
    this.timer = setInterval(this.getTime, 1000)
  },
  beforeDestroy() {
    clearInterval(this.timer)
  },
  methods: {
    getTime() {
      const d = new Date()
      const week = ['星期日', '星期一', '星期二', '星期三', '星期四', '星期五', '星期六']
      this.nowTime =
        d.getFullYear() +
        '-' +
        this.fillZero(d.getMonth() + 1) +
        '-' +
        this.fillZero(d.getDate()) +
        '  ' +
        this.fillZero(d.getHours()) +
        ':' +
        this.fillZero(d.getMinutes()) +
        ':' +
        this.fillZero(d.getSeconds()) +
        '  ' +
        week[d.getDay()] +
        '  '
    },
    fillZero(n) {
      return n < 10 ? '0' + n : n
    }
  }
}
</script>

<template>
  <div class="map-num">
    <p>安全运行（天）</p>
    <div class="num">
      <span v-for="(n, i) in digits" :key="i">{{ n }}</span>
    </div>
    <div class="afxt">
      <p>施工： 2 天----竣工倒计时：600天</p>
    </div>
  </div>
</template>

<script>
export default {
  name: 'SafetyDays',
  data() {
    return {
      days: 0
    }
  },
  computed: {
    digits() {
      return String(this.days).padStart(4, '0').split('')
    }
  }
}
</script>

<style scoped>
.map-num {
  width: 500px;
  height: 120px;
  position: absolute;
  top: 15px;
  left: 50px;
  z-index: 100;
}
.map-num > p {
  font-size: 20px;
  font-weight: 600;
  color: #fff;
}
.num span {
  display: inline-block;
  width: 50px;
  height: 65px;
  text-align: center;
  line-height: 65px;
  background: rgba(0, 35, 120, .56);
  border: 1px solid rgba(255, 255, 255, .2);
  border-radius: 5px;
  color: #fff;
  font-size: 60px;
  font-weight: 600;
  font-family: LcdD;
  margin-top: 15px;
}
.afxt {
  width: 400px;
  height: 80px;
  position: absolute;
  top: 50px;
  left: 400px;
  z-index: 2;
}
.afxt p {
  font-size: 24px;
  font-weight: 600;
  color: #fff;
}
</style>

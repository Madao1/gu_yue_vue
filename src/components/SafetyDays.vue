<template>
  <div class="map-num">
    <div class="days-stat">
      <p>安全运行（天）</p>
      <div class="num">
        <span v-for="(n, i) in digits" :key="i">{{ n }}</span>
      </div>
    </div>
    <div class="afxt">
      <p>施工：2 天</p>
      <p>竣工倒计时：600 天</p>
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
  width: 100%;
  height: 80px;
  position: absolute;
  top: 15px;
  left: 0;
  z-index: 100;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: clamp(16px, 2vw, 48px);
  padding: 0 20px;
  box-sizing: border-box;
}
.days-stat {
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
}
.days-stat > p {
  font-size: 20px;
  font-weight: 600;
  color: #fff;
  white-space: nowrap;
}
.num {
  display: flex;
  gap: 4px;
}
.num span {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  width: 42px;
  height: 58px;
  line-height: 1;
  background: rgba(0, 35, 120, .56);
  border: 1px solid rgba(255, 255, 255, .2);
  border-radius: 5px;
  color: #fff;
  font-size: 52px;
  font-weight: 600;
  font-family: LcdD;
}
.map-num .afxt {
  width: auto;
  height: auto;
  position: static;
  z-index: auto;
  display: flex;
  align-items: center;
  gap: 24px;
  flex-wrap: wrap;
}
.afxt p {
  margin: 0;
  font-size: 18px;
  font-weight: 600;
  color: #fff;
  white-space: nowrap;
}
</style>

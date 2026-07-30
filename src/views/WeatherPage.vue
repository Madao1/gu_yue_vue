<template>
  <div class="weather-page">
    <WeatherCalendar />
  </div>
</template>

<script>
import WeatherCalendar from '@/components/WeatherCalendar.vue'

export default {
  name: 'WeatherPage',
  components: {
    WeatherCalendar
  }
}
</script>

<style scoped>
.weather-page {
  width: 100%;
  height: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #11244a;
}
</style>

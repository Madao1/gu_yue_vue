import Vue from 'vue'
import VueRouter from 'vue-router'
import Dashboard from '@/views/Dashboard.vue'
import WeatherPage from '@/views/WeatherPage.vue'
import DetailModal from '@/views/DetailModal.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Dashboard',
    component: Dashboard
  },
  {
    path: '/weather',
    name: 'Weather',
    component: WeatherPage
  },
  {
    path: '/detail/:type',
    name: 'Detail',
    component: DetailModal,
    props: true
  }
]

const router = new VueRouter({
  mode: 'history',
  base: import.meta.env.BASE_URL,
  routes
})

export default router

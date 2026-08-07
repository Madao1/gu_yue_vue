import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const Dashboard = () => import('@/views/Dashboard.vue')
const WeatherPage = () => import('@/views/WeatherPage.vue')
const DetailModal = () => import('@/views/DetailModal.vue')

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

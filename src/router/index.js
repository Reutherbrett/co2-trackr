import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Tracker from '../views/Tracker.vue'
import About from '../views/About.vue'

const routes = [
  { path: '/', component: Home },         // Start
  { path: '/tracker', component: Tracker },
  { path: '/about', component: About }
]

export default createRouter({
  history: createWebHistory(),
  routes
})
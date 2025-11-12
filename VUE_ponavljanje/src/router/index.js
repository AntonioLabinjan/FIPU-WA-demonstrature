import { createRouter, createWebHistory } from 'vue-router'
import JournalPage from '../components/JournalPage.vue'
import About from '../views/AboutView.vue'

const routes = [
  { path: '/', component: JournalPage },
  { path: '/about', component: About }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router

import { createRouter, createWebHistory } from 'vue-router'
import ListView from '../views/ListView.vue';
import ActionView from '../views/ActionView.vue';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'List',
      component: ListView
    },
    {
      path: '/Saved',
      name: 'SavedList',
      component: ActionView
    }
  ]
})

export default router

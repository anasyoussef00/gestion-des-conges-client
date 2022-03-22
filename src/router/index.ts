import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router'
import AddVacationForm from '@/views/AddVacationForm.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Add Vacation',
    component: AddVacationForm
  },
  {
    path: '/edit-vacation',
    name: 'Edit Vacation',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/EditVacationForm.vue')
  },
  {
    path: '/delete-vacation',
    name: 'Delete Vacation',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/DeleteVacationForm.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router

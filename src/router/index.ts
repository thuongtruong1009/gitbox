import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  // {
  //   path: '/:user',
  //   name: 'Home',
  //   component: Home
  // },
  {
    path: '/about',
    name: 'About',
    component: () => import(/* webpackChunkName: "about" */ '../views/About.vue')
  },
  {
    path: '/repositories',
    name: 'Repository',
    component: () => import(/* webpackChunkName: "about" */ '../views/Repositories.vue')
  },
  {
    path: '/users',
    name: 'Users',
    component: () => import(/* webpackChunkName: "about" */ '../views/Users.vue')
  },
  {
    path: '/explore',
    name: 'Explore',
    component: () => import(/* webpackChunkName: "about" */ '../layouts/LExplore.vue'),
    children: [
      {
        path: 'repositories',
        component: () => import(/* webpackChunkName: "about" */ '../views/explore/repositories.vue'),
      },
      {
        path: 'users',
        component: () => import(/* webpackChunkName: "about" */ '../views/explore/users.vue'),
      },
      {
        path: 'issues',
        component: () => import(/* webpackChunkName: "about" */ '../views/explore/issues.vue'),
      },
    ],
  }
]

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
})
export default router
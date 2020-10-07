import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/category',
    name: 'Category',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/Category.vue')
  },
  {
    path: '/tag',
    name: 'Tag',
    component: () => import(/* webpackChunkName: "about" */ '../views/Tag.vue')
  },
  {
    path: '/file',
    name: 'File',
    component: () => import(/* webpackChunkName: "about" */ '../views/File.vue')
  },
  {
    path: '/edit',
    name: '/Edit',
    component: () => import(/* webpackChunkName: "about" */ '../views/Edit.vue')
  },
  {
    path: '/profile',
    name: 'Profile',
    component: () => import(/* webpackChunkName: "about" */ '../views/Profile.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "about" */ '../views/Login.vue')
  }
]

const router = new VueRouter({
  routes
})
// //全局前置守卫  评论时需要登录 
// router.beforeEach((to,from,next) => {
//   if(!to.meta.isPublic && !localStorage.token) {
//     window.console.log('need login');
//     return next('/login')
//   }
//   next()
// });

export default router

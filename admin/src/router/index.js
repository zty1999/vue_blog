import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

  const routes = [
    // {
    //   path: '/',
    //   redirect: '/welcome'
    // },
  {
    path: '/',
    name: 'Main',   
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/Main.vue'),
    redirect: '/welcome',
    children:[
      {
        path: '/welcome', 
        name: 'Welcome',   
        component: () => import('@/views/Welcome.vue')
      },
      {
        path: '/user/list', 
        name: 'UserList',   
        
        component: () => import('@/views/user/UserList.vue')
      },
      {
        path: '/articles/list', 
        name: 'ArticleList',   
        component: () => import('@/views/article/ArticleList.vue')
      },
      {
        path: '/articles/edit', 
        name: 'ArticleEdit',   
        component: () => import('@/views/article/ArticleEdit.vue')
      },
      
    ]
  },
  {
    path: '/login',
    name: 'Login',
    meta: {isPublic: true},
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '@/views/Login.vue')
  }
]



const router = new VueRouter({
  mode: 'history',
  // base: process.env.BASE_URL,
  routes 
})

 //全局前置守卫  
 router.beforeEach((to,from,next) => {
  if(!to.meta.isPublic && !sessionStorage.token) {
    window.console.log('need login');
    return next('/login')
  }
  next()
});

export default router

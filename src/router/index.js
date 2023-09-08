import { createRouter, createWebHistory } from 'vue-router'
import Forum from '../views/Forum.vue'
import store from '@/store/index.js'
const routes = [
  {
    path: '/forum',
    name: 'Forum',
    component: Forum
  },
  {
    path: '/login',
    name: 'Login',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue')
  },
  {
    path: '/register',
    name: 'Register',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "login" */ '../views/Register.vue')
  },
  {
    path: '/',
    name: 'QuestionList',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "QuestionList" */ '../views/QuestionList.vue')
  },
  {
    path: '/questiondetail',
    name: 'QuestionDetail',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "QuestionList" */ '../components/Question/QuestionDetail.vue')
  },
  {
    path: '/questionforum',
    name: 'QuestionForum',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "QuestionList" */ '../components/Question/QuestionForum.vue')
  },
  {
    path: '/addquestion',
    name: 'AddQuestion',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "QuestionList" */ '../components/Question/AddQuestion.vue')
  },
  {
    path: '/forumdetail',
    name: 'ForumDetail',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "QuestionList" */ '../components/ForumDe/ForumDetail.vue')
  },
  {
    path: '/publishforum',
    name: 'PublishForum',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "QuestionList" */ '../components/ForumDe/PublishForum.vue')
  },
  {
    path: '/infoUser',
    name: 'InfoUser',
    beforeEnter:(to,from,next)=>{
      if(store.state.isLogin){
        next()
      }else{
        next('/login')
      }
    },
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "infoUser" */ '../views/InfoUser.vue')
  }
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})
router.beforeEach((to,from)=>{
  if(to.path=='/login'){
    store.state.isFooterMusic=false
  }else{
    store.state.isFooterMusic=true
  }
})
export default router

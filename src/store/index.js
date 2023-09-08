import {
  createStore
} from 'vuex'
import { setItem, getItem } from '@/utils/storage.js'

export default createStore({
  state: {
    playList: [{ //列表
      id:999,
      title:"最小二叉树"
    }],
    playListIndex: 0, //默认下标为0
    isLogin:getItem('islogin') || false,//判断是否登录
    isSign:false,//判断是否签到
    isFooterMusic:true,//判断底部组件是否需要显示
    token:getItem('token') || {},
    user: getItem('user') || {
      name:"战斗暴龙神1",
      identity:"student",//adminstrator
      level:134,
      number:0,
      sex:"男",
      email:"123456@qq.com",
      age:"18",
      pwd:"nbkls",
      introduce:"我是一名Java程序员,喜欢编程和打篮球。"
    },//用户信息
  },
  mutations: {
    updateIsbtnShow: function (state, value) {
      state.isbtnShow = value
    },
    updateIsLogin:function(state,value){
      state.isLogin=value
      setItem('islogin', value)
    },
    updateIsSign:function(state,value){
      state.isSign=true
    },
    updatelevel:function(state,value){
      state.user.level=Number(state.user.level)+value
      console.log(state.user.level,value)
    },
    updateToken:function(state,value){
      state.token=value
      console.log("更改后的token",state.token)
      setItem('token', value)
      //localStorage.setItem('token',state.token)
    },
    updateUser:function(state,obj){
      console.log("用户信息",obj)
      state.user.name=obj.name
      state.user.email=obj.id
      state.user.sex=obj.sex
      state.user.level=obj.exp
      state.user.age=obj.birthday
      state.user.number=obj.number
      setItem('user', state.user)
    }
  },
  actions: {
    getLyric: async function (context, value) {
      let res = await getMusicLyric(value)
      console.log(res);
      context.commit("updateLyricList",res.data.lrc)
    },
    getLogin:async function(context,value){
      let res=await getPhoneLogin(value);
      // console.log(res);
      return res
    }
  },
  modules: {}
})
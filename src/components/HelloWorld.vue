<template>
      <nav class="navbar bg-dark-subtle">
      <div>               
        <label style="background-color: aqua;" 
          @click="$router.go(-1)" class="btn btn-outline-primary" for="btnradio3">上一页</label>   
          <router-link :to="{path:'/'}">
            <label class="btn btn-outline-primary" for="btnradio1">题库</label>
          </router-link>

          <router-link :to="{path:'/forum'}">
            <label class="btn btn-outline-primary" for="btnradio2">论坛</label>
          </router-link>

          <router-link :to="{path:'/InfoUser'}">
            <label class="btn btn-outline-primary" for="btnradio3">我的</label>
          </router-link>
          
          <router-link :to="{path:'/InfoUser'}">
            <label v-show="!$store.state.isLogin" class="btn btn-danger" for="btnradio4">请先登录以便使用更多功能</label>
          </router-link>
          
          
      </div>
      </nav>
   
</template> 
<script> 
import {
  getProblems
} from "@/request/api/home.js"

export default { 
  data() { 
    return { email: '', password: '' } 
  },
  methods: { 
  // 处理登录请求 
    hh(){
      let res = getProblems();
      console.log(res);
      console.log("999")
    },
    kk(){
      
      let res = getMusicList()
      console.log(res);
      console.log("kk")
    }
  }
} 
</script> 
<style lang="less" scoped>
label{
  margin-left: 15px;
}
</style>
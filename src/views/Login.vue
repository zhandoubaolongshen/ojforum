<template>
  <div class="login">
        <h1>登陆页面</h1>
        <form>
            <label for="username">邮箱</label>
            <input type="text" id="username" name="username" v-model="username" placeholder="请输入邮箱">
            <br>
            <label for="password">密码</label>
            <input type="password" id="password" name="password" v-model="password" placeholder="请输入密码">
            <br>
            <button type="button"  @click="Login">登陆</button>
        </form>
        <p v-show="showp" @click="$router.push({ path: '/'})">用户名或密码错误</p>
        <p class="p1" @click="$router.push({ path: '/register'})">立即注册</p>
    </div>
</template>
<script>
import { mapState } from "vuex";
import store from '../store/index'; 
import {
 postlogin,getLoginUser
} from "@/request/api/home.js"
export default {
  data() {
    return {
      username:'',
      password:'',
      showp:false
      
    };
  },
  computed: {
    ...mapState(["user", "isLogin","token"]),
  },
  methods:{
      Login:async function(){
        let res22=postlogin(this.username,this.password)
        console.log("-------------",store.state.token)
        res22.then(response => {
        console.log(res22)
        console.log(response.data.message)
        if(response.data.message=='操作成功'){
          console.log(response.data.data.token)
          this.$store.commit('updateToken',response.data.data.token)
          console.log("****",store.state.token)

          let logres=getLoginUser(store.state.token)
          console.log("*logres*",logres)
          logres.then(response1 => {
            console.log("*logres*",response1.data.data)
            this.$store.commit('updateUser',response1.data.data)
          })
          this.$store.commit('updateIsLogin',true)
          this.$router.push('/infoUser')
          
        }
        else{
          this.showp=true
        }
        
        //
        
        }).catch(error => {
        console.log(error);
        });
        //this.$store.commit('updateIsLogin',true)
        //this.$store.commit('updateUser',{name:this.phone,pwd:this.password})
        
        }
  }
};
</script>
<style lang="less" scoped>
.p1{
  float: right;
  color: red;
}

body {
            background: #eee;
        }
        
        .login {
            margin: 10% auto;
            width: 400px;
            height: 400px;
            background: white;
            border-radius: 5px;
            box-shadow: 0 0 10px #999;
            padding: 30px;
            box-sizing: border-box;
            text-align: center;
            font-family: Arial, "Helvetica Neue", Helvetica, sans-serif;
        }
        
        h1 {
            font-size: 30px;
            color: #666;
            margin-bottom: 20px;
        }
        
        input[type=text], input[type=password] {
            width: 100%;
            padding: 12px 20px;
            margin: 8px 0;
            display: inline-block;
            border: 1px solid #ccc;
            box-sizing: border-box;
            border-radius: 4px;
        }
        
        button {
            background-color: #4CAF50; /* Green */
            border: none;
            color: white;
            padding: 10px 24px;
            text-align: center;
            text-decoration: none;
            display: inline-block;
            font-size: 16px;
            margin: 4px 2px;
            margin-top: 20px;
            cursor: pointer;
            border-radius: 4px;
        }
        
        button:hover {
            background-color: #45a049;
        }
        
        p {
            margin-top: 20px;
            font-size: 14px;
            color: #666;
        }
        
        a {
            color: #0080ff;
        }
</style>
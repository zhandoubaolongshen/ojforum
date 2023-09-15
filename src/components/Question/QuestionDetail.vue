<template>
    <div>


    <!-- 题目部分 -->
    <div class="container-md mt-3">
      <h1 class="mb-3">{{queobj.id}}.{{queobj.title}}</h1>
      <button class="btn btn-outline-primary" @click="$router.push({ path: '/publishforum',
    query: {  QuestionId1: JSON.stringify(queobj.id)}
    })"> 发表讨论</button>

      <button class="btn btn-outline-secondary" @click="$router.push({ path: '/questionforum',
          query: {  QuestionId1: JSON.stringify(queobj.id)}
          })"> 讨论区</button>
      <br>
      <p>{{ queobj.description }}</p>
      <p><strong>示例：</strong></p>
      <pre>输入:nums = [2,7,11,15], target = 9
输出：[0,1]
解释：因为 nums[0] + nums[1] == 9,所以返回 [0, 1] 。</pre>
      <p><strong>题目要求：</strong></p>
      <ul>
        <li>请你提交完整的函数代码。</li>
        <li>nums 数组中的数据数量不超过 1000,-10^9 小于等于 nums[i] 小于等于 10^9。</li>
        <li>target 的范围为 [-10^9, 10^9]。</li>
      </ul>
    </div>

    <!-- 代码部分 -->
    <div class="container-md mt-2">
      <h2>编写解题代码</h2>
      <p>请在下方输入 C++ 代码：</p>
      <textarea 
      v-model="text"
      id="editor" class="form-control mb-3" rows="10"></textarea>
      <button class="btn btn-primary" @click="runCode()">运行代码</button>
      <h2 >运行结果:{{ result.message }}</h2>
      <h2>运行状态:{{ result.status}}</h2>
      
    </div>

    </div>
  </template>
 
  <script>
  
  import { mapState } from "vuex";
  import {
   getProblems,postProblem,postcode
} from "@/request/api/home.js"
  export default {
    data(){
      return{
        queobj:{},
        text:'',
        result:''
      }
    },
    methods:{
      runCode(){
        if(!this.$store.state.isLogin){
          //console.log("未登录")
          alert("登录后才可以提交代码！")
          return 0;
        }
        var res22=postcode(this.text,this.queobj.id)
        console.log("发送",)
        res22.then(response => {
        let message = response.data.data.status;
        this.result=response.data.data
        console.log("返回结果",response.data.data)
        if(this.result.message=='Accept'){
          console.log("成功")
          this.result.status=message.split("\n")[0]+"---"+message.split("\n")[1]
        }else if(this.result.message=='Wrong answer'){
          console.log("失败")
          this.result.status="答案错误"
        }else{
          this.result.status="运行报错"
        }
        
        console.log("状态",this.result.status)
        }).catch(error => {
        console.log(error);
        });
      }
    },
    mounted() {
    const obj = JSON.parse(this.$route.query.QuestionId);
    this.queobj=obj
    console.log("从其它组件传递过来的参数：",this.queobj);
  }
  };
  </script>
  <style lang="less" scoped>
  
  </style>
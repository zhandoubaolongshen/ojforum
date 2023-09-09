<template>
	<div>
	  <div class="post">
      <div class="post-content">
			<div class="post-title">{{ forumauthor.title }}</div>
		  <div class="post-author">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-yonghu"></use>
            </svg>
        作者：{{ forumauthor.author }}&nbsp;&nbsp;&nbsp;
        
      </div>
		  <div class="post-text">{{ forumauthor.content }}</div>
      <hr>
		  <div class="post-info">
			<div class="post-likes">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-dianzan"></use>
            </svg>
        {{ forumauthor.likes }}</div>
			<div class="post-comments">
        <button class="bt1" @click="show=true">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-xiezi"></use>
            </svg>
        回复讨论</button>
      </div>
		  </div>
		</div>
    </div>

    <div class="post">共{{forumauthor.comments}}个回复
      <svg class="icon"  @click="cut()" style="float: right; cursor: pointer;" aria-hidden="true">
            <use xlink:href="#icon-qiehuan"></use>
            </svg>
            <p style="float: right;">最早/新</p>
    </div>


	  <div v-for="post in posts" 
	   :key="post.id" 
	    
	   class="post">
		<div class="post-content">
		  <div class="post-author">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-yonghu1"></use>
            </svg>
        {{ post.uid }}
        &nbsp;&nbsp;&nbsp;
        
      </div>
		  <div class="post-text">{{ post.content }}</div>
      <hr>
		  <div class="post-info">
			<div class="post-likes">
        <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-dianzan"></use>
            </svg>
        {{ post.likes }}</div>
			
		  </div>
		</div>
	  </div>
    <div class="reply" v-show="show">
      <div style="padding-top: 10px;">
          <button @click="show=false">取消</button>
          <button @click="reply()" class="bt1" style="float: right;">回复讨论</button>
          <hr>
          <textarea v-model="text" 
          placeholder="请输入想要回复的内容"
          style="width: 80%;height: 200px;margin-left: 80px;"
          ></textarea>
      </div>
    </div>
	</div>
  </template>
  
  <style lang="less" scoped>
  .reply{
    position: fixed;
    bottom: 0;
    width: 80%;
    margin-left: 10%;
    border-radius: 2%;
    height: 35vh;  /* 占据屏幕下半部分的高度 */
    background-color: rgb(217, 240, 248);
    box-shadow: 2px 2px 5px #888888;
  }
  .icon{
      width: 1.5rem;
      height: 1.5rem;
  }
  .title {
	font-size: 24px;
	text-align: center;
	margin-bottom: 20px;
  }
  .bt1{
    color: rgb(255, 255, 255);
        background-color: rgb(82, 174, 62);
        width: 120px;
        height: 40px;
        border-radius: 25%;
        font-family: 宋体;
        font-weight: bold;
  }
  .post {
	background-color: #f7f7f7;
	border-radius: 5px;
	padding: 15px;
	margin-bottom: 10px;
	box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
	width: 60%;
	margin-left: 15%;
  }
  
  .post-content {
	display: flex;
	flex-direction: column;
  }
  
  .post-author {
	font-size: 14px;
	margin-bottom: 5px;
  }
  .post-title {
	font-size: 22px;
	font-weight: bold;
	margin-bottom: 5px;
  }
  
  .post-text {
	margin-bottom: 10px;
  }
  
  .post-info {
	display: flex;
	justify-content: space-between;
	font-size: 14px;
	color: #888;
  }
  </style>
  
  <script>
  import {
 getcomment,postcomment
} from "@/request/api/home.js"
import store from '@/store/index';
  export default {
  data() {
    return {
      posts: [
        
        // 该帖子下的评论
      ],
      forumauthor:{
        title:'交流｜现在真的有用C写算法的吗？',
        author:'烟霞向月沉',
        content:'夏令营机试强制用C，翻开两年没动的C语言书开始重新学C。感觉C写算法对我这种菜鸡太不友好了，很多东西都要自己写。感觉用C++/Python我都可以接受，用C写个哈希表写半天，太痛苦了...... o(╥﹏╥)o',
        likes:4,
        comments:6,
        grade:10
      },
      text:'',
      show:false,
      forumid:'',
      forumuid:''
    }
  },
  methods:{
    reply(){
      if(!this.$store.state.isLogin){
          //console.log("未登录")
          alert("登录后才可以使用此功能！")
          return 0;
        }
      this.show=false
      console.log(this.text,this.forumid)
      let res1=postcomment(this.text,this.forumid,store.state.user.name)
        console.log(res1)

        

        res1.then(response => {
        const message = response.data.message;
        if (message === '操作成功') {
            // 弹出添加成功的弹窗
            alert('添加成功');
        }
        }).catch(error => {
        console.log(error);
        });
      
        this.text=''
        
    },
    cut(){
      this.posts=this.posts.slice().reverse()
    }
  },
  updated(){
    let res=getcomment(this.forumid)
        console.log(res)
        res.then(response => {
        const data = response.data.data;
        console.log("-----",data.length)
        if (data.length==0){
            console.log("********")
            this.tishi=true
        }
        this.posts=data
        console.log(data)
        }).catch(error => {
        console.log(error);
        });
  },
    mounted() {
    this.forumid = this.$route.query.ForumId
    this.forumauthor.author= this.$route.query.Forumuid
    this.forumauthor.content = this.$route.query.Forumdescription
    this.forumauthor.title = this.$route.query.Forumtitle
    this.forumauthor.comments= this.$route.query.Forumcommentnum
    
    console.log("**从其它组件传递过来的参数：",this.forumauthor);

    let res=getcomment(this.forumid)
        console.log(res)
        res.then(response => {
        const data = response.data.data;
        console.log("-----",data.length)
        if (data.length==0){
            console.log("********")
            this.tishi=true
        }
        this.posts=data
        console.log(data)
        }).catch(error => {
        console.log(error);
        });
  }
}
  </script>
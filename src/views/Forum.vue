<template>
	<div>
	  <h1 class="title">论坛首页</h1>
    <p v-show="!$store.state.isLogin" >登录后可查看帖子</p>
    <button v-show="buttonshow" @click="ownforum()">查看我的帖子</button>
    <button v-show="!buttonshow" @click="allforum()">查看所有帖子</button>
	  <div v-for="post in posts" 
	   :key="post.id" 
	   @click="$router.push({ path: '/forumDetail',
	query: {  ForumId: post.id,
      Forumuid:post.uid ,
      Forumcommentnum:post.commentNum  ,
      Forumdescription: post.description,
      Forumtitle:post.title
    }
	})"  
	   class="post">
		<div class="post-content">
      <div class="hang">
        <div class="post-title">{{ post.title }}</div>
        <button v-show="!buttonshow" @click.stop="delforum(post.id)">删除</button>
      </div>
			
		  <div class="post-author">作者：{{ post.uid }}</div>
		  <div class="post-text">{{ post.description }}</div>
		  <div class="post-info">
			<div class="post-likes">
				<svg class="icon" aria-hidden="true">
					<use xlink:href="#icon-dianzan"></use>
				</svg>
				{{ post.likes }}</div>
			<div class="post-comments">
				<svg class="icon" aria-hidden="true">
					<use xlink:href="#icon-pinglun"></use>
				</svg>
				<p style="display: inline;font-size: 20px;">{{ post.commentNum }}</p></div>
		  </div>
		</div>
	  </div>
	</div>
  <div v-show="tishi" style="margin-top: 200px;margin-left: 50px;">
        <h2>目前还没发布过帖子,在题目中的讨论区发布讨论吧！</h2>
      </div>
  </template>
  
  <script>
  import {
 getProblems,getAllforum,getownforum,deleteforum
} from "@/request/api/home.js"
import { all } from 'axios'
  export default {
  data() {
    return {
      posts: [
       
      ],
      buttonshow:false,
      tishi:false
    }
  },
  methods:{
    ownforum(){
      let res=getownforum(this.$store.state.user.name)
        console.log("获得个人帖子")
        res.then(response => {
        const data = response.data.data;
        if (data.length==0){
            this.tishi=true
        }
        this.posts=data
        console.log(data)
        }).catch(error => {
        console.log(error);
        });
        this.buttonshow=false
    },
    allforum(){
      let res=getAllforum()
        console.log(res)
        res.then(response => {
        const data = response.data.data;
        if (data.length==0){
            this.tishi=true
        }
        this.posts=data
        console.log(data)
        }).catch(error => {
        console.log(error);
        });
        this.buttonshow=true
    },
    delforum(fid){
      console.log("删除")
      deleteforum(fid,this.$store.state.user.name).then(()=>{
        this.ownforum()
      })

      //deleteforum(fid)
      // setTimeout(()=>{
      //   this.ownforum()
      // }, 1000 )
      
    }
  },
  mounted() {
    console.log(this.$store.state)
    this.allforum()
  }
}
  </script>

  <style lang="less" scoped>
  button{
    margin-left: 15%;
    margin-bottom: 20px;
  }
  .hang{
    display: flex;
    justify-content: space-between;
  }
  .title {
	font-size: 3rem;
	text-align: center;
	margin-bottom: 20px;
  margin-top:2%;
  }
  .icon{
      width: 2rem;
      height: 2rem;
  }
  .post {
	background-color: #f7f7f7;
	border-radius: 5px;
	padding: 15px;
	margin-bottom: 10px;
	box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.2);
	width: 60%;
	margin-left: 15%;
	cursor: pointer;
  }
  
  .post-content {
	display: flex;
	flex-direction: column;
  }
  
  .post-author {
	font-size: 13px;
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
  
 
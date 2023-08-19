<template>
	<div>
	  <h1 class="title">论坛首页</h1>
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
			<div class="post-title">{{ post.title }}</div>
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
  </template>
  
  <style lang="less" scoped>
  .title {
	font-size: 24px;
	text-align: center;
	margin-bottom: 20px;
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
  
  <script>
  import {
 getProblems,getAllforum
} from "@/request/api/home.js"
  export default {
  data() {
    return {
      posts: [
       
      ],
    }
  },
  mounted() {
    
    let res=getAllforum()
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
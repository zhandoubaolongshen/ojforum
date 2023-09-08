<template>
    <div class="bigger">
      
      <header>
        <h1>个人信息</h1>
      </header>
      <button style="background-color: red;float: right;" @click="LoginOut">退出登录</button>
      <div class="container">
        <h2>基本资料</h2>
        <p> 是否登陆{{ isLogin }}，是否签到{{ isSign }}  </p>

      
        <div class="info-card">
          <div class="left1">
            <h3>{{ user.name }}</h3>
            <div><span class="label">等级:</span> <svg class="icon"
              style="width: 1.5rem;
              height: 1.5rem;"
              aria-hidden="true">
            <use xlink:href="#icon-dengji"></use>
            </svg>{{ lel}}
              <div style="display: inline-block;padding-bottom: 10px;padding-left: 10px;">
                <div id="progress-bar">
                  <div id="bar" ref="myDiv1" style="width: 20%;"></div>
                  <div id="text">{{ rate }}/10</div>
                </div>
              </div> 
            </div>
            <p><span class="label">性别:</span> {{ user.sex }}</p>
            <p><span class="label">年龄:</span> {{ user.age }}</p>
            
            
            <p><span class="label">邮箱:</span> {{ user.email }}</p>
            <p class="description">{{ user.introduce }}</p>
          </div>
          <div class="right1">
            <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-yonghu"></use>
            </svg>
          </div>
          <br><br><br><br><br><br><br>
          <button>编辑资料</button>
        </div>
        <h2>联系方式</h2>
        <div class="info-card">
          <h3>联系方式</h3>
          <p><span class="label">联系电话:</span> {{ user.number}}</p>
          <p><span class="label">微信号:</span> zhangsan888</p>
          <p class="description">如果您有任何问题或者建议，请随时联系我。</p>
          <button>编辑资料</button>
        </div>
      </div>
      
      
      <div class="right2">
        <LuckyWheel
          ref="myLucky"
          width="230px"
          height="230px"
          :prizes="prizes"
          :blocks="blocks"
          :buttons="buttons"
          @start="startCallback"
          @end="endCallback" 
          v-show="!isSign"
        />
      </div>
    </div>
    
  </template>
  <script>
  import {
 postexp
} from "@/request/api/home.js"
  import { mapState } from "vuex";
  export default {
    data() {
      return {
      exp:0,
      expsum:139,
      blocks: [
        { padding: '10px', background: '#869cfa' }
      ],
      prizes: [
        { background: '#e9e8fe', fonts: [{ text: '1' }] },
        { background: '#b8c5f2', fonts: [{ text: '2' }] },
        { background: '#e9e8fe', fonts: [{ text: '3' }] },
        { background: '#b8c5f2', fonts: [{ text: '4' }] },
        { background: '#e9e8fe', fonts: [{ text: '5' }] },
        { background: '#b8c5f2', fonts: [{ text: '6' }] },
      ],
      buttons: [
        { radius: '40%', background: '#617df2' },
        { radius: '35%', background: '#afc8ff' },
        {
          radius: '30%', background: '#869cfa',
          pointer: true,
          fonts: [{ text: '签到', top: '-10px' }]
        }
      ]
      };
    },
    computed: {
      ...mapState(["user", "isLogin","isSign"]),
      lel(){
        return Math.floor(this.user.level/10)
      },
      rate(){
        return this.user.level%10
      },
      ggb(){
        return this.user.level
      },
      widthPercentage() {
      // 返回具体的百分比值，例如：10%
      return 20+"%";
    }
    },
    mounted() {
      console.log(this.$refs.myDiv1); // 确保被正确引用
      console.log(this.$refs.myDiv1.style); // 确保可以访问到 style 属性
      this.$refs.myDiv1.style.width = this.rate*10+"%";
      
    },
    methods:{
      LoginOut:async function(){    
        this.$store.commit('updateIsLogin',false)       
        this.$store.commit('updateToken','')
        this.$router.push('/')
      },
      startCallback () {
      // 调用抽奖组件的play方法开始游戏
      if(this.isSign){
        alert("今天已经签过到了")
        return
      }
      this.$refs.myLucky.play()
      // 模拟调用接口异步抽奖
      setTimeout(() => {
        // 假设后端返回的中奖索引是0
        this.exp =  Math.floor(Math.random() * 6);

        let res123=postexp(Number(this.exp+1),this.user.email)
        console.log("9999****6666*****",res123)




        // 调用stop停止旋转并传递中奖索引
        this.$refs.myLucky.stop(this.exp)
      }, 3000)
    },
    // 抽奖结束会触发end回调
    endCallback () {
      console.log(this.exp)
      var s="经验+"+Number(this.exp+1)
      console.log(s)
      this.$store.commit('updatelevel',this.exp+1)
      this.$store.commit('updateIsSign',true)
      console.log(this.isSign)
      this.$refs.myDiv1.style.width = this.rate*10+"%";
      alert(s)
    },
    luckydraw(){
      this.startCallback(),
      this.endCallback()
    }

  }
  };
  </script>
  <style lang="less" scoped>
  body {
			font-family: 'Roboto', sans-serif;
			background-color: #f4f4f4;
			margin: 0;
			padding: 0;
		}

		header {
			background-color: #0076ff;
			color: #fff;
			padding: 20px;
		}

		h1 {
			font-size: 36px;
			margin: 0;
		}

		h2 {
			font-size: 24px;
			margin: 20px 0;
		}

		.container {
			max-width: 800px;
			margin: auto;
			padding: 20px;
		}

		.info-card {
			background-color: #fff;
			border-radius: 8px;
			box-shadow: 0 4px 8px rgba(0,0,0,.1);
			//display: flex;
			flex-direction: column;
			padding: 20px;
			margin-bottom: 20px;
      height: 260px;
		}

    .left1{
      float: left;
    }
    .right1{
      float: left;
    }
    .right2{
      position: absolute;
      top: 200px;
      right: 10%;
    }

		.info-card h3 {
			font-size: 20px;
			font-weight: bold;
			margin-bottom: 10px;
		}

		.info-card p {
			font-size: 16px;
			color: #666;
			margin: 0;
			line-height: 1.5;
		}

		.info-card p.description {
			margin-top: 10px;
		}

		.info-card span.label {
			font-weight: bold;
			color: #333;
			margin-right: 5px;
			text-transform: capitalize;
		}

		button {
			background-color: #0076ff;
			border: none;
			border-radius: 4px;
			color: #fff;
			cursor: pointer;
			font-size: 16px;
			letter-spacing: 1px;
			margin-top: 20px;
			padding: 10px 20px;
			text-transform: uppercase;
			transition: all 0.2s ease-in-out;
		}

		button:hover {
			background-color: #0052cc;
			transform: translateY(-2px);
			box-shadow: 0
            px 4px 10px rgba(0,0,0,.2);
		}

    #progress-bar {
      width: 100px;
      height: 30px;
      background-color: #f5f5f5;
      border-radius: 15px;
      position: relative;
      
      overflow: hidden;
    }

    #bar {
      height: 100%;
      background-color: gold;
      width: 0%;
      position: absolute;
      top: 0;
      left: 0;
      transition: width 0.5s ease-in-out;
    }

    #text {
      position: absolute;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      color: #ef5c5c;
      font-size: 16px;
      font-weight: bold;
    }
  </style>
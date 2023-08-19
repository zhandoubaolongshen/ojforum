<template>
  <div>
    <div id="myChart" :style="{width: '390px', height: '300px'}"></div>
    <div id="myChart1" :style="{width: '390px', height: '300px'}"></div>
    <div class="top">
      <button  @click="$router.push({ path: '/QuestionDetail',
    query: {  QuestionId: JSON.stringify(state.randomquestion) }
    })">每日一题</button>
      <button  @click="$router.push({ path: '/AddQuestion'})">添加题目</button>
    </div>
    <table>
        <thead>
          <tr>
            <th>序号</th>
            <th>题目</th>
            <th>难度</th>
            <th>通过人数</th>
          </tr>
        </thead>
        <tbody>         
          <tr v-for="(image, index) in state.images" :key="index" 
          @click="$router.push({ path: '/QuestionDetail', 
          query: {  QuestionId: JSON.stringify(image) } })">
            <td>{{ image.id }}</td>
            <td>{{ image.title }}</td>
            <td>{{ image.grade }}</td>
            <td>{{ image.accept }}</td>
          </tr>
        </tbody>
    </table>
    
    <div id="pagination-container">
			
			<div id="button-list" class="bbb"  ref="myDiv">
        
      </div>
			<button  class="button" @click="previousPage()">&lt; 上一页</button>
			<span id="page-display">---{{currentPage}}/{{ pagenum}} ---</span>
      <button  class="button" @click="nextPage()">下一页 &gt;</button>
		</div>

    </div>
</template>
<script>

import { mapState } from "vuex";
import { reactive, onMounted,ref, computed,nextTick} from "vue";
import {
 getProblems,getallProblems
} from "@/request/api/home.js"
export default {
  
  data() {
  return {
    buttonsPerPage: 5,
    currentPage: 1,
  }
},
props:{
  butsum:110
},
updated() {
  setTimeout(() => {  
      
      this.drawLine2()
    }, 500);
},
computed:{
	maxPages(){
		return Math.ceil(this.state.resnum / this.buttonsPerPage)/2
	},
  pagenum(){
    return Math.ceil(this.maxPages/this.buttonsPerPage)
  },
  shuszu(){
    return [this.state.images[0].accept,this.state.images[1].accept, this.state.images[2].accept
                    ,this.state.images[3].accept,this.state.images[4].accept
                    , this.state.images[5].accept,this.state.images[6].accept
                    ,this.state.images[7].accept, this.state.images[8].accept
                    ,this.state.images[9].accept
]
  },
  ...mapState(["user", "isLogin","isSign"])
},methods:{
	showButtons(page) {
      const startIndex = (page - 1) * this.buttonsPerPage;
      const endIndex = Math.min(startIndex + this.buttonsPerPage, this.maxPages);

      this.$refs.myDiv.innerHTML = "";
      for (let i = startIndex; i < endIndex; i++) {
        const button = document.createElement("button");
        button.className = "forumbutton";
		//button.style.color="red";
        button.textContent = i+1;
        button.addEventListener('click',()=>{
          this.change(i+1)
        })
        this.$refs.myDiv.appendChild(button);
      }
    },
	nextPage(){
    if(this.currentPage<this.pagenum){
      this.currentPage++
    }
		
		this.showButtons(this.currentPage)
	},
	previousPage(){
    if(this.currentPage>1){
      this.currentPage--
    }
		
		this.showButtons(this.currentPage)
	},
  drawLine1(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        myChart.setOption({
          title: {
            text: '                         体型难度占比'
          }, 
            series: [{
                name: "数量",
                type: 'pie',
                //roseType: 'area',
                data: [{value:this.state.easy,name:'简单'},
                {value:this.state.medium,name:'中等'}, 
                {value:this.state.hard,name:'困难'}]
                
            }]
        });
    },
    drawLine2(){
        // 基于准备好的dom，初始化echarts实例
        let myChart = this.$echarts.init(document.getElementById('myChart1'))
        // 绘制图表
        myChart.setOption({
          title: {
            text: '                        各题通过人数'
          },
          xAxis: {
            type: 'category',
            data: [this.state.images[0].id,this.state.images[1].id, this.state.images[2].id,
            this.state.images[3].id,this.state.images[4].id, this.state.images[5].id,
            this.state.images[6].id,this.state.images[7].id, this.state.images[8].id,
            this.state.images[9].id
          
          ]
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: [this.state.images[0].accept,this.state.images[1].accept, this.state.images[2].accept
                    ,this.state.images[3].accept,this.state.images[4].accept
                    , this.state.images[5].accept,this.state.images[6].accept
                    ,this.state.images[7].accept, this.state.images[8].accept
                    ,this.state.images[9].accept
],
              type: 'line'
            }
          ]
        });
    },
},
mounted() {
    // 在组件挂载后执行的操作
    this.showButtons(this.currentPage)
    console.log('组件已挂载！');
    
    
    setTimeout(() => {  
      this.drawLine1();
      this.drawLine2()
    }, 500);
  },
  setup(props) {
    let state = reactive({
      images: [],
      randomquestion:{},
      resnum:80,
      easy:0,
      hard:0,
      medium:0
    });
    onMounted(async () => {
      let res = await getProblems(1);//初始化页面
      let resnum = await getallProblems();//初始化页面
      state.images=res.data.data
      //console.log("state.images",state.images)
      //#region
      /*折叠注释*/ 
      //#endregion
      state.resnum=resnum.data.data.length
      state.randomquestion=resnum.data.data[Math.floor(Math.random() * state.resnum)]
      console.log("state.num",res.data.data)
      for(var i=0;i<resnum.data.data.length;i++){
        if(resnum.data.data[i].grade=='简单'){
          state.easy++       
        }
        else if(resnum.data.data[i].grade=='中等'){
          state.medium++
        }
        else if(resnum.data.data[i].grade=='困难'){
          state.hard++         
        }else{
          console.log("其他",resnum.data.data[i].grade)
        }
      }
      console.log(state.easy,state.medium,state.hard)
    });
    const change=async (id) =>{   //切换页面
      let res =await getProblems(id);    
      state.images=res.data.data     
      console.log("更新state.images",state.images)
      
    };
    
    return { state,change};
  },



};
</script>
<style>
  .forumbutton{
		cursor: pointer;
          padding: 20px;
          background-color: #b3b3b3;
          border: none;
          outline: none;
          border-radius: 5px;
          margin-right: 12px;
          margin-top: 15px;
	}
</style>
<style lang="less" scoped>
      #pagination-container{
        margin-left: 28%;
        
      }
      table {
        border-collapse: collapse;
        margin: 10px auto;
        font-size: 16px;
      margin-top:10px;
      margin-left: 25%;
      }
      th, td {
        border: 1px solid #ccc;
        padding: 10px;
        text-align: left;
      
      }
      th {
        background-color: #eee;
      }
      tr:nth-child(even) {
        background-color: #f5f5f5;
      }
      tr:hover {
        background-color: #ddd;
      }
    .button {
          cursor: pointer;
          padding: 20px;
          background-color: #ede2e2;
          border: none;
          outline: none;
          border-radius: 5px;
          margin-right: 5px;
          margin-top: 10px;
        }
    .top{
      margin-left: 24%;
      margin-top: 100px;
      button{
        margin: 10px;
      }
    }
    #myChart{
      float:right;
       margin-top: 10%;
    }
    #myChart1{
      float:left;
      margin-top: 10%;
    }
</style>
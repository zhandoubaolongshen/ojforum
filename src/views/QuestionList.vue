<template>
  <div>
    <div id="myChart" :style="{width: '390px', height: '300px'}"></div>
    <div id="myChart1" :style="{width: '390px', height: '300px'}"></div>
    <div class="top">
      <button  @click="$router.push({ path: '/QuestionDetail',
    query: {  QuestionId: JSON.stringify(state.randomquestion) }
    })">每日一题</button>
      <button  @click="$router.push({ path: '/AddQuestion'})">添加题目</button>
      题目难度
      <select v-model="state.selectedOption" @change="changegrade()">
        <option   selected>全部</option>
        <option >简单</option>
        <option >中等</option>
        <option >困难</option>
      </select>
      题数
      <select v-model="state.shownum" @change="changegrade()">
        <option   selected>10</option>
        <option >15</option>
        <option >20</option>
      </select>
      &nbsp;
      <input v-model="inputValue" type="text" placeholder="搜索题目">
    </div>
    <table>
        <thead>
          <tr>
            <th style="width: 14%;">序号</th>
            <th style="width: 50%;">题目</th>
            <th style="width: 14%;">难度</th>
            <th style="width: 22%;">通过人数</th>
          </tr>
        </thead>
        <tbody>         
          <tr v-for="(image, index) in state.images" :key="index" 
          @click="$router.push({ path: '/QuestionDetail', 
          query: {  QuestionId: JSON.stringify(image) } })">
            <td>{{ image.id }}</td>
            <td>{{ image.title }}</td>
            <td :class="{
            'grade-a': image.grade === '简单', 
            'grade-b': image.grade === '中等', 
            'grade-c': image.grade === '困难'}">
              {{ image.grade }}</td>
            <td>{{ image.accept }}</td>
          </tr>
        </tbody>
    </table>
    <div class="footer-container">
      <div style="margin-left: 41%;">
        <span>---{{currentPage}}/{{pagenum}}---</span>
      </div>
      <div id="pagination-container">
        <button class="button" @click="previousPage()">&lt; 上一页</button>
        <div id="button-list" class="bbb" ref="myDiv"></div>
        <button class="button" @click="nextPage()">下一页 &gt;</button>
      </div>
    </div>
    </div>
</template>
<script>
import { toRaw } from '@vue/reactivity'
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
    inputValue:'',
    timer:'',
  }
},
props:{
  butsum:110
},
updated() {
  setTimeout(() => {       
      this.drawLine2()
    }, 200);
    this.showButtons(this.currentPage)
},
computed:{
	maxPages(){
		return Math.ceil(this.state.nowlist.length/ this.state.shownum)  //页数，shownum题一页
	},
  pagenum(){    //组数，5页为一组
    return Math.ceil(this.maxPages/this.buttonsPerPage)
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
        button.textContent = i+1;
        button.addEventListener('click',()=>{
          this.change(i+1)
        })
        this.$refs.myDiv.appendChild(button);
      }
      if(this.currentPage>this.pagenum){
        this.currentPage=1
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
        this.chart2 = this.$echarts.init(document.getElementById('myChart'))
        // 绘制图表
        this.chart2.setOption({
          title: {
            text: '                         体型难度占比'
          }, 
            series: [{
                name: "数量",
                type: 'pie',
                //roseType: 'area',
                data: [{value:this.state.easy.length,name:'简单',itemStyle: { color: 'skyblue' }},
                {value:this.state.medium.length,name:'中等',itemStyle: { color: 'Gold' }}, 
                {value:this.state.hard.length,name:'困难',itemStyle: { color: 'LightCoral' }}]
                
            }]
        });
    },
    drawLine2(){
        this.chart1  = this.$echarts.init(document.getElementById('myChart1'))
        let arrid=[]
        let arrac=[]
        for(var i=0;i<this.state.images.length;i++){
            arrid.push(this.state.images[i].id)
            arrac.push(this.state.images[i].accept)
        }
        this.chart1.setOption({
          title: {
            text: '                        各题通过人数'
          },
          xAxis: {
            type: 'category',
            data: arrid
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              data: arrac,
              type: 'line'
            }
          ]
        });
    },
    handleInputChange(value) {
      // 执行的函数
      if(value==''){
        console.log("搜索框为空")
        this.state.nowlist=this.state.all
        this.change(1)
        return 0
      }
      var selectList=value.split('');
      let arr = JSON.parse(JSON.stringify(this.state.all));
      console.log('输入框的值变化了：', value,selectList);
      //console.log("所有题目",this.state.all)
      for(var i=0;i<arr.length;i++){       
        arr[i].matchDegree=0 //匹配度
        for(var k=0;k<selectList.length;k++){
          // 利用indexOf，记录每个字符在testName中出现的个数，并记录到匹配度
          var index = arr[i].title.indexOf(selectList[k])
          while(index!=-1){
            arr[i].matchDegree++;
                index=arr[i].title.indexOf(selectList[k],index+1);
            }
        }
      }
      // 根据匹配度排序
      arr.sort(function(a, b){return b.matchDegree - a.matchDegree});
      // 删除匹配度为0的试题、删除matchDegree属性
      var k=0;
      while (k<arr.length){
        // 删除匹配度为0的试题
          if(arr[k].matchDegree==0){ 
            arr.splice(k,1);
              continue;// 直接进入下一个循环
          }
          Reflect.deleteProperty(arr[k],'matchDegree'); // 删除matchDegree属性
          k++;
      }
      this.state.nowlist=arr
      console.log("匹配成功",arr)
      this.change(1)
    }
},
watch: {
    inputValue(newValue) {
      clearTimeout(this.timer);//实现防抖功能
      this.timer=setTimeout(()=>{
        this.handleInputChange(newValue);
      },1200)
    }
  },
 
mounted() {
    this.showButtons(this.currentPage)
    console.log('组件已挂载！');
    setTimeout(() => {  
      this.drawLine1();
      this.drawLine2()
    }, 200);
    
  },
  beforeDestroy() {
  setTimeout(() => {
    if (this.chart1) {
      this.chart1.dispose();
    }
    if (this.chart2) {
      this.chart2.dispose();
    }
  }, 200);
},
  setup(props) {
    let state = reactive({
      images: [],//每一页展示的
      randomquestion:{},//每日一题信息
      resnum:30,//总题目数量，用来划分页面
      easy:[],
      hard:[],
      medium:[],
      all:[],
      nowlist:[],//切换后的题目信息
      shownum:10,//页面展示的题目数量
      selectedOption:'全部',
    });
    onMounted(async () => {
      // 获取窗口高度
      const windowHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight;
      console.log(windowHeight)
      if(windowHeight>850){
        state.shownum=15
      }
      //let res = await getProblems(1);  //初始化页面
      let resnum = await getallProblems();//获得所有题目信息
      //state.images=res.data.data
      state.all=resnum.data.data
      state.nowlist=state.all
      state.images=state.nowlist.slice(0,state.shownum)
      //console.log("**当前页面题目信息**",state.images)
      state.resnum=resnum.data.data.length
      state.randomquestion=resnum.data.data[Math.floor(Math.random() * state.resnum)]//随机一题作为每日一题
      //console.log("**总题目信息**",resnum.data.data)
      for(var i=0;i<resnum.data.data.length;i++){
        if(resnum.data.data[i].grade=='简单'){
          state.easy.push(resnum.data.data[i])      
        }
        else if(resnum.data.data[i].grade=='中等'){
          state.medium.push(resnum.data.data[i])   
        }
        else if(resnum.data.data[i].grade=='困难'){
          state.hard.push(resnum.data.data[i])          
        }
      }
      //console.log("三类题目",state.easy,state.medium,state.hard)
      console.log("三类题目",state.easy.length,state.medium.length,state.hard.length)
    });
    const change=async (id) =>{   //切换页面   

      // let res =await getProblems(id);    //原先是分页向后端拿数据，现在在前端做难度筛选处理
      // state.images=res.data.data     
      // console.log("更新state.images",state.images)

      state.images=state.nowlist.slice(state.shownum*(id-1),(state.shownum*id))
    };
    const changegrade=() =>{   //切换难度
      if (state.selectedOption === '全部') {
        state.nowlist=state.all
      } else if (state.selectedOption === '简单') {
        state.nowlist=state.easy
      } else if (state.selectedOption === '中等') {
        state.nowlist=state.medium
      }else if (state.selectedOption === '困难') {
        state.nowlist=state.hard
      }
      state.images=state.nowlist.slice(0,state.shownum)
      state.resnum=state.nowlist.length
    };
    return { state,change,changegrade};
  },
};
</script>
<style>
  .forumbutton{
		cursor: pointer;
          padding: 20px;
          height: 3.5rem;
          background-color: #b3b3b3;
          border: none;
          outline: none;
          border-radius: 5px;
          margin-right: 12px;
          margin-top: 10px;
	}
</style>
<style lang="less" scoped>
.grade-a {
  color: skyblue;
}
.grade-b {
  color: rgb(227, 193, 1);
}
.grade-c {
  color: lightcoral;
}
      #pagination-container{
        margin-left: 25%;
        width: 38%;
        display: flex;
        justify-content: space-around;
      }
      table {
        border-collapse: collapse;
        width: 40%;
        margin: 10px auto;
        font-size: 16px;
      margin-top:5px;
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
          padding: 10px;
          background-color: #ede2e2;
          border: none;
          outline: none;
          height: 3.5rem;
          border-radius: 5px;
          margin-right: 5px;
          margin-top: 10px;
        }
    .top{
      margin-left: 24%;
      margin-top:3px;
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
// import Vue from 'vue'
// import App from './App.vue'

// Vue.config.productionTip = false

// new Vue({
//   render: h => h(App),
// }).$mount('#app')






import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import * as echarts from 'echarts'
import VueLuckyCanvas from '@lucky-canvas/vue'
import Vue from 'vue';
import "swiper/swiper.min.css"
//import ElementUI from 'element-ui';
//import 'element-ui/lib/theme-chalk/index.css';


const app=createApp(App)
app.use(store)
app.use(echarts)
//app.use(ElementUI);
app.use(VueLuckyCanvas)
app.config.globalProperties.$echarts = echarts
app.use(router).mount('#app')

import Vue from 'vue'
import App from './App.vue'
import router from './router'
import axios from 'axios'
import VueAxios from 'vue-axios'
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'
//引用全局数据文件
import global_ from '@/utils/Global'
Vue.prototype.GLOBAL = global_

Vue.use(VueAxios, axios)
Vue.use(ElementUI)
Vue.config.productionTip = false
Vue.prototype.img_prefix = 'http://localhost:9091/'

new Vue({
	router,
	render: h => h(App)
}).$mount('#app')

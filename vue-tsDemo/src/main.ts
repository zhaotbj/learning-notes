import Vue from 'vue'
import App from './App.vue'
import ItemData from './model/ItemData';
import Category from './model/CateEnum';
import store from './store';

Vue.config.productionTip = false

new Vue({
  render: (h: any) => h(App),
  store,
}).$mount('#app');
//测试
let item1 =new ItemData(1,Category.Life,'333333333','334343225')
console.log(item1);
<template>
  <div id="app">
    <MenuBar />
  </div>
</template>
<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import MenuBar from './components/MenuBar.vue'
import ItemData from './model/ItemData'
import ActionHelper from './store/ActionHelper'
import CateEnum from './model/CateEnum'


@Component({
  components:{
    MenuBar
  }
})
export default class App extends Vue {

}

let ol = new ActionHelper()

let newItem = new ItemData(5, CateEnum.Life, '我是标题修改5', "我是内容")
console.log(newItem)
// 测试新增
// newItem.id = ol.add(newItem)
// 测试修改
// ol.edit(newItem)
// 测试删除
// ol.remove(5)
console.log("memoList",ol.memoList)
</script>


<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
</style>

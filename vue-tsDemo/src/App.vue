<template>
  <div id="app">
    <MenuBar></MenuBar>
     <ItemList />
    <MemoEditor v-if="$store.state.isShow" />
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import  MenuBar  from './components/MenuBar.vue';
import ItemList from "./components/ItemList.vue";
import MemoEditor from "./components/MemoEditor.vue";
@Component({
  components: {
    MenuBar,ItemList,MemoEditor
  }
})
export default class App extends Vue {
  @Prop() private msg!: string;
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 60px;
}
</style>

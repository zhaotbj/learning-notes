<template>
    <div>
       <MemoItem  v-for="v in filterMemo()" :key="v.id" :memo="v" /> 
    </div>
</template>


<script lang="ts">
import {Component,Vue} from 'vue-property-decorator'
import ItemData from '../model/ItemData'
import MemoItem  from './MemoItem.vue'
@Component({
    components:{
        MemoItem
    }
})

export default class ItemList extends Vue{
    memoArr:Array<ItemData> = this.$store.state.aHelper.memoList
    filterMemo() {
        if(this.$store.state.filterCateId == -1) {
            return this.memoArr
        } else {
            return this.memoArr.filter(v => v.cateGoryId == this.$store.state.filterCateId)
        }
    }
}
</script>

<style>

</style>
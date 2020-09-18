import DataHelper from './DataHelper'
import ItemData from '../model/ItemData';
import CateEnum from '@/model/CateEnum';

class ActionHelper {
    dataHelper: DataHelper = new DataHelper('memoData', "id");
    memoList!: Array<ItemData>

    constructor() {
        this.memoList = this.readData()
    }
    // 读取本地数据
    readData(): Array<ItemData> {
        let arrObj = this.dataHelper.readData()
        let arrItem = arrObj.map((v: any) => {
            let item: ItemData = new ItemData()
            item.id = v.id
            item.cateGoryId = v.cateGoryId
            item.title = v.title
            item.content = v.content
            item.createdTime = v.createdTime
            return item
        })
        return arrItem
    }
    // 新增笔记
    add(item: ItemData): number {
        item.id = this.dataHelper.addData(item)
        this.memoList.push(item)
        this.dataHelper.saveData(this.memoList)
        return item.id
    }

    // 修改笔记
    edit(item: ItemData): void{
        let editItem:ItemData| undefined = this.memoList.find((ele)=>{
            return ele.id == item.id
        })
        if(editItem){
            editItem.cateGoryId = item.cateGoryId
            editItem.title = item.title
            editItem.content = item.content
            this.dataHelper.saveData(this.memoList)
        }
    }
    remove(id: number): void {
        let index:number = this.memoList.findIndex((ele)=>{
            return ele.id == id
        })
        if(index > -1) {
            this.memoList.splice(index, 1)
            this.dataHelper.saveData(this.memoList)
        }
    }
}
export default ActionHelper
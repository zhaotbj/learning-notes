import Category from './CateEnum'
class ItemData {
    id!: number
    cateGoryId!: Category
    title!: string
    content!: string
    createdTime!: string
    constructor(id: number = -1, cateGoryId:number = -1,title: string = '', content: string = "") {
        this.id = id
        this.cateGoryId = cateGoryId
        this.title = title
        this.content = content
        this.createdTime = this.setTime(Date.now())
    }

    setTime(date: number): string {
        let b = new Date(date)
        let str = b.getFullYear() + "-" + (b.getMonth() + 1) + "-" + b.getDay() + " " + b.getHours() + ":" + b.getMinutes()
        return str
    }
}

export default ItemData
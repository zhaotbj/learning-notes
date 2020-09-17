import Category from './CateEnum';
class ItemData {
  //! 用来告诉ts 这个可以为空  这里只是声明了 没有赋值会显示错误，!可以解决
  id!: number;
  cateGoryId!: Category; //定义成枚举类型
  title!: string;
  content!: string; //保存文章内容
  createTime!: string;
  //构造函数
  constructor(
    id: number = -1,
    cateGoryId: Category = -1, //定义成枚举类型
    title: string = '',
    content: string = ''
  ) {
    this.id = id;
    //在此需要使用枚举类型,代表显示文章类型
    this.cateGoryId = cateGoryId;
    this.title = title;
    this.content = content;
    this.createTime = this.toSelfDateStr(Date.now());
  }
  toSelfDateStr(timeSpan: number): string {
    // 将 时间戳 转换 日期对象
    let date = new Date(Date.now());
    // 使用 日期对象 的 getXXX 方法 依次获取 年月日 时分秒，拼接成 想要的格式
    let str =
      date.getFullYear() +
      '-' +
      (date.getMonth() + 1) +
      '-' +
      date.getDate() +
      ' ' +
      date.getHours() +
      ':' +
      date.getMinutes();
    //3.最后 将 日期字符串 返回
    return str;
  }
}
export default ItemData;
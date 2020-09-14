interface Girl {
    name: string;
    age: number;
    bust: number;
    waistline?: number;
    [propname:string]:any; // 属性的名字是字符串类型，属性的值可以是任何类型
}
const girl1 = {
    name:"大脚",
    age:18,
    bust:98,
    waistline: 21,
    sex:'女'
}

const getResume = (girl1: Girl)=>{
    console.log(girl1.name+"年龄是："+ girl1.age)
    console.log(girl1.name+"胸围是："+ girl1.bust)
    console.log(girl1.name+"腰围是："+ girl1.waistline)
    console.log(girl1.name+"性别是："+ girl1.sex)
}
getResume(girl1)
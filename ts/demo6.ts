const numberArr : number[]= [1,2,3]
const stringArr :string[] = ['1','2','3']
const arr :(number| string)[] = [1, 'string', 2]
console.log(numberArr, stringArr, arr)

// 数组中对象类型
const data : {name:string , age:number}[] = [
    {name:"刘颖", age: 18},
    {name:"张三", age: 28}
]
console.log(data)

type Lady = { name:string, age: number}
const data1 :Lady[] = [
    {name:"li", age:18},
    {name:"lis", age: 28}
]
console.log(data1)

class Madam {
    name: string
    age: number
}
const data2 : Madam[] = [
    {name:"lisi", age:18},
    {name:"hh", age:28}
]
console.log('data2', data2)
const username:string = "123"
console.log("username:"+username)

// 数组
let arrjs = [1,'1',{},[]]

let arrHeay:string[] = ['name1',"name2","name3"]
let arrHeayage:number[] = [1 ,2, 3]
let arrHeayage2: Array<number> = [3, 4, 5]
//   特点 原生类型固定，长度不限制
// 元组
let tup1:[string, number, boolean] = ["你好", 18, true]
console.log(tup1.length)
// 枚举
enum Gender{
    Boy = 1,
    Girl =2,
    unKnow = 3
}

let usersex = Gender.Boy
console.log(usersex)
if(usersex == Gender.Boy) {
    console.log('---相等')
} else {
    console.log(usersex)
}
enum Gender1{
    Boy,
    Girl,
    unKnow
}
console.log(Gender.Boy, Gender.Girl, Gender.unKnow) // 123
console.log(Gender1.Boy, Gender1.Girl, Gender1.unKnow) // 012

function test():never{
    let i=0;
	while(true){
        i++
        console.log(`第${i}次进来了`)
    }
}
function test2():never{
	throw new Error('错误')
}

let x:never= test()
let y:string=test()

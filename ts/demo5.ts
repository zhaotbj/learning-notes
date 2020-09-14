function getTotal(one:number, two: number) : number {
    return one + two
}

const total =  getTotal(1,2)
console.log("total", total)

function sayHello() :void{
    console.log("hello world")
}
sayHello()

function add ({one, two} : {one:number, two:number}) :number{
    return one + two
}
const three = add({one:1, two: 2})
console.log("three", three)
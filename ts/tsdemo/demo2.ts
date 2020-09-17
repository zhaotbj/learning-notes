function buyGun(gunnNme:string = 'M14', count:number = 1):void {
    console.log("gunnNme "+gunnNme, "count", count|| '')
}
buyGun('zhaot',20)
buyGun('zhaot')
buyGun()

function add(x:number, y:number, ...restOfNum: number[]){
    let resNum:number = x+y
    for(let ele of restOfNum){
        resNum+=ele
    }
    console.log('结果', resNum)
}

add(1,2,3,4,5) // 15
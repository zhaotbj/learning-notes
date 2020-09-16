class Lady{
    content='Hi，帅哥'
    sayHello(){
        return this.content
    }
}
class Xiao extends Lady {
    sayLove() {
        return '--------'
    }
}
const goddess = new Xiao()
console.log(goddess.sayHello())
console.log(goddess.sayLove())

class City{
    cName:string= ''
    cLevel:number=1
    constructor(name:string, level:number){
        this.cName = name
        this.cLevel = level
    }
    about(){
        console.log("cName",this.cName, this.cLevel)
    }
}
let c1  = new City('P城市', 5)
c1.about()
console.log(c1.cName, c1.cLevel)
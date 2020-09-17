var City = /** @class */ (function () {
    function City(name, level) {
        this.cName = '';
        this.cLevel = 1;
        this.cName = name;
        this.cLevel = level;
    }
    City.prototype.about = function () {
        console.log("cName", this.cName, this.cLevel);
    };
    return City;
}());
var c1 = new City('P城市', 5);
c1.about();
console.log(c1.cName, c1.cLevel);

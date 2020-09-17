var username = "123";
console.log("username:" + username);
// 数组
var arrjs = [1, '1', {}, []];
var arrHeay = ['name1', "name2", "name3"];
var arrHeayage = [1, 2, 3];
var arrHeayage2 = [3, 4, 5];
//   特点 原生类型固定，长度不限制
// 元组
var tup1 = ["你好", 18, true];
console.log(tup1.length);
// 枚举
var Gender;
(function (Gender) {
    Gender[Gender["Boy"] = 1] = "Boy";
    Gender[Gender["Girl"] = 2] = "Girl";
    Gender[Gender["unKnow"] = 3] = "unKnow";
})(Gender || (Gender = {}));
var usersex = Gender.Boy;
console.log(usersex);
if (usersex == Gender.Boy) {
    console.log('---相等');
}
else {
    console.log(usersex);
}
var Gender1;
(function (Gender1) {
    Gender1[Gender1["Boy"] = 0] = "Boy";
    Gender1[Gender1["Girl"] = 1] = "Girl";
    Gender1[Gender1["unKnow"] = 2] = "unKnow";
})(Gender1 || (Gender1 = {}));
console.log(Gender.Boy, Gender.Girl, Gender.unKnow); // 123
console.log(Gender1.Boy, Gender1.Girl, Gender1.unKnow); // 012
function test() {
    var i = 0;
    while (true) {
        i++;
        console.log("\u7B2C" + i + "\u6B21\u8FDB\u6765\u4E86");
    }
}
function test2() {
    throw new Error('错误');
}
var x = test();
var y = test();

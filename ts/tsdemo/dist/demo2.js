function buyGun(gunnNme, count) {
    if (gunnNme === void 0) { gunnNme = 'M14'; }
    if (count === void 0) { count = 1; }
    console.log("gunnNme " + gunnNme, "count", count || '');
}
buyGun('zhaot', 20);
buyGun('zhaot');
buyGun();
function add(x, y) {
    var restOfNum = [];
    for (var _i = 2; _i < arguments.length; _i++) {
        restOfNum[_i - 2] = arguments[_i];
    }
    var resNum = x + y;
    for (var _a = 0, restOfNum_1 = restOfNum; _a < restOfNum_1.length; _a++) {
        var ele = restOfNum_1[_a];
        resNum += ele;
    }
    console.log('结果', resNum);
}
add(1, 2, 3, 4, 5); // 15
